import { useEffect, useState } from "react"
import MessageHeader from "./MessageHeader"
import MessageItem from "./MessageItem"
import MessageInput from "./MessageInput"


const MessageList = () => {

    const [userList, setUserList] = useState([])

    const [messageList, setMessageList] = useState([])

    useEffect(() => {
        getConversationDetails()
    }, [])

    const getConversationDetails = async() => {
        try {
            let url = `${import.meta.env.VITE_SERVER_URL}/api/conversations/1/details`
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