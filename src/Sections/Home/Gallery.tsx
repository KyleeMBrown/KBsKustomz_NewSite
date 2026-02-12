'use client'

import { useState } from "react";
import { cn } from "@/Styling configs/utils";
import LeftGallery from "@/components/LeftGallery";

/**
 * @returns Site Gallery
 * @used_in @Sections/Home/Gallery
 * @description Main website Gallery
 * CLIENT COMPONENT
 */

const Gallery = () => {
    const [enabled, setEnabled] = useState(false);

  return (
      <div id="gallery" className={cn((enabled ? "bg-white" : "bg-[#070707]"), "flex max-[768px]:flex-col w-full h-screen p-4")}>
          {/* Left Side */}
          <LeftGallery enabled={enabled} setEnabled={setEnabled}/>
          {/* Right Side Gallery */}
          
    </div>
  )
}

export default Gallery