import { Message } from "../types/Message"


interface MessageItemProps {
    message: Message
}

const MessageItem = ({
    message
}: MessageItemProps) => {

    return (
        <div>
            <div>
                <div>
                    <span>{message.message}</span>
                </div>

                <div>
                    {new Date(message.creation_time).toLocaleDateString("en")}
                </div>
            </div>
        </div>
    )
}

export default MessageItem