import Link from 'next/link'
import React from 'react'

const UploadImages = () => {
    return (
       <Link href="/dashboard/images/upload" className="max-[500px]:p-2 w-[31%] max-[768px]:w-[48%] max-[768px]:h-35 max-[322px]:h-30  h-48 bg-white rounded-[1em] text-amber-950 flex flex-col items-center justify-center relative hover:scale-103 cursor-pointer">
           <div className="h-10 w-10 max-[768px]:w-8 max-[325px]:h-6 max-[325px]:w-6 max-[768px]:h-8 bg-amber-950 flex items-center justify-center rounded-[100%] absolute left-3 top-3 max-[768px]:left-2 max-[768px]:top-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-images max-[768px]:w-4 max-[325px]:w-3" viewBox="0 0 16 16">
                <path d="M4.502 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"/>
                <path d="M14.002 13a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2V5A2 2 0 0 1 2 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-1.998 2M14 2H4a1 1 0 0 0-1 1h9.002a2 2 0 0 1 2 2v7A1 1 0 0 0 15 11V3a1 1 0 0 0-1-1M2.002 4a1 1 0 0 0-1 1v8l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094l1.777 1.947V5a1 1 0 0 0-1-1z"/>
            </svg>
          </div>
          
          <h3 className="font-light text-[1.5em] max-[768px]:text-[1em] max-[768px]:mt-[1em] max-[365px]:text-[0.9em] max-[325px]:text-[0.75em]">Upload Images</h3>
          <p className="font-light italic text-sm mt-2 max-[768px]:text-[0.5em] text-center">Contribute to the KB's Kustomz Gallery</p>
    </Link>
  )
}

export default UploadImages