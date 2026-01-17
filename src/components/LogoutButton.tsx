"use client"
import ModalPopup from "./ModalPopup"
import { Button } from "./ui/button"
import { Dispatch, SetStateAction, useState } from "react"

/**
 * Logout Button Component
 * @returns a button the user uses to Logout of the Dashboard
 */

const LogoutButton = ():React.ReactElement => {
    const [openLogout, setOpenLogout]:[boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false)
  return ( 
      <>
          <center className="pb-[1em]"><Button onClick={()=>{setOpenLogout(true)}} className="bg-white w-50 cursor-pointer text-red-600 hover:scale-102 active:scale-100">Log out</Button></center>
          <ModalPopup
              className="bg-white"
              open={openLogout}
              setOpen={setOpenLogout}
              title={"Are you sure?"}
              customClose={
                      <Button className="bg-gray-400 text-white">No</Button>
              }
              footer={<Button variant="outline" className='bg-green-500 text-white'>Yes</Button>}
          />
      </>
  )
}

export default LogoutButton