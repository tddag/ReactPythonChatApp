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
            print("user ids are: ", data["user_ids"])

            with engine.connect() as conn:
                existingConversation = conn.execute(text("SELECT cu.conversation_id FROM conversation_users cu WHERE cu.user_id IN :user_ids GROUP BY cu.conversation_id HAVING COUNT(DISTINCT cu.user_id) = :user_ids_len AND COUNT(DISTINCT cu.user_id) = (SELECT COUNT(*) FROM conversation_users cu2 WHERE cu2.conversation_id = cu.conversation_id)"), {
                    "user_ids": data["user_ids"],
                    "user_ids_len": len(data["user_ids"])
                }).first()

                if existingConversation:
                    return jsonify({
                        "conversation_id": existingConversation.conversation_id
                    })
                
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
                result = conn.execute(text("SELECT messages.*, users.name FROM messages JOIN users ON users.id =  messages.sender_id WHERE conversation_id = :conversation_id ORDER BY messages.creation_time" ), {
                    "conversation_id": conversation_id
                }).all()
          

                messages = []
                # for row in result:
                for j in range(len(result)):
                    message = {
                        "id": result[j].id,
                        "message": result[j].message,
                        "creation_time": result[j].creation_time,
                        "sender_name": result[j].name,
                        "sender_id": result[j].sender_id,
                        "seen_users": []
                    }     
                    if j == len(result) - 1:
                        # if last message, get all seen users
                        allSeenUsers = conn.execute(text("SELECT users.id, users.name, users.email FROM seen_users JOIN users ON seen_users.user_id = users.id WHERE  message_id = :message_id"), {
                            "message_id": result[j].id
                        }).all()
                        if (len(allSeenUsers) > 0): 
                            for user in allSeenUsers:
                                message["seen_users"].append({
                                    "id": user.id,
                                    "name": user.name,
                                    "email": user.email
                                })      

                    messages.append(message)
                            
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