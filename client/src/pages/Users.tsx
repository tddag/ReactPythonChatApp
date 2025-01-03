import { useState } from "react";
import CreateGroupChatModal from "../components/CreateGroupChatModal";
import UsersList from "../components/UsersList"

const Users = () => {

  const [isGroupChatModalOpen, setIsGroupChatModalOpen] = useState(false)


  const closeModal = () => setIsGroupChatModalOpen(false)

    return (
      <div className="flex flex-col gap-2 md-gap-4  h-5/6">

        <div className="flex justify-center h-20 items-center gap-4 mt-10">
          <button onClick={() => setIsGroupChatModalOpen(true)} className="bg-blue-400 p-4 rounded-lg">Create Group</button>
        </div>

        <UsersList/>

        <CreateGroupChatModal isOpen={isGroupChatModalOpen} closeModal={closeModal}/>
      </div>
    )
}

export default Users