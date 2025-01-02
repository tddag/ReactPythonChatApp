import { useParams } from "react-router-dom"
import ConversationList from "../components/ConversationList"
import MessageList from "../components/MessageList"

const Conversations = () => {

  const { id } = useParams();
 
  return (
    <div className="flex gap-2 md-gap-4  h-5/6">
      <ConversationList/>

      <MessageList conversation_id={id ? parseInt(id) : undefined}/>
        
    </div>
  )
}

export default Conversations