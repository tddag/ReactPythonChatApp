from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, logger=True, cors_allowed_origins="*")

@app.route("/")
def home():
    return "Hello! This is main page"

from routes import users, conversations, messages
users.register_routes(app)
conversations.register_routes(app)
messages.register_routes(app, socketio)

@socketio.on('connect')
def handle_connect():
    print("Socket Server is connected")

if __name__ == "__main__":
    socketio.run(app)

# http://localhost:5173/conversations/1