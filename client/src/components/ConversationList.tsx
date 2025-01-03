import { useEffect, useState } from "react"
import ConversationListItem from "./ConversationListItem"
import { Link } from "react-router-dom"
import { Conversation } from "../types/Conversation"
import { useSelector } from "react-redux"
import { RootState } from "../state/store"
import { User } from "../types/User"


interface ConversationListProp {
    conversation_id: number | undefined
}

const ConversationList = ({
    conversation_id
}: ConversationListProp) => {

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
                for (let i in conversations) {
                    conversations[i].users = conversations[i].users.filter((user: User) => user.id !== currentUser?.id)
                }
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
        <div className="flex flex-col gap-4 p-2">
            {conversationList.length == 0 ? (
                <div>
                    No conversation.
                </div>
            ):
            conversationList.map((conversation, index) => (
                    <Link to={`/conversations/${conversation.conversation_id}`} key={index} className={"rounded-lg " + (conversation.conversation_id ==  conversation_id ? "bg-yellow-300" : "bg-yellow-100")} >
                        <ConversationListItem conversation={conversation}/>
                    </Link>                        
            ))}
        </div>
    )
}

export default ConversationList