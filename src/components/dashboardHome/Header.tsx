
import Link from 'next/link'

const Header = ({userFirstName, role}:{userFirstName:string, role:string}) => {
  return (
    <div className="text-white">
     {/* HEADER TOP */}
      <div className="flex items-start justify-between max-[768px]:flex-col max-[768px]:gap-4">
        {/* Dashboard Text */}
        <div>
          <h2 className="text-[2em] font-extralight mb-2">Dashboard Home</h2>
          <p className="ml-1 font-light">Welcome Back {userFirstName}!</p>
        </div>
        {/* Create a New User (ONLY FOR ADMIN*/}
        {role === "ADMIN" &&
          <Link href='/dashboard/users/create' className="p-[0.25em] bg-white text-amber-950 border border-solid border-white hover:bg-transparent flex items-center justify-center gap-[1em] rounded-[5px] pl-[1em] pr-[1em] hover:text-white transition">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-plus-fill hover:hidden" viewBox="0 0 16 16">
            <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
            <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-plus hidden" viewBox="0 0 16 16">
            <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
            <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5" />
          </svg>
          <p>Create a New User</p>
        </Link>}
      </div>
      <br></br>
      {/* HEADER BOTTOM */}
      <div className="bg-white text-amber-950 w-full p-[0.5em] flex items-center max-[768px]:justify-between gap-[1.25em] rounded-[3em] max-[768px]:rounded-[1em] shadow-black shadow-sm">
        <div className="rounded-[100%] w-[4em] h-[4em] max-[768px]:w-[3em] max-[768px]:h-[2.6em] flex items-center justify-center bg-amber-950">
           <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" className="bi bi-laptop max-[768px]:w-6" viewBox="0 0 16 16">
            <path d="M13.5 3a.5.5 0 0 1 .5.5V11H2V3.5a.5.5 0 0 1 .5-.5zm-11-1A1.5 1.5 0 0 0 1 3.5V12h14V3.5A1.5 1.5 0 0 0 13.5 2zM0 12.5h16a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5"/>
          </svg>
        </div>
       {/* Words & Button */}
        <div className="flex items-center justify-between w-[90%]">
          <div className="max-[768px]:hidden">
            <h2 className="font-normal text-[1.5em]">Check out the LIVE site</h2>
            <p className="font-light text-[0.85em]">Watch your edits appear on the site as you go</p>
          </div>
          {/* Go Tp WebsiteButton */}
          <Link href="/" target='_blank' className="bg-amber-950 max-[768px]:w-full max-[768px]:justify-between rounded-[1.5em] pr-[1em] pl-[1em] max-[768px]:pr-[1.5em] max-[768px]:pl-[2em] max-[768px]:text-[9px] max-[768px]:p-2 text-white hover:text-amber-950 border hover:border-amber-950 p-[0.5em] flex items-center gap-2 transition-all ease-in duration-150 hover:bg-transparent">
            <p>Go to Live Website</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-up-right max-[768px]:w-3" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"/>
              <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"/>
            </svg>  
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Header