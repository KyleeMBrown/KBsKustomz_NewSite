"use client"

/**
 * @returns Main site navigation 
 * @used_in @Sections/Header
 * @description website navigation menu for desktop only users
 * @screen_size > 786px
 * CLIENT COMPONENT
 */


import Link from "next/link"
import MobileNavbar from "./MobileNavbar"

const Navbar = ():React.ReactElement => {
  return (
    <nav className="w-full h-[4.25em] p-2 bg-white flex max-[768px]:justify-end justify-center items-center text">
      { /* Mobile Navbar*/}
      <MobileNavbar />
      {/* Desktop NavBar */}
      <div className="w-full flex max-[768px]:hidden">
        {/* Main Link Wrap */}
        <div className="flex items-center justify-start w-full gap-[15%] pl-[20%]">
            <Link href="/">Home</Link>
            <Link href="/services">Services</Link>
          <Link href="/about">About</Link>
          <Link href="/#gallery">Gallery</Link>
        </div>
        <Link className="w-[8em] rounded-sm bg-black cursor-pointer hover:scale-102 active:scale-100 text-white text-center p-2 mr-13" href="/contact">Contact Us</Link>
      </div>
        
    </nav>
  )
}

export default Navbar