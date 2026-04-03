'use client'
/*
EditDrawer.tsx
Drawer used to edit users
Client Component
*/
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Users } from "@/lib/types/Types"
import { useIsMobile } from "@/lib/helpers/clientHelpers"

import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Input } from "../ui/input"
import { Field, FieldGroup, FieldLabel } from "../ui/field"
import { formatDate } from "@/lib/helpers/clientHelpers"
import { cn } from "@/Styling configs/utils"
import DropDownSelect from "../MultiSelect"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { Button } from "../ui/button"
import { deleteUser, updateUser } from "@/ServerActions/User/user"
import { Spinner } from "../ui/spinner"
import ModalPopup from "../ModalPopup"

const EditDrawer = ({ open, setOpen, currentUser, refresh }: { open: boolean, setOpen: Dispatch<SetStateAction<boolean>>, currentUser: Users, refresh:Function }): React.ReactElement => {
  const mobile = useIsMobile(768)
  
  // handle the user first name input state
  const [newFirstName, setNewFirstName]: [string, Dispatch<SetStateAction<string>>] = useState<string>("")
  
  // handle the user last name input state
  const [newLastName, setNewLastName]: [string, Dispatch<SetStateAction<string>>] = useState<string>("")
  
  // handle the user email input state
  const [newEmail, setNewEmail]: [string, Dispatch<SetStateAction<string>>] = useState<string>("")

  // handle the user role input state
  const [newRole, setNewRole]: ["ADMIN"|"GENERAL", Dispatch<SetStateAction<"ADMIN"|"GENERAL">>] = useState<"ADMIN"|"GENERAL">(currentUser?.role)
  
  // handle detail state
  const [showDetails, setShowDetails]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false)

  // handle tooltip state
  const [toolOpen, setToolOpen]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false)

  // handle load state
  const [loading, setLoading]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false)
  // handle success or error message state
  const [message, setMessage]: [string, Dispatch<SetStateAction<string>>] = useState<string>("")
  // handle the success/error modal state
  const [openModal, setOpenModal]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false)
  // handle the delete modal state
  const [openDeleteModal, setOpenDeleteModal]:[boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false)

  // reset the form state
  const reset = () => {
    setNewRole(currentUser?.role)
    setNewFirstName("")
    setNewLastName("")
    setNewEmail("")
  }

  // set user role on state change
  useEffect(() => {
  setNewRole(currentUser?.role)
  }, [currentUser])


  var filteredUpdates:{first_name?:string, last_name?:string, email?:string, role?:"ADMIN" | "GENERAL"};
  var isEmpty: boolean; 
  if (currentUser) {
    filteredUpdates = Object.fromEntries(
      Object.entries({
        first_name: newFirstName,
        last_name: newLastName,
        email: newEmail,
        role: newRole,
      }).filter(([key, value]) => {
       return value !== "" && value !== currentUser[key];
      })

      
    );
    isEmpty = Object.keys(filteredUpdates).length === 0;
  }
   
  

  /* Function to update the current User */
  const handleUpdate = async () => {
    try {
      // set loading true
      setLoading(true)
      // use Server Action to update the user + revalidate fetch
      const { message } = await updateUser(filteredUpdates, currentUser?.id);
      // set the success message
      setMessage(message)
      //open modal
      setOpenModal(true)
      setOpen(false)
      // fetch fresh users
      refresh()
      // reset drawer state
      reset()
      // set laoding false
      setLoading(false)
     
      
    } catch (e) {
      // set loading false
      setLoading(false)
      // set error message
      setMessage(e.message)
      // open modal
      setOpenModal(true)
    }
  }

  /* Function to handle deleting a user */
  const handleDelete = async () => {
    try {
      // start laoding state
      setLoading(true)
      // close the delete modal
      setOpenDeleteModal(false)
      // use Server Action to delete the user + revalidate fetch
      const { message } = await deleteUser(currentUser?.id);
      // set the success message
      setMessage(message)
      //open modal
      setOpenModal(true)
      // close drawer
      setOpen(false)
      // fetch fresh users
      refresh()
      // reset the drawer state
      reset()
      // set laoding false
      setLoading(false)
    } catch (err) {
      // set error message
      setMessage(err.message);
      // open error modal
      setOpenModal(true);

    }
  }


  return (
    <Drawer open={open} onOpenChange={setOpen} onClose={() => { reset() }} direction={mobile? "bottom" : "right"} >
       <DrawerContent className="bg-[#240d01] text-white" >
        <DrawerHeader>
          <div className="flex max-[768px]:justify-center">
             <DrawerTitle>Edit User</DrawerTitle>
             <Tooltip open={toolOpen} onOpenChange={setToolOpen}>
              <TooltipTrigger className="cursor-help">
                <svg
                  onClick={() => {
                    setToolOpen(true);
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="ml-3 bi bi-info-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                </svg>
              </TooltipTrigger>
              <TooltipContent className="bg-white text-black">
                Edit user information here
              </TooltipContent>
            </Tooltip>
          </div>
         
            <DrawerDescription>{currentUser?.first_name + " " + currentUser?.last_name} </DrawerDescription>
            <a onClick={() => { setShowDetails((prev) => !prev) }} className="text-xs text-[#ffffff51] cursor-pointer underline">{showDetails? "Hide Details" : "Show Details"}</a>
            <div className={cn(showDetails ? "h-auto" : "h-0", "overflow-hidden max-[768px]:flex gap-[0.25em] flex-wrap justify-center")}>
              <p className="text-[9px] text-[#ffffff51] italic">Created: {formatDate(currentUser?.created_at)}</p>
            <p className="text-[9px] text-[rgba(255,255,255,0.32)] italic">Created By: {currentUser?.created_by}</p>
            <p className="text-[9px] text-[rgba(255,255,255,0.32)] italic">Last Modified: {formatDate(currentUser?.updated_at)}</p>
            </div>
        </DrawerHeader>
        {!loading ?<FieldGroup className="w-full flex items-center justify-center text-white">
          <Field className="w-[90%]">
            {/* First Name */}
            <FieldLabel htmlFor="firstName">First Name</FieldLabel>
            <Input id="firstName"
              value={newFirstName}
              onChange={(e) => {
                setNewFirstName(e.target.value);
              }}
              placeholder={currentUser?.first_name} className="w-[90%]"></Input>
            {/* Last Name */}
            <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
            <Input id="lastName"
              value={newLastName}
              onChange={(e) => {
                setNewLastName(e.target.value);
              }}
              placeholder={currentUser?.last_name} className="w-[90%]"></Input>
            {/* Email */}
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input id="email"
              type="email"
              value={newEmail}
              onChange={(e) => {
                setNewEmail(e.target.value);
              }}
              placeholder={currentUser?.email} className="w-[90%]"></Input>
            {/* Role Select Dropdown Input*/}
            <FieldLabel>Role</FieldLabel>
            <DropDownSelect
          
              options={[
                { name: "ADMIN", value: "ADMIN" },
                { name: "GENERAL", value: "GENERAL" },
              ]}
              value={newRole}
              setValue={setNewRole}
              className="border-white text-white"
              placeholder={currentUser?.role}
            />
          </Field>
          <Field className="w-[90%] max-[768px]:hidden">
            {/* SAVE CHANGES Button */}
          <Button onClick={() => { handleUpdate() }} disabled={isEmpty} className="text-green-600 bg-white mb-2 max-[768px]:mb-0 hover:bg-[#ffffffe1] cursor-pointer">Save Changes</Button>
            {/* DELETE USER Button */}
            <Button onClick={()=>{ setOpenDeleteModal(true)}} className="bg-red-800 hover:bg-[#ff0000a1] text-white cursor-pointer">Delete User</Button>
             
       
          </Field>
          <div className="w-[90%] hidden max-[768px]:flex gap-3 items-center justify-center">
            {/* DELETE USER Button */}
            <Button onClick={()=>{ setOpenDeleteModal(true)}} className="bg-red-800 hover:bg-[#ff0000a1] text-white cursor-pointer max-[768px]:w-[30%]!">Delete User</Button>
             {/* SAVE CHANGES Button */}
          <Button onClick={() => { handleUpdate() }} disabled={isEmpty} className="text-green-600 bg-white mb-2 max-[768px]:mb-0 hover:bg-[#ffffffe1] cursor-pointer max-[768px]:w-[70%]!">Save Changes</Button>
       
          </div>
        </FieldGroup>: <div className="w-full h-screen flex items-center justify-center"><Spinner /></div>}
        {!loading && <DrawerFooter>
          <center><p className="text-xs text-[#ffffff51] italic max-[768px]:hidden">Last modified: {formatDate(currentUser?.updated_at)}</p></center>
        </DrawerFooter>}
      </DrawerContent>
      {/* Success/Error message pop up modal */}
      <ModalPopup
        className="bg-white text-gray-500"
        open={openModal}
        onOpenChange={setOpenModal}
        description={<span className="text-black">{message}</span>}
        customClose={<Button onClick={()=>{setOpenModal(false)}} variant="outline" className="cursor-pointer hover:bg-gray-500 hover:text-white" >Close</Button>}
      />
      {/* Delete Modal */}
      <ModalPopup
        className="bg-white text-black"
        open={openDeleteModal}
        onOpenChange={setOpenDeleteModal}
        description={<span><span className=" font-bold text-red-600 text-[1.5em]">Are you sure?</span><br></br><span className="text-red-500">This cannot be undone</span></span>}
        customClose={<span>
        <Button onClick={() => {handleDelete() }} variant="outline" className="cursor-pointer mr-1 bg-red-500 hover:text-red-500 hover:bg-white border-red-500 text-white" >DELETE</Button>
        <Button onClick={() => {setOpenDeleteModal(false)}} variant="outline" className="cursor-pointer bg-gray-500 border-gray-500 text-white hover:bg-white hover:text-gray-500" >No</Button>
        </span>}
      />

      
    </Drawer>
    
  )
}

export default EditDrawer