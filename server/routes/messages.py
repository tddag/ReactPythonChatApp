from flask import request, jsonify
from database import engine
from sqlalchemy import text
from flask_jwt_extended import jwt_required


def register_routes(app, socket):

    # POST - create a new message
    @app.route("/api/messages", methods=["POST"])
    @jwt_required()
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

                new_message = conn.execute(text("SELECT messages.*, users.name as sender_name FROM messages JOIN users ON users.id = messages.sender_id ORDER BY messages.creation_time DESC LIMIT 1;")).first()

                print("Type of new message: ", type(new_message))

                conn.commit()

                socket.emit("new_message_created", {
                    "message": new_message.message,
                    "sender_name": new_message.sender_name,
                    "sender_id": new_message.sender_id,
                    "creation_time": new_message.creation_time.isoformat()
                })              


                return jsonify({
                    "msg": "Create a new message successfully",
                    "id": new_message.id
                }), 201

        except Exception as e:
            print("Failed to create a new message", e)
            return jsonify({
                "error": "Failed to create a new message"
            }), 400

