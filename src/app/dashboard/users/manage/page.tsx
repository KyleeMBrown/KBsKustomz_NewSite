/**
 * @route /dashboard/users/manage
 * @role ADMIN level access only
 * Page where users with ADMIN level permissions can manage users
 * @author Kylee Brown
 */
import UsersTable from "@/components/usersTable/UsersTable"

const page = () => {
  return (
      <div className="w-full h-[92vh] text-white bg-[#240d01]">
        <div className="p-6 pb-8 h-[20%]">
            <h1 className="text-white text-[2em] font-semibold">Manage Users</h1>  
            <p className="text-white font-thin">Manage the dashboard users here</p>
        </div>
        {/* Table here */}
          <div className="w-full h-[80%]  max-[768px]:h-auto  max-[768px]:max-h-[50%] flex items-start justify-center">
            <UsersTable />
          </div> 
    </div>
  )
}

export default page