'use client'

import { Dispatch, SetStateAction, useEffect, useState } from "react"
import Header from "./Header"
import UsersRow from "./UsersRow"
import { Users } from "@/lib/types/Types"
import EditDrawer from "./EditDrawer"
import { Spinner } from "../ui/spinner"
import { Button } from "../ui/button"
import ModalPopup from "../ModalPopup"
import { batchDelete } from "@/ServerActions/User/user"


const UsersTable = ():React.ReactElement => {

  // handle the state of the users
  const [data, setData]:[Users[], Dispatch<SetStateAction<Users[]>>] = useState<Users[]>([])

  // handle the state of the selected users
  const [selectedUsers, setSelectedUsers]: [string[], Dispatch<SetStateAction<string[]>>] = useState<string[]>([])
  
  // handle the drawer open state
  const [open, setOpen]:[boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false)
 
  // handle the current user to edit
  const [currentUser, setCurrentUser]: [Users, Dispatch<SetStateAction<Users>>] = useState<Users>()
  
  // handle the load state
  const [loading, setLoading]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false)
  
  // handle the errorMessage state
  const [errorMessage, setErrorMessage]: [string, Dispatch<SetStateAction<string>>] = useState<string>()

  // handle the modal open state
  const [openModal, setOpenModal]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false)

  // handle the message state
  const [message, setMessage]: [string, Dispatch<SetStateAction<string>>] = useState<string>()
  

  /* Function used to fetch users */
  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/users', {
        next: {
          tags:['users']
        }
      })

      const data: Users[] = await response.json()
      setData(data)
      setLoading(false)
    } catch (e) {
      setLoading(false)
      // handle error
      setErrorMessage(e.message)
      //debug
      console.log(e)
    }
  }

  // handle if all users are selected
  const allSelected = data.length > 0 && selectedUsers.length === data.length
 
  // handle the selected state
  const toggleAll = () => {
    setSelectedUsers(allSelected ? [] : data.map(u => u.id))
  }

  //handle the batch deleter
  const handleBatchDelete = async () => {
    try {
      const { message } = await batchDelete(selectedUsers);
      setMessage(message)
      fetchUsers();
    } catch (e) {
      // handle error
      setMessage(e.message)
      //debug
      console.log(e)
    }
  }

  /* useEffect to fetch users on component mount */
  useEffect(() => {
    fetchUsers()
  }, [])

  return (
   
    <div className="w-[95%] h-[85%] border rounded-lg">
      {/* DELETE Button */}
      {selectedUsers.length > 0 && <div className="bg-[#ffffff12] w-full">
        <Button disabled={selectedUsers.length === 0} onClick={()=>{setOpenModal(true)}} className="bg-red-600 hover:bg-red-700 m-4 cursor-pointer">
          {selectedUsers.length}
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash hover:hidden" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
          </svg>
          Delete
        </Button></div>}
     <Header allSelected={allSelected} toggleAll={toggleAll} />
      {/* Mapping Logic -> UsersRow */}
      {loading ? <div className="h-full w-full flex items-center justify-center"><Spinner/></div>:
        !errorMessage ? data.map((user) => (
        <UsersRow key={user.id} user={user} setSelectedUsers={setSelectedUsers} selectedUsers={selectedUsers} setCurrentUserToEdit={setCurrentUser} setOpen={setOpen} />
      )) : <center>{errorMessage}</center>}
    

      <EditDrawer refresh={fetchUsers} open={open} setOpen={setOpen} currentUser={currentUser}></EditDrawer>
    {/* Delete Modal */}
      <ModalPopup
        className="bg-white text-black"
        open={openModal}
        onOpenChange={setOpenModal}
        description={<span><span className=" font-bold text-red-500 text-[1.5em]">Are you sure?</span><br></br>{message ? <span className="text-black">{message}</span> : <span className="text-red-500">This cannot be undone</span>}</span>}
        customClose={<span>
          {!message && <Button onClick={() => { handleBatchDelete() }} variant="outline" className="cursor-pointer mr-1 bg-red-500 hover:text-red-500 hover:bg-white border-red-500 text-white" >DELETE {selectedUsers.length} Users</Button>}
          <Button onClick={() => { setSelectedUsers([]), setOpenModal(false), setMessage("") }} variant="outline" className="cursor-pointer bg-black border-black text-white hover:bg-white hover:text-black" >{message ? "Ok" : "No"}</Button>
        </span>}
      />
      </div>

  )
}

export default UsersTable
