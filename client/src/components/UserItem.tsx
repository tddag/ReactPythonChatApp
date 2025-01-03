import { useEffect } from "react"
import { User } from "../types/User"
import { useSelector } from "react-redux"
import { RootState } from "../state/store"
import { useNavigate } from "react-router-dom"


interface UserItemProp {
    user: User,
    is_online: boolean | undefined
}

const UserItem = ({
    user,
    is_online
}: UserItemProp) => {

    const { currentUser } = useSelector((state: RootState) => state.user)

    const navigate = useNavigate();

    useEffect(() => {
        console.log("User Item rerendered", user.name, user)
    })

    const handleCreateConversation = async () => {
        try {
            let url = `${import.meta.env.VITE_SERVER_URL}/api/conversation`
            let res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${currentUser?.access_token}`
                },
                body: JSON.stringify({
                    user_ids: [currentUser?.id, user.id]
                })
            })

            if (res.ok) {
                const conversation = await res.json();
                navigate(`/conversations/${conversation.conversation_id}`)
            } else {
                if (res.status == 401) {
                    navigate("/signin")
                }
            }
        } catch (e) {
            console.log("Failed to create a new converastion")
        }
    }
    return (
        <div onClick={handleCreateConversation} className="relative rounded-lg h-15 bg-indigo-200 p-4 flex items-center justify-center uppercase cursor-pointer">
            {user.name}
            {is_online && (
                <span className="bg-green-500 w-2 h-2 absolute top-2 right-2 rounded-full ring-2 ring-white">

                </span>
            )}
        </div>
        
    )
}

export default UserItem