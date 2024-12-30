import { Conversation } from "../types/Conversation"


interface ConversationListItemProps {
    conversation: Conversation
}

const ConversationListItem = ({
    conversation
}: ConversationListItemProps) => {
  return (
    <div className="relative p-3 rounded-3xl uppercase overflow-hidden">
        {conversation.users.length > 0 ? conversation.users.map(user => user.name).join(" + ") : ""}
    </div>
  )
}

export default ConversationListItem