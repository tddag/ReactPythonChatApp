import ConversationList from "../components/ConversationList"


const Conversations = () => {
  return (
    <div className="flex gap-2 md-gap-4 mb-10 h-screen-minus-header-extra md:h-screen-minus-header">
        <ConversationList/>
        Conversations
    </div>
  )
}

export default Conversations