import { Checkbox, Modal } from "antd"
import useUsers from "../hooks/useUsers"
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { useNavigate } from "react-router-dom";


interface CreateGroupChatModalProps {
    isOpen: boolean,
    closeModal: () => void
}

const CreateGroupChatModal = ({
    isOpen,
    closeModal
}: CreateGroupChatModalProps) => {


    const userList = useUsers();

    const [checkedUsers, setCheckedUsers] = useState<number[]>([])

    const { currentUser } = useSelector((state: RootState) => state.user)

    const navigate = useNavigate();

    const handleCreateConversation = async () => {
        if (checkedUsers.length == 0) {
            return
        }
        try {
            let url = `${import.meta.env.VITE_SERVER_URL}/api/conversation`
            let res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${currentUser?.access_token}`
                },
                body: JSON.stringify({
                    "user_ids": [
                        currentUser?.id,
                        ...checkedUsers
                    ]
                })
            })

            if (res.ok) {
                const conversation = await res.json();
                navigate(`/conversations/${conversation.conversation_id}`)
            } else {
                if (res.status == 401) {
                    navigate("/signin")
                }
            }
        } catch (e) {
            console.log("Failed to create conversation", e)

        }
    }

    const onCheckboxChange = (checkedValues: number[]) => {
        setCheckedUsers(checkedValues)
    }

    return (
        <>
            <Modal title="Create Group" open={isOpen} onCancel={closeModal} okText="Create" centered={true} onOk={handleCreateConversation}>
                <Checkbox.Group value={checkedUsers} className="flex flex-col gap-3 mt-5" onChange={onCheckboxChange}>
                    {userList.map((user, index) => (
                        <Checkbox key={index} className="uppercase" value={user.id}>
                            {user.name}
                        </Checkbox>   
                    ))}                    
                    
                </Checkbox.Group>
            </Modal>       
        </>
    )
}

export default CreateGroupChatModal