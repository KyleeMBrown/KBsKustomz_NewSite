import { Checkbox } from "../ui/checkbox"

const Header = () => {
  return (
   <div className="w-full bg-[#ffffff12] text-white rounded-tr-md rounded-tl-md p-3 sticky flex items-center justify-between">
        <div className="w-[20%]"> <Checkbox className=""/></div>
        <h2 className="w-[20%]">Full Name</h2>
        <h2 className="w-[20%]">Email</h2>
        <h2 className="w-[20%]">Modified Date</h2>
        <h2 className="w-[20%]">Create Date</h2>
        <span className="w-[20%]"></span>
    </div>
  )
}

export default Header