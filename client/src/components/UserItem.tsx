import { useEffect } from "react"
import { User } from "../types/User"


interface UserItemProp {
    user: User,
    is_online: boolean | undefined
}

const UserItem = ({
    user,
    is_online
}: UserItemProp) => {

    useEffect(() => {
        console.log("User Item rerendered", user.name, user)
    })
    return (
        <div className="relative rounded-lg h-15 bg-indigo-200 p-4 flex items-center justify-center uppercase">
            {user.name}
            {is_online && (
                <span className="bg-green-500 w-2 h-2 absolute top-2 right-2 rounded-full ring-2 ring-white">

                </span>
            )}
        </div>
        
    )
}

export default UserItem