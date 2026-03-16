"use client"
import { cn } from "@/Styling configs/utils";
import LeftGallery from "@/components/LeftGallery";
import RightGallery from "@/components/RightGallery";
import { useEffect, useState } from "react";

/**
 * @returns Site Gallery
 * @used_in @Sections/Home/Gallery
 * @description Main website Gallery
 */

const Gallery = ({ count, page }) => {
  const [images, setImages] = useState();
  // handle the dark/light state
  const [enabled, handleEnabled] = useState(false);
  const getImages = async () => {
    const response = await fetch(`/api/images/?page=${page}`,
      {
        next: {
          tags: ["images"]
        }
      })
    const {images} = await response.json()
    setImages(images)
  }

  useEffect(() => {
   getImages()
  }, [page])
  
  return (
      <div id="gallery" className={cn((enabled ? "bg-white" : "bg-[#070707]"), "flex max-[768px]:flex-col w-full h-screen relative p-4 max-[768px]:h-[125vh]")}>
          {/* Left Side */}
          <LeftGallery enabled={enabled} setEnabled={handleEnabled}/>
          {/* Right Side Gallery */}
          <RightGallery count={count} enabled={enabled} images={images} />
    </div>
  )
}

export default Gallery