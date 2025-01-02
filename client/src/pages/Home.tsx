import { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom"
import { io } from "socket.io-client";
import { RootState } from "../state/store";


export const SocketContext = createContext<ReturnType<typeof io> | null>(null);  


const Home = () => {

    const { currentUser } = useSelector((state: RootState) => state.user)

    const [socket, setSocket] = useState<ReturnType<typeof io> | null>(null)


    useEffect(() => {
        setSocket(io(import.meta.env.VITE_SERVER_URL, {
            query: {
              user_id: currentUser?.id
            }
        }))

        return () => {
            console.log("Home Component unmounted")
            socket?.disconnect();
            setSocket(null)
        }
    }, [])    

    return (
        <>
            <SocketContext.Provider value={socket}>
                <Outlet/>
            </SocketContext.Provider>
            
        </>
    )
}

export default Home