'use client'

import { useState } from "react";
import { cn } from "@/Styling configs/utils";
import DarkLightModeToggle from "@/components/DarkLightModeToggle";
import { Badge } from "@/components/ui/badge";

/**
 * @returns Main site navigation 
 * @used_in @Sections/Header
 * @description website navigation menu for desktop only users
 * @screen_size > 786px
 * CLIENT COMPONENT
 */
const Gallery = () => {
    const [enabled, setEnabled] = useState(false);

  return (
      <div id="gallery" className={cn((enabled ? "bg-white" : "bg-[#070707]"), "flex max-[768px]:flex-col w-full h-screen p-4")}>
          {/* Left side */}
          <div className="w-[30%] max-[768px]:w-full h-full justify-center pr-4 border-r border-white">
              {/* Light dark mode switch */}
              <div className="flex items-center gap-2 text-white">
                  <DarkLightModeToggle checked={enabled} onCheckedChange={setEnabled} />
              </div>
              <br />
              <br />
              <br/>
              {/* Gallery Paragraph + Title */}
              <div className={cn(enabled ? "text-black" : "text-white")}>
                  <h2 className="text-[1.5em] font-normal mb-[0.5em]">Gallery</h2>
                
                  <p className="font-light text-[0.95em]">Welcome to our gallery! At <strong>KBS Kustomz</strong>, we love bringing cars to life with custom paint jobs and flawless auto body work. Take a look at some of our favorite projects and get inspired to create a ride that’s truly your own.</p>
              </div>
              <br></br>
              <br></br>
              {/* Gallery CTAs */}
              <div className={cn(enabled? "text-black" : "text-white", "flex flex-col gap-2 justify-end h-[55%]")}>
                  <h2 className="text-lg">Quick Links</h2>
                  <div className="flex gap-2">
                      <a href="/contact/"><Badge className={cn(enabled ? "text-black" : "text-gray-500 hover:text-white")} variant="outline">Contact Us</Badge></a>
                      <a href="/about/"><Badge className={cn(enabled ? "text-black" : "text-gray-500 hover:text-white")} variant="outline">Hours</Badge></a>
                      <a href="https://www.google.com/maps/place/KB's+Kustomz/@41.388281,-89.5942745,1350m/data=!3m1!1e3!4m6!3m5!1s0x88098fe3e725c8bf:0x2ae78e393bcc4d23!8m2!3d41.3879585!4d-89.5909702!16s%2Fg%2F11y522h0mc?hl=en&entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoKLDEwMDc5MjA3MUgBUAM%3D"><Badge className={cn(enabled ? "text-black" : "text-gray-500 hover:text-white")} variant="outline">Directions</Badge></a>
                    <a href="/services/"><Badge className={cn(enabled ? "text-black" : "text-gray-500 hover:text-white")} variant="outline">Services</Badge></a>
                    <a href="/about/"><Badge className={cn(enabled ? "text-black" : "text-gray-500 hover:text-white")} variant="outline">About Us</Badge></a>
                  </div>
              </div>
             
          </div>
          {/* Gallery */}
         
          
    </div>
  )
}

export default Gallery