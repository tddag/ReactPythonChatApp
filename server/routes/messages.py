from flask import request, jsonify
from database import engine
from sqlalchemy import text
from flask_jwt_extended import jwt_required


def register_routes(app, socketio):

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

                # Add seen user
                result = conn.execute(text("INSERT INTO seen_users (message_id, user_id) VALUES(:message_id, :user_id)"), {
                    "message_id": new_message.id,
                    "user_id": sender_id
                })


                conn.commit()

                message = {
                    "id": new_message.id,
                    "message": new_message.message,
                    "sender_name": new_message.sender_name,
                    "sender_id": new_message.sender_id,
                    "creation_time": new_message.creation_time.isoformat(),
                    "conversation_id": conversation_id,
                    "seen_users": []
                }
                allSeenUsers = conn.execute(text("SELECT users.id, users.name, users.email FROM seen_users JOIN users ON seen_users.user_id = users.id WHERE  message_id = :message_id"), {
                    "message_id": new_message.id
                }).all()
                for user in allSeenUsers:
                    message["seen_users"].append({
                        "id": user.id,
                        "name": user.name,
                        "email": user.email
                    })

                socketio.emit("new_message_created", message)              


                return jsonify({
                    "msg": "Create a new message successfully",
                    "id": new_message.id
                }), 201

        except Exception as e:
            print("Failed to create a new message", e)
            return jsonify({
                "error": "Failed to create a new message"
            }), 400


    # POST - seen a message
    @app.route("/api/messages/<int:message_id>/seen", methods=["POST"])
    @jwt_required()
    def seen_message(message_id):
        try:
            data = request.json
            user_id = data.get("user_id")

            print("Start api: seen a message", "message id: ", message_id, " - user_id: ", user_id)


            with engine.connect() as conn:
                existingUser = conn.execute(text("SELECT users.id, users.name, users.email FROM seen_users JOIN users ON seen_users.user_id = users.id WHERE message_id = :message_id AND user_id = :user_id" ), {
                    "message_id": message_id,
                    "user_id": user_id
                }).all()

                if not existingUser:
                    result = conn.execute(text("INSERT INTO seen_users(message_id, user_id) VALUES(:message_id, :user_id)"), {
                        "message_id": message_id,
                        "user_id": user_id
                    })

                    conn.commit()
                
                seen_users = []
                allSeenUsers = conn.execute(text("SELECT users.id, users.name, users.email FROM seen_users JOIN users ON seen_users.user_id = users.id WHERE  message_id = :message_id"), {
                    "message_id": message_id
                }).all()
                for user in allSeenUsers:
                    seen_users.append({
                        "id": user.id,
                        "name": user.name,
                        "email": user.email
                    })  

                socketio.emit("seen_users_updated", {
                    "message_id": message_id,
                    "seen_users": seen_users
                })

                return jsonify({
                    "seen_users": seen_users
                }), 200             

        except Exception as e:
            print("Failed to seen a message: ", e)
            return jsonify({
                "error": f"Failed to seen a message. Error: {str(e)}"
            }), 500