"use client"
import { cn } from "@/Styling configs/utils";
import LeftGallery from "@/components/LeftGallery";
import RightGallery from "@/components/RightGallery";
import { useState } from "react";

/**
 * @returns Site Gallery
 * @used_in @Sections/Home/Gallery
 * @description Main website Gallery
 */

const Gallery = ({ images, count }) => {
  // handle the dark/light state
  const [enabled, handleEnabled] = useState(false);
   
  return (
      <div id="gallery" className={cn((enabled ? "bg-white" : "bg-[#070707]"), "flex max-[768px]:flex-col w-full h-screen p-4 max-[768px]:h-[125vh]")}>
          {/* Left Side */}
          <LeftGallery enabled={enabled} setEnabled={handleEnabled}/>
          {/* Right Side Gallery */}
          <RightGallery count={count} enabled={enabled} images={images} />
    </div>
  )
}

export default Gallery