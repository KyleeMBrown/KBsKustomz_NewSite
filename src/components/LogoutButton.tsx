"use client";

/**
 * Logout Button Component
 * @author Kylee Brown
 * @used_in @component/app-sidebar.tsx
 * @returns a button the user uses to Logout of the Dashboard
 * and displays the info of the current user (role, email)
 * CLIENT COMPONENT
 */

import ModalPopup from "./ModalPopup";
import { Button } from "./ui/button";
import { Dispatch, SetStateAction, useState } from "react";
import { cn } from "@/Styling configs/utils";
import { useRouter } from "next/navigation";
import { Badge } from "./ui/badge";
import { Spinner } from "./ui/spinner";
import { createClientBrowser } from "@/lib/supabase/client";

const LogoutButton = ({ user }): React.ReactElement => {
  // supabase browser client for handling logout
  const supabase = createClientBrowser();

  // handles logout modal state
  const [openLogout, setOpenLogout]: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ] = useState<boolean>(false);

  // handles error message state
  const [errMessage, setErrMessage]: [
    string,
    Dispatch<SetStateAction<string>>
  ] = useState<string>(null);

  // helps with refresh
  const router = useRouter();

  /* Function to handle user logout */
  const handleLogOut = async (): Promise<void> => {
    try {
      // use supabase client to logout and destroy the session (default: GLOBAL logout)
      const { error } = await supabase.auth.signOut();
      // if error signing out
      if (error) {
        throw error;
      }
      // refresh the window (let the proxy do the rest)
      router.refresh();
    } catch (err) {
      // set error message
      setErrMessage(err.message);
      //open the error modal
      setOpenLogout(true);
      // log the error to the console
      console.error(err);
    }
  };

  return (
    <>
      <center className="bg-amber-950">
        {/* logout Button */}
        <Button
          onClick={() => {
            setOpenLogout(true);
          }}
          className="bg-white w-50 cursor-pointer text-red-600 hover:scale-102 active:scale-100"
        >
          Log out
        </Button>

        {/* Fetch and display the current user role and email */}
        {user ? (
          <div className="flex gap-0.5 mt-4 pb-1 items-center justify-center">
            <Badge className="bg-[#240d01] mb-2">
              <span className="text-[0.6em] text-white font-light tracking-wider">
                {user?.user_metadata?.user_role}
              </span>
            </Badge>
            <h4 className="text-white font-light opacity-45 text-xs text-center p-2 pt-0">
              {user?.email}
            </h4>
          </div>
        ) : (
          <center className="pb-2 pt-0">
            <Spinner color="gray" />
          </center>
        )}
      </center>

      {/* Modal Popup Component */}
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
