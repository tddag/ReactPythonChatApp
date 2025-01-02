import datetime
from flask import Flask, request
from flask_cors import CORS
from flask_socketio import SocketIO
from dotenv import load_dotenv
import os
from flask_jwt_extended import JWTManager

app = Flask(__name__)
load_dotenv()
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")
CORS(app)
socketio = SocketIO(app, logger=True, cors_allowed_origins="*")
jwt = JWTManager(app)

@app.route("/")
def home():
    return "Hello! This is main page"

active_users_id = {}


from routes import users, conversations, messages
users.register_routes(app, active_users_id)
conversations.register_routes(app)
messages.register_routes(app, socketio)

@socketio.on('connect')
def handle_connect():
    print("Socket Server is connected")

    query_data = request.args.to_dict()
    print("Query Data is: ", query_data) 
    active_users_id[query_data["user_id"]] = True
    print("Active users are: ", active_users_id)

    socketio.emit("user_connected", {
        "id": query_data["user_id"]
    })


@socketio.on('disconnect')
def handle_disconnect():
    print("Server - Socket disconnected")
    sid = request.sid
    print(f"Client {sid} disconnected")

    query_data = request.args.to_dict()
    print("Query Data is: ", query_data) 

    active_users_id.pop(query_data["user_id"], None)
    print("Active users are: ", active_users_id)

    socketio.emit("user_disconnected", {
        "id": query_data["user_id"]
    })



if __name__ == "__main__":
    socketio.run(app)

# http://localhost:5173/conversations/1