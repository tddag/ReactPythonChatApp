import { User } from "./User"

export type Message = {
    id?: string,
    sender_name?: string,
    message: string,
    creation_time: string,
    sender_id?: string,
    conversation_id?: string,
    seen_users?: User[]
}