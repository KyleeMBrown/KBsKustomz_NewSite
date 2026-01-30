"use client";
import ModalPopup from "./ModalPopup";
import { Button } from "./ui/button";
import { Dispatch, SetStateAction, useState } from "react";
import { cn } from "@/Styling configs/utils";
import { useRouter } from "next/navigation";
import { Badge } from "./ui/badge";
import { Spinner } from "./ui/spinner";
import { logOut } from "@/Lib/helpers/signOutServerFunc";
/**
 * Logout Button Component
 * @returns a button the user uses to Logout of the Dashboard
 */



const LogoutButton = ({user}): React.ReactElement => {
  const [openLogout, setOpenLogout]: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ] = useState<boolean>(false);
  const [errMessage, setErrMessage]: [
    string,
    Dispatch<SetStateAction<string>>
  ] = useState<string>(null);
  const router = useRouter();
  const handleLogOut = async () => {
    try {
      await logOut();
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <center className="bg-amber-950">
        <Button
          onClick={() => {
            setOpenLogout(true);
          }}
          className="bg-white w-50 cursor-pointer text-red-600 hover:scale-102 active:scale-100"
        >
          Log out
        </Button>
   
        {/* Fetch and display the current user role and email */}
        {user ?
        <div className="flex gap-0.5 mt-4 pb-1 items-center justify-center">
            <Badge className="bg-[#240d01] mb-2">
              <span className="text-[0.6em] text-white font-light tracking-wider">
                {user?.user_metadata?.user_role}
              </span>
            </Badge>
          <h4 className="text-white font-light opacity-45 text-xs text-center p-2 pt-0">{user?.email}</h4>
        </div>
          : <center className="pb-2 pt-0"><Spinner color="gray" /></center>}
      </center>
      <ModalPopup
        className="bg-black text-white"
        open={openLogout}
        setOpen={setOpenLogout}
        title={
          errMessage ? (
            <span className="text-red-500 font-light">ERROR</span>
          ) : (
            <span className=" font-light">Are you sure?</span>
          )
        }
        customClose={
          <Button
            variant="outline"
            className={cn(
              errMessage && "bg-transparent",
              "bg-red-400 text-white cursor-pointer"
            )}
          >
            {errMessage ? "No" : "Close"}
          </Button>
        }
        footer={
          errMessage ? null : (
            <Button
              onClick={handleLogOut}
              variant="outline"
              className="bg-green-500 text-white cursor-pointer"
            >
              Yes
            </Button>
          )
        }
      />
    </>
  );
};

export default LogoutButton;
