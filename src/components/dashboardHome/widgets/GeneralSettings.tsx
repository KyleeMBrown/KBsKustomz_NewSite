import Link from 'next/link'
import React from 'react'

const GeneralSettings = () => {
  return (
      <Link href="/dashboard/settings/general" className="max-[500px]:p-2 w-[48%] h-48 max-[768px]:w-[48%] max-[768px]:h-35 max-[322px]:h-30 bg-white rounded-[1em] text-amber-950 flex flex-col items-center justify-center relative hover:scale-103 cursor-pointer">
          <div className="h-10 w-10 bg-amber-950 max-[768px]:w-8 max-[768px]:h-8 max-[325px]:h-6 max-[325px]:w-6 flex items-center justify-center rounded-[100%] absolute left-3 top-3  max-[768px]:left-2 max-[768px]:top-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-gear max-[325px]:w-3 max-[768px]:w-4" viewBox="0 0 16 16">
            <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0"/>
            <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z"/>
            </svg>
          </div>
        
          <h3 className="font-light text-[1.5em]  max-[768px]:text-[1em] max-[768px]:mt-[1em] max-[365px]:text-[0.9em] max-[380px]:text-[0.95em] max-[345px]:text-[0.8em] max-[325px]:text-[0.75em]">General Settings</h3>
          <p className="font-light italic text-sm mt-2  max-[768px]:text-[0.5em] text-center">Update your account information here</p>
    </Link>
  )
}

export default GeneralSettings