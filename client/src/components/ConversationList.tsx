import { useEffect, useState } from "react"
import ConversationListItem from "./ConversationListItem"


const ConversationList = () => {

    const [conversationList, setConversationList] = useState([])

    useEffect(() => {
        getUserConversations()
    }, [])

    const getUserConversations = async () => {
        try {
            let url = `${import.meta.env.VITE_SERVER_URL}/api/users/1/conversations`

            let res = await fetch(url)

            if (res.ok) {
                const conversations = await res.json();
                console.log("conversations are: ", conversations)
                setConversationList(conversations);
                console.log("Fetch user conversations successfully")
            } else {
                console.log("Failed to fetch user conversations")
            }
        } catch (e) {
            console.log("Failed to fetch user conversations", e)
        }
    }

    return (
        <div>
            {conversationList.length == 0 ? (
                <div>
                    No conversation.
                </div>
            ):
            conversationList.map((conversation, index) => (
                <div key={index}>
                    <ConversationListItem conversation={conversation}/>
                </div>
            ))}
        </div>
    )
}

export default ConversationList