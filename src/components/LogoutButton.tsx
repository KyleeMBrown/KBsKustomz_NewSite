"use client";
import ModalPopup from "./ModalPopup";
import { Button } from "./ui/button";
import { Dispatch, SetStateAction, useState } from "react";
import { createClient } from "@/Lib/supabase/client";
import { cn } from "@/Styling configs/utils";
import { useRouter } from "next/navigation";

/**
 * Logout Button Component
 * @returns a button the user uses to Logout of the Dashboard
 */

// create supabase client agent
const supabase = createClient();

const LogoutButton = (): React.ReactElement => {
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
      const { error } = await supabase.auth.signOut();

      if (error) {
        throw error;
      }
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <center className="pb-[1em] bg-amber-950">
        <Button
          onClick={() => {
            setOpenLogout(true);
          }}
          className="bg-white w-50 cursor-pointer text-red-600 hover:scale-102 active:scale-100"
        >
          Log out
        </Button>
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
