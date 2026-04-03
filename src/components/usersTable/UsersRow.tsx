'use client'
import { Users } from "@/lib/types/Types"
import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"
import { formatDate } from "@/lib/helpers/clientHelpers"
import { Dispatch, SetStateAction } from "react"

const UsersRow = ({ user, setSelectedUsers, selectedUsers, setCurrentUserToEdit, setOpen }: { user: Users, setSelectedUsers: Dispatch<SetStateAction<String[]>>, selectedUsers: String[], setCurrentUserToEdit:Dispatch<SetStateAction<Users>>, setOpen:Dispatch<SetStateAction<boolean>> }):React.ReactElement => {
   
  return (
      <div className="w-full h-[3.5em] flex justify-between items-center p-3 bg-transparent text-white border">
      <div className="w-[10%]"><Checkbox
      checked={selectedUsers.includes(user.id)}
      onCheckedChange={() => {
        setSelectedUsers((prev) => {
          if (prev.includes(user.id)) {
            const newList = prev.filter((id) => id !== user.id)
            return newList
          }

          return [...prev, user.id]

          } 
          )
        }} className="cursor-pointer hover:bg-[#ffffff5a]" /></div>
      <h2 className="w-[25%] text-sm max-[768px]:text-xs max-[768px]:w-[30%]">{user.first_name + " " + user.last_name}</h2>
      <h2 className="w-[40%] text-sm max-[768px]:hidden">{user.email}</h2>
      <h2 className="w-[20%] text-sm">{user.role}</h2>
      <h2 className="w-[25%] text-sm max-[768px]:hidden max-[900px]:hidden">{formatDate(user.updated_at)}</h2>
      <h2 className="w-[25%] text-sm max-[768px]:hidden max-[900px]:hidden">{formatDate(user.created_at)}</h2>
      <div className="w-[20%] flex justify-center">
          <Button onClick={()=>{setCurrentUserToEdit(user), setOpen(true)}} className="border flex items-center hover:text-[#240d01] hover:bg-white cursor-pointer transition-all duration-205 ease-in">
          Edit
          </Button>
      </div>
    </div>
  )
}

export default UsersRow