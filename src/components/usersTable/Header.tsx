'use client'
import { Checkbox } from "../ui/checkbox"

const Header = ({allSelected, toggleAll}:{allSelected:boolean, toggleAll:Function}) => {
  
  
  return (
   <div className="w-full bg-[#ffffff12] text-white rounded-tr-md rounded-tl-md p-3 sticky flex items-center justify-between gap-[1em]">
      <div className="w-[10%]"> <Checkbox
        checked={allSelected}
        onCheckedChange={() => {toggleAll()}} className="cursor-pointer hover:bg-[#0000005a]"/></div>
        <h2 className="w-[25%] max-[768px]:w-[30%]">Full Name</h2>
        <h2 className="w-[40%] max-[768px]:hidden">Email</h2>
       <h2 className="w-[20%] max-[768px]:w-[45%]">Role</h2>
        <h2 className="w-[25%] max-[900px]:hidden max-[768px]:hidden">Modified Date</h2>
        <h2 className="w-[25%] max-[900px]:hidden max-[768px]:hidden">Create Date</h2>
        <h2 className="w-[18%] max-[768px]:hidden"></h2>
    </div>
  )
}

export default Header