import { useEffect, useState } from "react"
import ConversationListItem from "./ConversationListItem"
import { Link } from "react-router-dom"
import { Conversation } from "../types/Conversation"
import { useSelector } from "react-redux"
import { RootState } from "../state/store"


const ConversationList = () => {

    const [conversationList, setConversationList] = useState<Conversation[]>([])

    const { currentUser } = useSelector((state: RootState) => state.user)

    useEffect(() => {
        getUserConversations()
    }, [])

    const getUserConversations = async () => {
        try {
            let url = `${import.meta.env.VITE_SERVER_URL}/api/users/${currentUser?.id}/conversations`

            let res = await fetch(url, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${currentUser?.access_token}`
                }
            })

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
                    <Link to={`/conversations/${conversation.conversation_id}`}>
                        <ConversationListItem conversation={conversation}/>
                    </Link>                        
                </div>
            ))}
        </div>
    )
}

export default ConversationList