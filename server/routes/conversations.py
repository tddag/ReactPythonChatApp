from flask import request, jsonify
from database import engine
from sqlalchemy import text

def register_routes(app):

    # POST - create a conversation
    @app.route("/api/conversation", methods=["POST"])
    def create_conversation():
        try:
            data = request.json
            if (not "user_ids" in data):
                return jsonify({
                    "error": "user ids are required"
                })
            
            print("Type of user ids: ", type(data.get("user_ids")))

            with engine.connect() as conn:
                # Create a new conversation
                result = conn.execute(text("INSERT INTO conversations VALUES();"))

                # Get newly created conversation
                newConversation = conn.execute(text("SELECT * FROM conversations ORDER BY creation_time DESC")).first()

                for user_id in data.get("user_ids"):
                    # add user ids into junction table
                    result = conn.execute(text("INSERT INTO conversation_users(conversation_id, user_id) VALUES (:conversation_id, :user_id)"), {
                        "conversation_id": newConversation.id,
                        "user_id": user_id
                    })

                conn.commit()

                return jsonify({
                    "conversation_id": newConversation.id
                })

        except Exception as e:
            print("Failed to create a conversation")
            print(e)
            return jsonify({
                "error": "Failed to create a conversation"
            }), 500