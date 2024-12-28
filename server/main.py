from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Hello! This is main page"

import importlib.util

usersSpec = importlib.util.spec_from_file_location("users", "./routes/users.py")
users = importlib.util.module_from_spec(usersSpec)
usersSpec.loader.exec_module(users)
users.register_routes(app)


if __name__ == "__main__":
    app.run()