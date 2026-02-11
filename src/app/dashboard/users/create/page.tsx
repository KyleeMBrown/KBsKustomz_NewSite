/**
 * @route /dashboard/users/create
 * @role ADMIN level access only
 * Page where users with ADMIN level permissions can
 * create new users
 * @author Kylee Brown
 */

import CreateUser from "@/components/CreateAUser";

const page = () => {
  return (
    <div className="flex items-center justify-center w-full p-5 h-[92vh] bg-[#240d01]">
      <div className="bg-amber-950 flex max-[768px]:flex-col w-full h-full">
        <div className="w-[60%] max-[768px]:w-full h-full">
          <CreateUser />
        </div>
        <div className="w-[40%] max-[768px]:hidden h-full bg-[url('/images/pexels-matreding-18617935.jpg')] bg-center bg-cover"></div>
      </div>
    </div>
  );
};

export default page;
