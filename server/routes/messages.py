from flask import request, jsonify
from database import engine
from sqlalchemy import text

def register_routes(app):

    # POST - create a new message
    @app.route("/api/messages", methods=["POST"])
    def create_message():
        try:
            data = request.json

            message = data.get("message")
            conversation_id = data.get("conversation_id")
            sender_id = data.get("sender_id")

            with engine.connect() as conn:
                # Insert new message
                result = conn.execute(text("INSERT INTO messages(message, conversation_id, sender_id) VALUES(:message, :conversation_id, :sender_id)"), {
                    "message": message,
                    "conversation_id": conversation_id,
                    "sender_id": sender_id
                })

                new_message = conn.execute(text("SELECT * FROM messages ORDER BY creation_time DESC LIMIT 1")).first()

                print("Type of new message: ", type(new_message))

                conn.commit()


                return jsonify({
                    "msg": "Create a new message successfully",
                    "id": new_message.id
                })

        except Exception as e:
            print("Failed to create a new message", e)
            return jsonify({
                "error": "Failed to create a new message"
            })

