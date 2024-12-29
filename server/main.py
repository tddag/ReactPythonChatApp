from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Hello! This is main page"

from routes import users, conversations
users.register_routes(app)
conversations.register_routes(app)

if __name__ == "__main__":
    app.run()