import { useParams } from "react-router-dom"
import ConversationList from "../components/ConversationList"
import MessageList from "../components/MessageList"


const Conversations = () => {

  const { id } = useParams();
  
  return (
    <div className="flex gap-2 md-gap-4 mb-10 h-screen-minus-header-extra md:h-screen-minus-header">
        <ConversationList/>

        <MessageList conversation_id={id ? parseInt(id) : undefined}/>
        
    </div>
  )
}

export default Conversations