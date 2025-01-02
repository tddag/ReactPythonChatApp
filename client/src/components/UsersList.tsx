import UserItem from "./UserItem"
import useUsers from "../hooks/useUsers"
import { SocketContext } from "../pages/Home";
import { useContext, useEffect } from "react";


const UsersList = () => {
    const usersList = useUsers();
    const socket = useContext(SocketContext)

    useEffect(() => {
        console.log("Users List mounted")
        console.log("Socket is: ", socket)
    }, [])

    useEffect(() => {
        console.log("Users List rerendered")
    }) 

    return (
        <div className="h-full overflow-auto m-auto">
            <div className="flex flex-wrap gap-6 p-6 justify-center">
                {usersList.map((user, index) => 
                    <UserItem key={index} user={user} is_online={user.is_online}/>
                )}
            </div>

        </div>
    )
}

export default UsersList