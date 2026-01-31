/**
 * @route /dashboard/unauthorized
 * Page for unauthorized users
 * @author Kylee Brown
 */

const page = () => {
  return (
      <div className="flex items-center justify-center h-[92vh] w-full bg-black text-white">Unauthorized!!! <br></br>
       ADMIN ONLY
      </div>
  )
}

export default page