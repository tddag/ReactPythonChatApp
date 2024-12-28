from flask import request, jsonify
from database import engine
from sqlalchemy import text
import json
from models import User

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

                result = conn.execute(text("SELECT * FROM users WHERE email = (:email)"), [data])
                result_all = result.all()

                if (len(result_all) >= 1):
                    return jsonify({
                        "error": "User already exists"
                    }), 400
                

                result = conn.execute(text("INSERT INTO users(name, email, password) VALUES (:name, :email, :password)"), [
                    data
                ])

                conn.commit()

                return jsonify({
                    "msg": "Successfully register a new user"
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
        return "Login User"