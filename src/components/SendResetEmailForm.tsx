'use client'

import { sendMagicLinkEmail } from '@/ServerActions/User/user'
import { Dispatch, SetStateAction, useState } from 'react'
import { Input } from './ui/input'
import { Field, FieldGroup } from './ui/field'
import { Button } from './ui/button'
import ModalPopup from './ModalPopup'
import { createClientBrowser } from '@/lib/supabase/client'

const SendResetEmailForm = () => {
    // handle email state
    const [email, setEmail]: [string, Dispatch<SetStateAction<string>>] = useState<string>("")
    // handle success or error message state
    const [message, setMessage]: [string, Dispatch<SetStateAction<string>>] = useState<string>("")
    // handle openning the modal
    const [openModal, setOpenModal]:[boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>()

  /* Function to handle sending a password reset email to the sepecified user */
  const handleSendPasswordResetEmail = async() => {
    try {
      const supabase = createClientBrowser()
      // send the magic link
         // magic link email via Supabase
        const { data, error } = await supabase.auth.signInWithOtp({
            email: email,
            options: {
                emailRedirectTo: `http://localhost:3000/api/auth/callback?next=/dashboard/settings/general`
            }
        })
      
      if (error) {
        throw error;
      }
      
      // set success message
      setMessage(`Magic link has been successfully sent!\nPlease check your inbox at ${email}\nNote: you nay need to check your spam!`)
      // open modal
      setOpenModal(true)
      
    } catch (e) {
      // set error message
      setMessage(e.message)
       // open modal
      setOpenModal(true)
    }
  }
    return (
      <>
      <div className="w-[30%]">
          <form onSubmit={(e) => {handleSendPasswordResetEmail(), e.preventDefault()}}>
              <FieldGroup>
                  <Field>
                      <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                      <Button variant='outline' className="email_reset cursor-pointer" type="submit">
                            Send Magic Link
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className=" bi bi-arrow-right-square-fill" viewBox="0 0 16 16">
                            <path d="M0 14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2zm4.5-6.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5a.5.5 0 0 1 0-1"/>
                        </svg>
                      </Button>
                  </Field>
              </FieldGroup>
          </form>
          
      </div>
      <ModalPopup
        className="bg-white text-gray-500"
        open={openModal}
        onOpenChange={setOpenModal}
        description={<span className="text-black">{message}</span>}
        customClose={<Button onClick={()=>{setOpenModal(false)}} variant="outline" className="cursor-pointer hover:bg-gray-500 hover:text-white" >Close</Button>}
      />
      </>
  )
}

export default SendResetEmailForm