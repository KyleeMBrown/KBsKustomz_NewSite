"use client"
/**
 * @returns Component used to create a new user for the KB's Kustomz Dashboard
 * @description Set users name, role, email, and password
*/
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { Dispatch, SetStateAction, useState } from 'react'
import { cn } from '@/lib/utils'
import DropDownSelect from './MultiSelect'
import { createClient } from '@/lib/supabase/client'
import ModalPopup from './ModalPopup'
import { AuthApiError } from '@supabase/supabase-js'
import Spinner from './Spinner'
import SuccessfulSubmission from './SuccessfulSubmission'

const supabase = createClient();

const CreateUser = () => {
  
  const [firstName, setFirstName]: [string, Dispatch<SetStateAction<string>>] = useState<string>("");
  const [lastName, setLastName]:[string, Dispatch<SetStateAction<string>>] = useState<string>("");
  const [password, setPassword]:[string, Dispatch<SetStateAction<string>>] = useState<string>("");
  const [confirmPass, setConfirmPass]:[string, Dispatch<SetStateAction<string>>] = useState<string>("");
  const [email, setEmail]:[string, Dispatch<SetStateAction<string>>] = useState<string>("");
  const [confirmEmail, setConfirmEmail]: [string, Dispatch<SetStateAction<string>>] = useState<string>("");
  
  const [role, setRole]:[string, Dispatch<SetStateAction<string>>] = useState<string>("")
  
  const [open, setOpen]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false)
  const [error, setError]: [AuthApiError, Dispatch<SetStateAction<AuthApiError>>] = useState<AuthApiError>();
  
  const [loading, setLoading]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false)
  const [success, setSuccess]:[boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false)

  const formFilled: boolean = (lastName && email && confirmEmail && password && confirmPass && role) != ""
  const emailMatch: boolean = (email === confirmEmail) && (email && confirmEmail != "")
  const passMatch: boolean = (password === confirmPass) && (password && confirmPass != "")


  const handleCreateUser = async():Promise<void> => {
    try {
      setLoading(true)
      if (emailMatch && passMatch) {
        //TODO: Rreplace the below with server side login using the service_role_key
        const { data,  error } = await supabase.auth.signUp({
          email: email,
          password: password,
          options: {
            data: {
              user_role:role
            }
          }
        })

        if (error) { throw error }

        //TODO: Insert user into table => /user 
        console.log("User successfully created")
        setSuccess(true)
        setLoading(false)
      } else {
        throw new Error("Email or Password Does not match")
      }
      
      
    } catch (err) {
      setLoading(false)
      setOpen(true)
      console.log(err)
      setError(err)
    }
  }

  return (
    <div className="w-full h-full">
      {!loading ?
        (<div className={ cn(success && 'hidden')}>
            <center className="p-6 max-[768px]:pb-2"><h1 className='text-white uppercase'>Create a User</h1></center>
            <form onSubmit={async (e) => {
              e.preventDefault(),
              handleCreateUser()
              }} className="flex flex-col items-center justify-center max-[768px]:p-5">
              {/* First Name Input*/}
              <Label htmlFor="firstName" className="text-white w-[70%] max-[768px]:w-full mb-2">First Name*</Label>
              <Input id="firstName" value={firstName} onChange={(e)=>{setFirstName(e.target.value)} } required type="text" className="border-white w-[70%] max-[768px]:w-full text-white"></Input>
              <br></br>
              {/* Last Name Input*/}
              <Label htmlFor="lastName" className="text-white w-[70%] max-[768px]:w-full mb-2">Last Name*</Label>
              <Input value={lastName} onChange={(e) => { setLastName(e.target.value) }} id="lastName" required type="text" className= "border-white w-[70%] max-[768px]:w-full text-white"></Input>
              <br></br>
              {/* Role Select Dropdown Input*/}
              <DropDownSelect options={[{ name: "Admin", value: "ADMIN" }, { name: "General", value: "GENERAL" }]} value={role} setValue={setRole} className="border-white text-white" placeholder="Select a Role"/>
              {/* Email Input*/}
              <Label htmlFor="email" className="text-white w-[70%] max-[768px]:w-full mb-2">Email*</Label>
              <Input id="email" value={email} onChange={(e) => { setEmail(e.target.value) }} required type="email" className={cn(emailMatch && "border-green-400 ", " w-[70%] max-[768px]:w-full text-white")}></Input>
              <br></br>
              {/* Confirm Email Input*/}
              <Label htmlFor="confirmEmail" className="text-white w-[70%] max-[768px]:w-full mb-2">Confirm Email*</Label>
              <Input id="confirmEmail" value={confirmEmail} onChange={(e) => { setConfirmEmail(e.target.value) }} required type="email" className={cn(emailMatch && "border-green-400 ", "w-[70%] max-[768px]:w-full text-white")}></Input>
              <br></br>
              {/* Password Input */}
              <Label htmlFor="pass" className="text-white w-[70%] max-[768px]:w-full mb-2">Password*</Label>
              <Input id="pass" required value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" className={cn(passMatch && "border-green-400 ", "w-[70%] max-[768px]:w-full text-white")}></Input>
              <br></br>
              {/* Confirm password Input*/}
              <Label htmlFor="confirmPass" className="text-white w-[70%] max-[768px]:w-full mb-2">Confirm Password*</Label>
              <Input id="confirmPass" value={confirmPass} onChange={(e) => { setConfirmPass(e.target.value) }} required type="password" className={cn(passMatch && "border-green-400 ", "w-[70%] max-[768px]:w-full text-white")}></Input>
              <br></br>
              {/* Create User Button (Submit) */}
              <Button type="submit" disabled={!formFilled} className='bg-white max-[768px]:w-full w-[70%] hover:bg-amber-950 hover:text-white cursor-pointer hover:border-white border border-transparent'>Create User</Button>
            </form>
        </div>) :
        <div className="flex items-center justify-center h-full w-full"><Spinner color="white" className="w-10" /></div>}
      {success ? <SuccessfulSubmission message="User has beem successfully created!" successURL='/dashboard/users/create'/> : null}
      <ModalPopup
        open={open}
        setOpen={setOpen}
        title={<span className="text-red-500">ERROR</span>}
        customClose={<Button className="cursor-pointer text-white  hover:bg-white hover:text-gray-400" variant="outline">Close</Button>}
        description={
          <div className="text-left"><br></br>{error?.message} . . . please try again
            <br></br>
            <div className="text-xs text-gray-500 text-left">
              <br></br>Supabase Code [{error?.code}]
              <br></br>Status Code [{error?.status}]
            </div>
          </div>}
        className="z-999 bg-[#00000078] text-white backdrop-blur-lg border-none"
        />
    </div>
  )
}

export default CreateUser