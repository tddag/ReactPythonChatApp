import { useState } from "react"
import ConversationListItem from "./ConversationListItem"


const ConversationList = () => {

    const [conversationList, setConversationList] = useState([
        {
            "conversation_id": 1,
            "messages": [
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
            ],
            "users": [
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
            ]
        },
        {
            "conversation_id": 2,
            "messages": [
                {
                    "creation_time": "Mon, 30 Dec 2024 10:05:42 GMT",
                    "message": "This message is from Tom. Tom is so cool. Hi Tom3",
                    "sender_name": "Tom"
                }
            ],
            "users": [
                {
                    "email": "tom@123",
                    "id": 1,
                    "name": "Tom"
                },
                {
                    "email": "tom3@gmail.com",
                    "id": 3,
                    "name": "Tom3"
                }
            ]
        }
    ])

    return (
        <div>
            {conversationList.length == 0 ? (
                <div>
                    No conversation.
                </div>
            ):
            conversationList.map((conversation, index) => (
                <div>
                    <ConversationListItem conversation={conversation}/>
                </div>
            ))}
        </div>
    )
}

export default ConversationList