from flask import request, jsonify
from database import engine
from sqlalchemy import text
import bcrypt

def register_routes(app):

    # POST - register new user
    @app.route("/api/users", methods=["POST"])
    def register_user():
        try:
            data = request.json
            required_fields = ["name", "email", "password"]
            for field in required_fields:
                if field not in data:
                    return jsonify({
                        "error": f"Missing required field: {field}"
                    }), 400
                
            name = data.get("name")
            email = data.get("email")
            password = data.get("password")

            print(f"Type of data is: {type(data)}")

            with engine.connect() as conn:

                # check if user exists
                result = conn.execute(text("SELECT * FROM users WHERE email = (:email)"), [data])
                result_all = result.all()

                if (len(result_all) >= 1):
                    return jsonify({
                        "error": "User already exists"
                    }), 400
                
                # hash password
                hashed = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())
                result = conn.execute(text("INSERT INTO users(name, email, password) VALUES (:name, :email, :hashed)"), 
                    {
                        "name": name, 
                        "email": email, 
                        "hashed": hashed.decode("utf-8")
                    }
                )

                conn.commit()

                return jsonify({
                    name: name,
                    email: email,
                }), 201

        except Exception as e:
            print("Failed to register a new user")
            print(e)
            return jsonify({
                "error": "Failed to register a new user"
            }), 500        
    
    # POST - login user
    @app.route("/api/users/login", methods=["POST"])
    def login_user():
        try:
            data = request.json

            email = data.get("email")
            password = data.get("password")

            if (email == None or password == None ):
                return jsonify({
                    "error": "Please add required fields"
                }), 400
            
            with engine.connect() as conn:
                query = text("SELECT * FROM users WHERE email = :email")
                existingUser = conn.execute(query, {"email": email}).fetchone()

                if (not existingUser):
                    return jsonify({
                        "error": "User not found!"
                    }), 400
                else:
                    if (not bcrypt.checkpw(password.encode("utf-8"), existingUser.password.encode("utf-8"))):
                        return jsonify({
                            "error": "Incorrect Password"
                        }), 400
                    else:
                        return jsonify({
                            "name": existingUser.name,
                            "email": existingUser.email
                        }), 200

        except Exception as e:
            print("Failed to log in user")
            print(e)
            return jsonify({
                "error": "Failed to log in user"
            }), 500
        
    # GET - get all users
    @app.route("/api/users", methods=["GET"])
    def get_all_users():
        try:
            with engine.connect() as conn:
                allUsers = conn.execute(text("SELECT * FROM users")).all()


                users = [ {
                    "id": row.id,
                    "name": row.name,
                    "email": row.email
                } for row in allUsers]
                if allUsers:
                    return jsonify(users), 200
                else:
                    return jsonify([]), 200

        except Exception as e:
            print("Failed to get all users", e)
            return jsonify({
                "error": "Failed to fetch all users"
            })
    
    # GET - get user conversations
    @app.route("/api/users/<int:user_id>/conversations", methods=["GET"])
    def get_user_conversations(user_id):
        try:
            with engine.connect() as conn:
                allConversations = conn.execute(text("SELECT * FROM conversation_users WHERE user_id = :user_id"), {
                    "user_id": user_id
                }).all()

                conversations = [ {
                    "conversation_id": row.conversation_id,
                    "users": [],
                    "messages": []
                } for row in allConversations]

                users_dict = {}

                for i in range(len(conversations)):
                    # Get all users details

                    cur_conversation_id = conversations[i]["conversation_id"]
                    result = conn.execute(text("SELECT * FROM conversation_users WHERE conversation_id = :conversation_id"), {
                        "conversation_id": cur_conversation_id
                    }).all()

                    for row in result:
                        print("Get here 4")
                        cur_user_id = row.user_id
                        if not cur_user_id in users_dict:
                            result = conn.execute(text("SELECT * FROM users WHERE id = :user_id"), {
                                "user_id": cur_user_id
                            }).first()

                            users_dict[cur_user_id] = {
                                "id": result.id,
                                "name": result.name,
                                "email": result.email
                            }

                        conversations[i]["users"].append(users_dict[cur_user_id])

                    # get all messages of current conversation
                    result = conn.execute(text("SELECT * FROM messages WHERE conversation_id = :conversation_id"), {
                        "conversation_id": cur_conversation_id
                    }).all()

                    for row in result:
                        print("Get here 7")
                        conversations[i]["messages"].append({
                            "message": row.message,
                            "creation_time": row.creation_time,
                            "sender_name": users_dict[row.sender_id]["name"]
                        })

                return jsonify(conversations)

        except Exception as e:
            print("Failed to get user conversations", e)
            return jsonify({
                "error": "Failed to fetch user conversations"
            })