'use client'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Input } from './ui/input';
import { Field, FieldGroup, FieldLabel, FieldSeparator } from './ui/field';
import { Spinner } from './ui/spinner';
import { formatDate } from '@/lib/helpers/clientHelpers';
import { Button } from './ui/button';
import { updatePassword, updateUser } from '@/ServerActions/User/user';
import ModalPopup from './ModalPopup';
import { cn } from '@/Styling configs/utils';

type User = {
    created_at: string;
    created_by: string;
    email: string;
    first_name: string;
    last_name: string;
    role: "ADMIN" | "GENERAL";
    updated_at: string;
}

const SettingsForm = ({userId}:{userId:string}) => {
    // handle the user load state
    const [loading, setLoading]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false)
    
    // handle the update load state
    const [updateLoading, setUpdateLoading]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false)

     // handle the update load state
    const [updatePasswordLoading, setUpdatePasswordLoading]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false)

    // handle user state
    const [user, setUser]: [User, Dispatch<SetStateAction<User>>] = useState<User>()
    
    // handle the user first name input state
    const [newFirstName, setNewFirstName]: [string, Dispatch<SetStateAction<string>>] = useState<string>("")
    
    // handle the user last name input state
    const [newLastName, setNewLastName]: [string, Dispatch<SetStateAction<string>>] = useState<string>("")
    
    // handle the user email input state
    const [newEmail, setNewEmail]: [string, Dispatch<SetStateAction<string>>] = useState<string>("")

    // handle the user password state
    const [newPassword, setNewPassword]: [string, Dispatch<SetStateAction<string>>] = useState<string>("")
    
    // handle the user password state
    const [confirmNewPassword, setConfirmNewPassword]: [string, Dispatch<SetStateAction<string>>] = useState<string>("")

    // handle success or error message state
    const [message, setMessage]: [string, Dispatch<SetStateAction<string>>] = useState<string>("")

    // handle the success/error modal state
    const [openModal, setOpenModal]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false)

    /* Function to reset the form state */
    const reset = () => {
        setNewFirstName("")
        setNewLastName("")
        setNewEmail("")
    }

    const resetPass = ()=> {
        setNewPassword("")
        setConfirmNewPassword("")
    }
    const passwordMatch:boolean = (confirmNewPassword === newPassword) && (newPassword !== "" && confirmNewPassword !== "")

    /* Function to handle user fetch */
    const requestUser = async () => {
        try {
            // fetch the user using the API route /api/user/(userId)
            const response = await fetch(`/api/user/${userId}`, {
            next: {
                tags:['user']
            }
            })
            // retrieve user
            const data: User = await response.json()
            // return the user object
            return data
        } catch (e) {
            // debug
            console.log(e)
            // set error message
            setMessage(e.message)
            // open modal
            setOpenModal(true)
        }
    }

    // object that will hold the user updates
    var filteredUpdates:{first_name?:string, last_name?:string, email?:string};
    // boolean to track wether the form has changed
    var isEmpty: boolean;
    
    /* Filter and build the updates object */
    // if user
    if (user) {
        // filter the object entries
        filteredUpdates = Object.fromEntries(
            Object.entries({
                first_name: newFirstName,
                last_name: newLastName,
                email: newEmail
            }).filter(([key, value]) => {
            // filter out empty entries 
            // and entries that didn't change
            return value !== "" && value !== user[key];
            })
        );

        // set isEmpty equal to the filtered Updates array at length 0
        isEmpty = Object.keys(filteredUpdates).length === 0;
    }

    /* Function to update user info */
    const handleUpdate = async() => { 
        try { 
            // start load state for te update button
            setUpdateLoading(true);
            // use Server Action to update the user + revalidate fetch
            const { message } = await updateUser(filteredUpdates, userId);
            // set success message
            setMessage(message)
            // reset the form state
            reset()
            // open modal
            setOpenModal(true)
            // request the user from the server
            const data: User = await requestUser();
            // set User
            setUser(data)
            // stop load state
            setUpdateLoading(false)
        } catch (e) {
            // debug
            console.log(e)
            // stop loading
            setUpdateLoading(false)
            // set error message
            setMessage(e.message)
            // open modal
            setOpenModal(true)

        }
    }

    /* Function to handle password reset */
    const handleUpdatePassword = async () => {
        try {
             // set loading true
            setUpdatePasswordLoading(true)

            // if the confirmed password matches the new password
            if (passwordMatch) {
                // update the user's password
                const { message } = await updatePassword(newPassword)
                // set the success message
                setMessage(message)
                // stop loading
                setUpdatePasswordLoading(false)
                // reset the form state
                resetPass()
                // open modal
                setOpenModal(true)
            } else {
                // stop loading
                setUpdatePasswordLoading(false)
                // set the error message
                setMessage("Uh oh Passwords do not match\n Please try again!")
            }

        } catch (e) {
            // debug
            console.log(e)
            // stop loading
            setUpdatePasswordLoading(false)
            // set error message
            setMessage(e.message)
            // open modal
            setOpenModal(true)
        }
    
    }
   
     /* Function used to fetch user data */
      const fetchUser = async () => {
        try {
            // start load state
            setLoading(true)
            // request the user from the server
            const data: User = await requestUser();
            // set User
            setUser(data)
            // stop loading
            setLoading(false)
        } catch (e) {
            //debug
            console.log(e)
            // stop loading
            setLoading(false)
            // handle error
            setMessage(e.message)
            
        }
      }
    
    /* Fetch the user when userId is recieved */
    useEffect(() => {
        const handleFetch = async () => {
            try {
                await fetchUser()
            } catch (e) {
                console.log(e)
            }
        }
        
        handleFetch()
    }, [userId])
    
  return (
    <div>
          {/* Form */}
          <form className="flex items-center justify-center text-white">
              <Field className="w-[80%] mt-[3em] max-[768px]:mt-[1em]">
                  <h2 className="text-[#ffffff3b] text-lg uppercase">General Settings</h2>
                  <FieldGroup className='flex items-center justify-center gap-4 flex-row'>
                    {/* First Name */}
                    <FieldGroup className="w-[50%]">
                        <FieldLabel>First Name</FieldLabel>
                        <Input  value={newFirstName}
                                onChange={(e) => {
                                    setNewFirstName(e.target.value);
                                }}
                              className="bg-white text-black!" type="text" placeholder={user?.first_name}></Input>
                    </FieldGroup>
                    {/* Last Name */}
                    <FieldGroup className="w-[50%]">
                        <FieldLabel>Last Name</FieldLabel>
                        <Input value={newLastName}
                                onChange={(e) => {
                                    setNewLastName(e.target.value);
                                }} className="bg-white text-black!" type="text" placeholder={user?.last_name}></Input>
                    </FieldGroup>
                  </FieldGroup>
                   
                {/* Email */}
                <FieldLabel>Email</FieldLabel>
                  <Input value={newEmail}
                        onChange={(e) => {
                            setNewEmail(e.target.value);
                        }}
                      className="bg-white text-black!" type="email" placeholder={user?.email}></Input>
                  {/* UPDATE BUTTON */}
                  <Button onClick={()=>{handleUpdate()}} disabled={isEmpty || updateLoading} className="bg-white border-2 border-white border-solid cursor-pointer text-amber-950 hover:bg-transparent hover:text-white"> {updateLoading ? <Spinner className="text-amber-950"/>:"Update"}</Button>
                  <center className='text-sm italic text-[#ffffff3b] max-[385px]:pb-[1em]'>Last Modified: {formatDate(user?.updated_at)}</center>
                  <FieldSeparator/>
                  {/* RESET PASSWORD */}
                  <h2 className= "text-[#ffffff3b] text-lg uppercase">Reset Password</h2>
                 
                  {/* New Password */}
                  <FieldLabel>New Password</FieldLabel>
                  <Input value={newPassword}
                        onChange={(e) => {
                            setNewPassword(e.target.value);
                        }}
                      className={cn(passwordMatch ? "border-green-400" : "border-[#4c4c4c6e]", "bg-white border-solid border-2 text-black! transition-all ease-in duration-75")} placeholder="New Password" type="password"></Input>
                   {/* Confirm New Password */}
                  <FieldLabel>Confirm New Password</FieldLabel>
                  <Input
                      value={confirmNewPassword}
                        onChange={(e) => {
                            setConfirmNewPassword(e.target.value);
                        }}
                      className={cn(passwordMatch ? "border-green-400" : "border-[#4c4c4c6e]", "bg-white border-solid border-2 text-black! transition-all ease-in duration-75")} placeholder="Confirm New Password" type="password"></Input>
                  {/* UPDATE PASSWORRD BUTTON */}
                  <Button disabled={!passwordMatch || updatePasswordLoading} onClick={()=>{handleUpdatePassword()}} className="bg-white border-2 border-white border-solid cursor-pointer text-amber-950 hover:bg-transparent hover:text-white">{updatePasswordLoading ? <Spinner className="text-amber-950"/>:"Update Password"}</Button>
                  <center className='text-sm italic text-[#ffffff3b] max-[385px]:pb-[1em]'></center>
              </Field>
          </form>
          {/* Success/Error message pop up modal */}
      <ModalPopup
        className="bg-white text-gray-500"
        open={openModal}
        onOpenChange={setOpenModal}
        description={<span className="text-black">{message}</span>}
        customClose={<Button onClick={()=>{setOpenModal(false)}} variant="outline" className="cursor-pointer hover:bg-gray-500 hover:text-white" >Close</Button>}
      />
          {loading && <div className="absolute w-full h-screen top-0 backdrop-blur-md bg-[#00000024] flex items-center justify-center"><Spinner className="text-white"></Spinner></div>}
    </div>
  )
}

export default SettingsForm