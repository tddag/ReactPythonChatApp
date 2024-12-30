import { useContext, useEffect, useState } from "react"
import MessageHeader from "./MessageHeader"
import MessageItem from "./MessageItem"
import MessageInput from "./MessageInput"
import { Message } from "../types/Message"
import { SocketContext } from "../main"


interface MessageListProps {
    conversation_id: number | undefined
}

const MessageList = ({
    conversation_id
}: MessageListProps) => {

    const [userList, setUserList] = useState([])

    const [messageList, setMessageList] = useState<Message[]>([])

    const socket = useContext(SocketContext)

    useEffect(() => {
        getConversationDetails()

        if (conversation_id) {
            socket?.on("new_message_created", newMessageHandler)

            return () => {
                socket?.off("new_message_created", newMessageHandler )
            }
        }

    }, [conversation_id])

    const newMessageHandler = (data: Message) => {
        console.log("Client receive new message", data)
        setMessageList((list) => [...list, data])
    }

    const getConversationDetails = async() => {
        try {
            if (!conversation_id) return
            let url = `${import.meta.env.VITE_SERVER_URL}/api/conversations/${conversation_id}/details`
            const res = await fetch(url)

            if (res.ok) {
                const conversationDetails = await res.json();
                setUserList(conversationDetails.users)
                setMessageList(conversationDetails.messages)
            }
        } catch (e) {
            console.log("Failed to get conversation details", e)
        }
    }

    return (
        <div>
            {userList.length > 0 && (
                <div>
                    <MessageHeader userList={userList}/>
                </div>
            )}

            <div>
                {messageList.length > 0 ? (
                    <div>
                        {messageList.map((message, index) => (
                            <MessageItem message={message} key={index}/>
                        ))}
                        <MessageInput conversation_id={conversation_id}/>
                    </div>
                )
              : (
                    <div>
                        Select an existing conversation or start a new conversation
                    </div>
                )}
            </div>

            
        </div>
    )
}

export default MessageList