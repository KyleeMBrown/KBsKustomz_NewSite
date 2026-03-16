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

import { Dispatch, SetStateAction, useState } from "react"
import { Input } from "../ui/input"
import { Field, FieldGroup, FieldLabel } from "../ui/field"
import { formatDate } from "@/lib/helpers/clientHelpers"
import { cn } from "@/Styling configs/utils"
import DropDownSelect from "../MultiSelect"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { Button } from "../ui/button"

const EditDrawer = ({ open, setOpen, currentUser }: { open: boolean, setOpen: Dispatch<SetStateAction<boolean>>, currentUser: Users }): React.ReactElement => {
  const mobile = useIsMobile(768)
  
  // handle the user first anme input state
  const [newFirstName, setNewFirstName]: [string, Dispatch<SetStateAction<string>>] = useState<string>("")
  
  // handle the user last name input state
  const[newLastName, setNewLastName]:[string, Dispatch<SetStateAction<string>>] = useState<string>("")
  
  // handle the user email input state
  const[newEmail, setNewEmail]:[string, Dispatch<SetStateAction<string>>] = useState<string>("")

  // handle the user role input state
  const [newRole, setNewRole]: [string, Dispatch<SetStateAction<string>>] = useState<string>("")
  
  // handle detail state
  const [showDetails, setShowDetails]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false)

  // handle tooltip state
  const [toolOpen, setToolOpen]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false)

  // reset the form state
  const reset = () => {
    setNewRole("")
    setNewFirstName("")
    setNewLastName("")
    setNewEmail("")
  }

  return (
    <Drawer open={open} onOpenChange={setOpen} onClose={() => { reset() }} direction={mobile? "bottom" : "right"} >
      <DrawerContent className="bg-[#240d01] text-white">
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
            <div className={cn(showDetails ? "h-auto" : "h-0", "overflow-hidden")}>
              <p className="text-xs text-[#ffffff51] italic">Created: {formatDate(currentUser?.created_at)}</p>
              <p className="text-xs text-[rgba(255,255,255,0.32)] italic">Created By: {currentUser?.created_by}</p>
            </div>
        </DrawerHeader>
        <FieldGroup className="w-full flex items-center justify-center text-white">
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
          <Field>
              
          </Field>
        </FieldGroup>
        <DrawerFooter>
          {/* SAVE Button */}
          <Button className="text-green-600 bg-white mb-2 hover:bg-[#ffffffe1] cursor-pointer">Save Changes</Button>
          {/* DELETE Button */}
          <Button className="bg-red-800 hover:bg-[#ff0000a1] text-white cursor-pointer">Delete User</Button>
          <br></br>
           <center><p className="text-xs text-[#ffffff51] italic">Last modified: {formatDate(currentUser?.updated_at) }</p></center>
        </DrawerFooter>
        </DrawerContent>
      </Drawer>
  )
}

export default EditDrawer