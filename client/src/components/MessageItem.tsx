import { useSelector } from "react-redux"
import { Message } from "../types/Message"
import { RootState } from "../state/store"


interface MessageItemProps {
    message: Message
}

const MessageItem = ({
    message
}: MessageItemProps) => {

    const { currentUser } = useSelector((state: RootState) => state.user)

    return (
        <div className={"flex " + (currentUser?.id == message.sender_id ? "justify-end" : "")}>
            <div className="bg-slate-200 rounded-xl p-4 flex flex-col gap-1">
                <div className={"flex gap-4 " + (currentUser?.id !== message.sender_id ? "" : "flex-row-reverse")}>
                    <span>{message.message}</span>
                </div>

                <div className={"flex " + (currentUser?.id == message.sender_id ? "justify-end": "")}>
                    {new Date(message.creation_time).toLocaleDateString("en")}
                </div>
            </div>
        </div>
    )
}

export default MessageItem