import { useParams } from "react-router-dom"
import ConversationList from "../components/ConversationList"
import MessageList from "../components/MessageList"
import { io } from "socket.io-client";
import { createContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";



export const SocketContext = createContext<ReturnType<typeof io> | null>(null);  

const Conversations = () => {

  const { id } = useParams();

  const { currentUser } = useSelector((state: RootState) => state.user)

  const socket = io(import.meta.env.VITE_SERVER_URL, {
    query: {
      user_id: currentUser?.id
    }
  })

  useEffect(() => {
    return () => {
      socket.disconnect();
    }
  }, [socket])
  
  return (
    <div className="flex gap-2 md-gap-4  h-5/6">
        <SocketContext.Provider value={socket}>
          <ConversationList/>

          <MessageList conversation_id={id ? parseInt(id) : undefined}/>
        </SocketContext.Provider>
        
    </div>
  )
}

export default Conversations