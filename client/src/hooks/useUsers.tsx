import { useContext, useEffect, useState } from "react"
import { User } from "../types/User"
import { useSelector } from "react-redux"
import { RootState } from "../state/store"
import { useNavigate } from "react-router-dom"
import { SocketContext } from "../pages/Home"


const useUsers = () => {
 
    const [usersList, setUsersList] = useState<User[]>([])
    const { currentUser } = useSelector((state: RootState) => state.user)
    const navigate = useNavigate();

    const socket = useContext(SocketContext)


    useEffect(() => {
        const fetchUsers = async() => {
            try {
                let url = `${import.meta.env.VITE_SERVER_URL}/api/users`
                let res = await fetch(url, {
                    headers: {
                        "Authorization": `Bearer ${currentUser?.access_token}`
                    }
                })

                if (res.ok) {
                    let users = await res.json();
                    users = users.filter((u: User) => u.id !== currentUser?.id)
                    users[0].is_online = true
                    setUsersList(users)
                } else {
                    console.log("Failed to fetch users list: ")
                    setUsersList([])                    
                    if (res.status == 401) {
                        navigate("/signin")
                    }
                }
            } catch (e) {
                console.log("Failed to fetch users list: ", e)
                setUsersList([])
            }
        }
        fetchUsers()

      
        socket?.on("user_connected", handleUserConnected)
        socket?.on("user_disconnected", handleUserDisconnected)

        return () => {
            socket?.off("user_connected", handleUserConnected)
            socket?.off("user_disconnected", handleUserDisconnected)

        }

    }, [])

    const handleUserConnected = (data: User) => {
        console.log("Client - User connected event: ", data)
        
        setUsersList((state) => {
            const users = [...state]
            for (let i in users) {
                if (users[i].id == data.id) {
                    users[i].is_online = true
                }
            }
            return users
        })
      
    }  

    const handleUserDisconnected = (data: User) => {
        console.log("Client - User disconnected event: ", data)
        setUsersList((state) => {
            const users = [...state]
            for (let i in users) {
                if (users[i].id == data.id) {
                    users[i].is_online = false
                }
            }
            return users
        })

    }
    
    

    

    return usersList
}

export default useUsers