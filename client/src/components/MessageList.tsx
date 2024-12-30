import { useState } from "react"
import MessageHeader from "./MessageHeader"
import MessageItem from "./MessageItem"
import MessageInput from "./MessageInput"


const MessageList = () => {

    const [userList, setUserList] = useState([
        {
            "email": "tom@123",
            "id": 1,
            "name": "Tom"
        },
        {
            "email": "tom2@123",
            "id": 2,
            "name": "Tom2"
        }
    ])

    const [messageList, setMessageList] = useState([
        {
            "creation_time": "Mon, 30 Dec 2024 10:02:34 GMT",
            "message": "This message is from Tom",
            "sender_name": "Tom"
        },
        {
            "creation_time": "Mon, 30 Dec 2024 10:02:43 GMT",
            "message": "This message is from Tom. Tom is so cool",
            "sender_name": "Tom"
        }
    ],)

    return (
        <div>
            {userList.length > 0 && (
                <div>
                    <MessageHeader userList={userList}/>
                </div>
            )}

            <div>
                {messageList.length > 0 ? messageList.map((message, index) => (
                    <MessageItem message={message} key={index}/>
                )): (
                    <div>
                        Select an existing conversation or start a new conversation
                    </div>
                )}
            </div>

            <MessageInput/>
            
        </div>
    )
}

export default MessageList