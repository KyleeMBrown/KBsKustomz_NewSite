/**
 * @route /dashboard/unauthorized
 * Page for unauthorized users
 * @author Kylee Brown
 */

const page = () => {
  return (
    <div className="flex items-center justify-center h-[92vh] w-full bg-white text-amber-950">
      Uh oh...Unauthorized | Admin Access only
    </div>
  )
}

export default page