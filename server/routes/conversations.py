from flask import request, jsonify
from database import engine
from sqlalchemy import text
from flask_jwt_extended import jwt_required


def register_routes(app):

    # POST - create a conversation
    @app.route("/api/conversation", methods=["POST"])
    @jwt_required()
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
        

    # GET - get conversation details
    @app.route("/api/conversations/<int:conversation_id>/details", methods=["GET"])
    @jwt_required()
    def get_conversation_details(conversation_id):
        try:
            with engine.connect() as conn:

                # Get user list from current conversation


                result = conn.execute(text("SELECT * FROM conversation_users WHERE conversation_id = :conversation_id"), {
                    "conversation_id": conversation_id
                }).all()
              


                users = []
                for row in result:
                
                    cur_user_id = row.user_id
                    user = conn.execute(text("SELECT * FROM users WHERE id = :user_id"), {
                        "user_id": cur_user_id
                    }).first()
                    users.append({
                        "id": user.id,
                        "name": user.name,
                        "email": user.email
                    })


                # Get messages from current conversation
                result = conn.execute(text("SELECT * FROM messages JOIN users ON users.id =  messages.sender_id WHERE conversation_id = :conversation_id"), {
                    "conversation_id": conversation_id
                }).all()
          

                messages = []
                for row in result:
                    messages.append({
                        "message": row.message,
                        "creation_time": row.creation_time,
                        "sender_name": row.name
                    })

                return jsonify({
                    "conversation_id": conversation_id,
                    "messages": messages,
                    "users": users
                })
        except Exception as e:
            print("Failed to get conversation messages", e)
            return jsonify({
                "error": "Failed to fetch conversation_messages"
            })