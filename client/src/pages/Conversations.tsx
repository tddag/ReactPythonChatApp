import ConversationList from "../components/ConversationList"
import MessageList from "../components/MessageList"


const Conversations = () => {
  return (
    <div className="flex gap-2 md-gap-4 mb-10 h-screen-minus-header-extra md:h-screen-minus-header">
        <ConversationList/>

        <MessageList/>
        
    </div>
  )
}

export default Conversations