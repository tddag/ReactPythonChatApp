import { useEffect, useState } from "react"
import MessageHeader from "./MessageHeader"
import MessageItem from "./MessageItem"
import MessageInput from "./MessageInput"


interface MessageListProps {
    conversation_id: number | undefined
}

const MessageList = ({
    conversation_id
}: MessageListProps) => {

    const [userList, setUserList] = useState([])

    const [messageList, setMessageList] = useState([])

    useEffect(() => {
        getConversationDetails()
    }, [conversation_id])

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