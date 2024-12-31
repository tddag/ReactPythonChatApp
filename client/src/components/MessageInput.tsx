import { useState } from "react"
import { useSelector } from "react-redux";
import { RootState } from "../state/store";

interface MessageInputProps {
    conversation_id: number | undefined
}

const MessageInput = ({
    conversation_id
}: MessageInputProps) => {

    const [message, setMessage] = useState("");

    const { currentUser } = useSelector((state: RootState) => state.user)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value)
    }

    const submitMessage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            let url = `${import.meta.env.VITE_SERVER_URL}/api/messages`
            let res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${currentUser?.access_token}`
                 
                },
                body: JSON.stringify({
                    message,
                    sender_id: currentUser?.id,
                    conversation_id: conversation_id
                })
            })

            if (res.ok) {
                console.log("Create a message successfully")
            } else {
                console.log("Failed to create a new message")
            }
        } catch (e) {
            console.log("Failed to create a new message", e)
        }

    }
    return (
        <div>
            <form onSubmit={submitMessage} className="absolute bottom-8 w-3/4 m-auto flex justify-center p-0 gap-4 mb-2">
                <input type="text" placeholder="New Message" className="bg-neutral-100 border-sky-900 border-2 rounded-lg w-7/12 md:w-9/12 p-3" onChange={handleInputChange}/>
                <button className="bg-blue-500 p-4 rounded-lg">Send</button>
            </form>
        </div>
    )
}

export default MessageInput