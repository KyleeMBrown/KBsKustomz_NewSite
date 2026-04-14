'use client'
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

const NotFound = () => {
    const pathname = usePathname();

    if (pathname?.startsWith("/auth")) {
        return <><div className="bg-[#fffffff7] w-full h-screen flex flex-col items-center justify-center">
        <h2 className="text-xl">404</h2>
        <br></br>
        <h3>Trouble logging in?</h3>
        <br></br>
        <p>Plese contact <strong>Kylee Brown</strong> for further help</p>
    </div></>
    }

     if (pathname?.startsWith("/dashboard")) {
         return <>
                <div className="bg-[#fffffff7] w-full h-screen flex flex-col items-center justify-center">
                <h2 className="text-xl">404</h2>
                <br></br>
                 <h3>uh oh!...Dashboard page does not exist</h3>
                 <br></br>
                 <a href="/dashboard/" className="bg-black text-white p-2 pr-4 pl-4 rounded-2xl">Back</a>
            </div>
            </>
    }
    return (
    <>
            <div className="bg-[#fffffff7] w-full h-[85vh] flex flex-col items-center justify-center">
                <h2 className="text-xl">404</h2>
                <br></br>
                <h3>Uh oh...No page here!</h3>
                <br></br>
            </div>
            
    </>
            
     
  )
}

export default NotFound