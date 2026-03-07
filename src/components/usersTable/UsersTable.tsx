'use client'

import { Dispatch, SetStateAction, useEffect, useState } from "react"
import Header from "./Header"
import UsersRow from "./UsersRow"
import { Users } from "@/lib/types/Types"
import EditDrawer from "./EditDrawer"
import { Spinner } from "../ui/spinner"


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

  /* useEffect to fetch users on component mount */
  useEffect(() => {
    fetchUsers()
  }, [])


  return (
    <div className="w-[95%] h-[85%] border rounded-lg">
     <Header allSelected={allSelected} toggleAll={toggleAll} />
      {/* Mapping Logic -> UsersRow */}
      {loading ? <div className="h-full w-full flex items-center justify-center"><Spinner/></div>:
        !errorMessage ? data.map((user) => (
        <UsersRow key={user.id} user={user} setSelectedUsers={setSelectedUsers} selectedUsers={selectedUsers} setCurrentUserToEdit={setCurrentUser} setOpen={setOpen} />
      )) : <center>{errorMessage}</center>}
    

      <EditDrawer open={open} setOpen={setOpen} currentUser={currentUser}></EditDrawer>
    
    </div>
  )
}

export default UsersTable
