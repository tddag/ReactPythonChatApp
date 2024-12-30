import { User } from "../types/User"


interface MessageHeaderProps {
    userList: User[]
}

const MessageHeader = ({
    userList
}: MessageHeaderProps) => {

    return (
        <div>
            <div>
                {userList.map(user => user.name).join(" + ")}
            </div>
            
        </div>
    )
}

export default MessageHeader