import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"

const UsersRow = () => {
  return (
      <div className="w-full h-[3.5em] flex justify-between items-center p-3 bg-transparent text-white border">
          <div className="w-[20%]"><Checkbox/></div>
          <h2 className="w-[20%]">Full Name</h2>
          <h2 className="w-[20%]">Email</h2>
          <h2 className="w-[20%]">??/??/????</h2>
          <h2 className="w-[20%]">??/??/????</h2>
          <div className="w-[20%] flex justify-center">
              <Button className="border flex items-center hover:text-[#240d01] hover:bg-white cursor-pointer transition-all duration-205 ease-in">
              Edit
              </Button>
          </div>
    </div>
  )
}

export default UsersRow