import { useContext, useEffect, useState } from "react"
import MessageHeader from "./MessageHeader"
import MessageItem from "./MessageItem"
import MessageInput from "./MessageInput"
import { Message } from "../types/Message"
import { SocketContext } from "../main"
import { useSelector } from "react-redux"
import { RootState } from "../state/store"


interface MessageListProps {
    conversation_id: number | undefined
}

const MessageList = ({
    conversation_id
}: MessageListProps) => {

    const [userList, setUserList] = useState([])

    const [messageList, setMessageList] = useState<Message[]>([])

    const { currentUser } = useSelector((state: RootState) => state.user)

    const socket = useContext(SocketContext)

    useEffect(() => {
        getConversationDetails()

        if (conversation_id) {
            socket?.on("new_message_created", newMessageHandler)
            socket?.on("seen_users_updated", seenUsersUpdatedHandler)

            return () => {
                socket?.off("new_message_created", newMessageHandler)
                socket?.off("seen_users_updated", seenUsersUpdatedHandler)

            }
        }

    }, [conversation_id])

    const newMessageHandler = (data: Message) => {
        console.log("Client receive new message", data, "Current user id is: ", currentUser?.id)

        const seen_users = data.seen_users;
        setMessageList((list) => [...list, data])

        if (seen_users) {
            let isUserAlreadySeen = false
            for (let user of seen_users) {
                if (user.id == currentUser?.id) {
                    isUserAlreadySeen = true
                }
            }
            if (!isUserAlreadySeen) {
                let url = `${import.meta.env.VITE_SERVER_URL}/api/messages/${data.id}/seen`
                fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${currentUser?.access_token}`
                    },
                    body: JSON.stringify({
                        user_id: currentUser?.id
                    })                         
                })
            }
        }
    }

    const seenUsersUpdatedHandler = (data: Message) => {
        console.log("Client receive seenUsersUpdated event", data)
        getConversationDetails()

        // let newMessageList = JSON.parse(JSON.stringify(messageList))
        // console.log("New Message List 1: ", newMessageList)

        // for (let i = 0; i < newMessageList.length; i++) {
        //     if (newMessageList[i].id == data.id) {
        //         newMessageList[i].seen_users = data.seen_users;
        //     }
        // }
        // console.log("New Message List 2: ", newMessageList)
        // setMessageList(newMessageList)
    }

    const getConversationDetails = async() => {
        try {
            if (!conversation_id) {
                setUserList([])
                setMessageList([])                
                return
            }
            let url = `${import.meta.env.VITE_SERVER_URL}/api/conversations/${conversation_id}/details`
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${currentUser?.access_token}`
                }             
            })

            if (res.ok) {
                const conversationDetails = await res.json();
                setUserList(conversationDetails.users)
                setMessageList(conversationDetails.messages)

                let lastMessage = conversationDetails.messages[conversationDetails.messages.length - 1]
                let seen_users = lastMessage.seen_users;
                if (seen_users) {
                    let isUserAlreadySeen = false
                    for (let user of seen_users) {
                        if (user.id == currentUser?.id) {
                            isUserAlreadySeen = true
                        }
                    }
                    if (!isUserAlreadySeen) {
                        let url = `${import.meta.env.VITE_SERVER_URL}/api/messages/${lastMessage.id}/seen`
                        fetch(url, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${currentUser?.access_token}`
                            },
                            body: JSON.stringify({
                                user_id: currentUser?.id
                            })                         
                        })
                    }
                }                

            }
        } catch (e) {
            console.log("Failed to get conversation details", e)
        }
    }

    return (
        <div className="relative w-5/6">
            {userList.length > 0 && (
                <div>
                    <MessageHeader userList={userList}/>
                </div>
            )}

            <div className="relative flex flex-col  overflow-auto md:mr-10 gap-3 h-5/6 ">
                {messageList.length > 0 ?
                    messageList.map((message, index) => (
                        <MessageItem message={message} key={index} isLast={index == messageList.length - 1 ? true : false}/>
                    ))
                
              : (
                    <div>
                        Select an existing conversation or start a new conversation
                    </div>
                )}
            </div>

            <MessageInput conversation_id={conversation_id}/>

            
        </div>
    )
}

export default MessageList