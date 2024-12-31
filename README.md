# Setup

- Setup Python
  - Install Python
  - Install Python Extension on VSCode
  - Open terminal on VSCode `Ctrl + ~`
  - Navigate to server folder `cd server`
  - Create virtual environment `python3 -m venv venv`
  - Select Intepreter:
    - on MacOS, press `Cmd + Shift + P`, enter `Python: Select Interpreter`
    - Enter interpreter path `./server/venv/bin/python3`
  - Activate environment `source ./venv/bin/activate`
  - Install dependencies:
    - Flask: micro web framework
    - Flask Cors: Flask extension for handling Cross Origin Resource Sharing (CORS)
    - SQL Alchemy: Object Relational Mapper
    - Dot Env: load and set environment variables
    - Py MySQL: Python MySQL client library
    - Flask SocketIO: low latency bi-directional communications between the clients and server
    - Bcrypt: password hashing
    - Flask JWT Extended: provide JWT support
    - `pip install flask flask-cors sqlalchemy python-dotenv pymysql bcrypt flask-socketio flask-jwt-extended`
  - Run the server `python3 -B main.py`
- Setup MySQL
  - Download and Install MySQL Community Server
  - Download and Install MySQL WorkBench
  - Open MySQL WorkBench
  - Click Local Instance 3306, enter password entered during installation
  - Create a new DB `CREATE DATABASE reactPythonChatAppDB;`
  - Use DB `USE reactPythonChatAppDB;`
  - Create User table:
  ```
      CREATE TABLE users (
          id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
          name VARCHAR(50) NOT NULL,
          email VARCHAR(50) NOT NULL,
          password VARCHAR(100) NOT NULL,
          creation_time DATETIME DEFAULT NOW()
      );
  ```
  - Create Conversation table:
  ```
    CREATE TABLE conversations (
        id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
        last_message_at DATETIME,
        creation_time DATETIME DEFAULT NOW()
    );
  ```
  - Create junction Conversation_Users table:
  ```
    CREATE TABLE conversation_users (
        id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
        conversation_id INT,
        user_id INT,
        FOREIGN KEY (conversation_id) REFERENCES conversations(id),
        FOREIGN KEY (user_id) REFERENCES users(id),
        creation_time DATETIME DEFAULT NOW()
    );
  ```
  - Create Message table:
  ```
    CREATE TABLE messages (
        id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
        message TEXT,
        conversation_id INT,
        sender_id INT,
        FOREIGN KEY (conversation_id) REFERENCES conversations(id),
        FOREIGN KEY (sender_id) REFERENCES users(id),
        creation_time DATETIME DEFAULT NOW()
    );
  ```
- Set up server enviroment variables (./server/.env):
  - <table>
        <tr>
            <th>Variable</th>
            <th>Value</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>DATABASE_URL</td>
            <td>mysql+pymysql://root:abc.....@localhost:3306/reactPythonChatAppDB?charset=utf8mb4</td>
            <td>MySQL Database URL</td>
        </tr>JWT_SECRET_KEY
        <tr>
            <td>JWT_SECRET_KEY</td>
            <td>...</td>
            <td>JWT Secret Key</td>
        </tr>        
    </table>
- Set up client enviroment variables (./client/.env):
  - <table>
        <tr>
            <th>Variable</th>
            <th>Value</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>VITE_SERVER_URL</td>
            <td>http://127.0.0.1:5000</td>
            <td>Server URL</td>
        </tr>
    </table>
- Install Client dependencies: `cd client && npm i`
- Start the client `npm run dev`

# TODO

- Functionalities:
  - JWT Authentication
  - Real-time messaging
  - Search User by Name/Email
  - Get all existing chats between users
  - Real-time active users
  - Seen Receipt
  - Create group chat
- UI
  - Sign Up Page
  - Login Page
  - Chat Page
- Database:

  - User
  - Room/Conversation
  - Chat/Message
  - Socket?

- create server [x]
- create db [x]
  - create user table [x]
- create routes/apis:
  - register user [x]
  - login user [x]
- connect db [x]
- create client [x]
- setup TailwindCSS [x]
- create register page [x]
- create login page [x]
- setup React Routes [x]
- set up client env variables [x]
- take user form input, connect client with server (registerUser, loginUser apis) [x]
- create api
  - fetch all users [x]
  - create room/conversation [x]
  - create chat/message [x]
  - fetch all conversation messages [x]
  - fetch all user conversations [x]
- create nav bar component
- create conversation page [x]
- create conversationList, coversationListItem components [x]
- create MessageList, MessageHeader, MessageItem components [x]
- create MessageInput component, take input, call createMessage api [x]
- connect api to fetch user conversations [x]
- connect api to fetch conversation details [x]
- route logic to display corresponding conversation details [x]
- add Socket IO for real time chat [x]
- store Socket IO instance in React Context [x]
- create NavBar component [x]
- implement Redux toolkit
- implement JWT to protect apis [x]
- create redux toolkit to store user logged in details
- check user and protect client route
- create useUser hook to fetch all users
- conversation page, display all chat messages
- connect create chat api
- create group chat
- seen receipt
- active user
- search user

# Test

- http://localhost:5173/conversations/1
