import SendResetEmailForm from "@/components/SendResetEmailForm"
import Image from "next/image"

const page = () => {

  return (
      <div className="w-full h-screen bg-[#5c4033c7] text-white! flex flex-col items-center justify-center">
          
            
      <Image alt="KB's Kustomz Logo" className="mb-[1em]" src="/images/logo.png" width={150} height={150} />
      
          <p className="text-sm">To update your password, send a magic link to your email</p>
          <br></br>
            <SendResetEmailForm/>
        </div>
  )
}

export default page
