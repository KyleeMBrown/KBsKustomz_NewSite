
import { Dispatch, SetStateAction, useState } from "react"
import Header from "./Header"
import UsersRow from "./UsersRow"
import { Users } from "@/lib/types/Types"

const UsersTable = () => {

  const [data, setData]:[Users[], Dispatch<SetStateAction<Users[]>>] = useState<Users[]>()

  /* Function used to fetch users */
  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users', {
        next: {
          tags:['users']
        }
      })

      const data:Users[] = await response.json()
      setData(data)
    } catch(e) {
      
    }
  }


  return (
    <div className="w-[95%] h-[85%] border rounded-lg">
      <Header />
      {/*TODO: Mapping Logic -> UsersRow */}
      <UsersRow/>
    </div>
  )
}

export default UsersTable
