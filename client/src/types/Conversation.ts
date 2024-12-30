import { Message } from "./Message"
import { User } from "./User"

export type Conversation = {
    conversation_id: number,
    messages: Message[],
    users: User[]
}