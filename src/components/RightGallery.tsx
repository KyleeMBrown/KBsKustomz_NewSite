
import GalleryImageList from "./GalleryImageList"
import { GalleryPaginationBar } from "./GalleryPaginationBar"
import Spinner from "@/components/Spinner"
import { ReactElement } from "react";
import { Database } from "@/lib/types/supabaseKbs";
import { cn } from "@/Styling configs/utils";

/**
 * @returns Right side of gallery
 * @used_in @Sections/Home/Gallery
 * @description Right side of the site gallery that includes the
 *              list of images the admin uploads to the site
 */
type Images = Database["public"]["Tables"]["images"]["Row"]

export const RightGallery = ({ images, enabled, count }: { images: Images[], enabled: boolean, count: number }):ReactElement => {

  return (
    <div className={cn(enabled ? "custom-scrollbar-white" : "custom-scrollbar-black","w-full flex flex-col gap-4 items-center overflow-hidden")}>
      {/* Gallery Image List*/}
      {images ? <GalleryImageList images={(images)} />:<div className="h-full w-full flex items-center justify-center"><Spinner className="w-9" color="white"/></div>}

      {/* Pagination Bar */}
      <GalleryPaginationBar totalImages={count} enabled={enabled} />
    </div>
  )
}

export default RightGallery