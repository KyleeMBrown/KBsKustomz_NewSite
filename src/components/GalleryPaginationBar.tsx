
'use client'
import { cn } from "@/Styling configs/utils";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"

import { useRouter } from "next/navigation";
import { ReactElement, useState } from "react";

  
export const GalleryPaginationBar = ({totalImages, enabled}:{totalImages:number, enabled:boolean}):ReactElement =>{
  const [activeIndex, setActiveIndex] = useState(0)
  const router = useRouter()

  // find the total amount of pages
  const pages: number = Math.ceil(totalImages/9) || 0

  console.log(pages, totalImages)// debug
  const handleNext = (page: number) => {
    if (page < pages - 1) {
      setActiveIndex(page + 1)
      router.push(`?page=${page + 1}`, {scroll:false})
      
    }
  }

  const handleClick = (page: number) => {
    router.push(`?page=${page}`, {scroll:false})
  }

  const handlePrev = (page:number) => {
    if (page !== 0) {
      setActiveIndex(page - 1)
      
      router.push(`?page=${page - 1}`, {scroll:false})
    } else {
      return;
    }
   
  }
 
  
    return (
      <Pagination className={cn(enabled? "text-black" :"text-white")}>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious className="cursor-pointer" onClick={() => {handlePrev(activeIndex)}} />
                </PaginationItem>
                {Array.from({ length: pages }).map((_, i )=> (
                <PaginationItem key={i}>
                    <PaginationLink className="cursor-pointer" onClick={() => {handleClick(i), setActiveIndex(i)}}  isActive={i==activeIndex?true:false}>{i + 1}</PaginationLink>
                </PaginationItem>
                ))}
          <PaginationItem>
            <PaginationNext className="cursor-pointer"  onClick={() => {handleNext(activeIndex)}} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
  }
  
  export default GalleryPaginationBar