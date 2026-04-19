"use client";
/**
 * @returns Component used to create a new user for the KB's Kustomz Dashboard
 * @used_in /dashboard/users/create -> page.tsx
 * @description Set users name, role, email, and password
 */
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Dispatch, SetStateAction, useState } from "react";
import { cn } from "@/Styling configs/utils";
import DropDownSelect from "./MultiSelect";
import { createNewUser, getUser } from "@/ServerActions/User/user";
import ModalPopup from "./ModalPopup";
import { AuthApiError } from "@supabase/supabase-js";
import Spinner from "./Spinner";
import SuccessfulSubmission from "./SuccessfulSubmission";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

const CreateUser = () => {
  const [firstName, setFirstName]: [string, Dispatch<SetStateAction<string>>] =
    useState<string>("");
  const [lastName, setLastName]: [string, Dispatch<SetStateAction<string>>] =
    useState<string>("");
  const [password, setPassword]: [string, Dispatch<SetStateAction<string>>] =
    useState<string>("");
  const [confirmPass, setConfirmPass]: [
    string,
    Dispatch<SetStateAction<string>>
  ] = useState<string>("");
  const [email, setEmail]: [string, Dispatch<SetStateAction<string>>] =
    useState<string>("");
  const [confirmEmail, setConfirmEmail]: [
    string,
    Dispatch<SetStateAction<string>>
  ] = useState<string>("");

  const [role, setRole]: [string, Dispatch<SetStateAction<string>>] =
    useState<string>("");

  const [open, setOpen]: [boolean, Dispatch<SetStateAction<boolean>>] =
    useState<boolean>(false);
  const [error, setError]: [
    AuthApiError,
    Dispatch<SetStateAction<AuthApiError>>
  ] = useState<AuthApiError>();

  const [loading, setLoading]: [boolean, Dispatch<SetStateAction<boolean>>] =
    useState<boolean>(false);
  const [success, setSuccess]: [boolean, Dispatch<SetStateAction<boolean>>] =
    useState<boolean>(false);
  const [successMessage, setSuccessMessage]: [
    string,
    Dispatch<SetStateAction<string>>
  ] = useState<string>("");

  const [toolOpen, setToolOpen]: [boolean, Dispatch<SetStateAction<boolean>>] =
    useState<boolean>(false);

  const formFilled: boolean =
    (lastName && email && confirmEmail && password && confirmPass && role) !=
    "";
  const emailMatch: boolean =
    email === confirmEmail && email && confirmEmail != "";
  const passMatch: boolean =
    password === confirmPass && password && confirmPass != "";

  const handleCreateUser = async (): Promise<void> => {
    try {
      // set loading true - (triggers the spinner)
      setLoading(true);

      // if the email and password have been successfully confirmed
      if (emailMatch && passMatch) {
        // request the user from api
        const user = await getUser();

        // build the user object
        const userObj = {
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password,
          role: role,
          created_by: user?.email,
        };

        // use the server action to create a user
        const data = await createNewUser(userObj);

        //log the response to the console
        console.log(data.message);

        // set the success message
        setSuccessMessage(data.message);

        // log the success  message
        console.log("User successfully created");

        // trigger success page
        setSuccess(true);
        //set loading to false
        setLoading(false);
      } else {
        // throw password mismatch error
        throw new Error("Email or Password Does not match");
      }
    } catch (err) {
      // set loading to false
      setLoading(false);
      // trigger error modal
      setOpen(true);
      // log the error to the ocnsole
      console.error(err);
      // set the error object
      setError(err);
    }
  };

  return (
    <div className="w-full h-full">
      {!loading ? (
        <div className={cn(success && "hidden")}>
          <center className="pt-6 max-[768px]:pt-4">
            <h1 className="text-white uppercase">Create a User</h1>
          </center>
          <form
            onSubmit={async (e) => {
              e.preventDefault(), handleCreateUser();
            }}
            className="flex flex-col items-center justify-center max-[768px]:p-5"
          >
            {/* First Name Input*/}
            <Label
              htmlFor="firstName"
              className="text-white w-[70%] max-[768px]:w-full mb-2"
            >
              First Name*
            </Label>
            <Input
              id="firstName"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              required
              type="text"
              className="border-white w-[70%] max-[768px]:w-full text-white"
            ></Input>
            <br></br>
            {/* Last Name Input*/}
            <Label
              htmlFor="lastName"
              className="text-white w-[70%] max-[768px]:w-full mb-2"
            >
              Last Name*
            </Label>
            <Input
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              id="lastName"
              required
              type="text"
              className="border-white w-[70%] max-[768px]:w-full text-white"
            ></Input>
            <br></br>
            {/* Role Select Dropdown Input*/}
            <div className="flex gap-2">
            <DropDownSelect
              options={[
                { name: "Admin", value: "ADMIN" },
                { name: "General", value: "GENERAL" },
              ]}
              value={role}
              setValue={setRole}
              className="border-white text-white"
              placeholder="Select a Role"
            />
              
               <Tooltip open={toolOpen} onOpenChange={setToolOpen}>
              <TooltipTrigger className="cursor-help">
                <svg
                  onClick={() => {
                    setToolOpen(true);
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="white"
                  className="ml-3 bi bi-info-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                </svg>
              </TooltipTrigger>
              <TooltipContent className="bg-white text-black">
                  <span className="font-semibold">ADMIN: </span>Full Access<br></br>
                  <span className="font-semibold">GENERAL: </span>Cannot create/manage users 
              </TooltipContent>
            </Tooltip>
            </div>
         
            {/* Email Input*/}
            <Label
              htmlFor="email"
              className="text-white w-[70%] max-[768px]:w-full mb-2"
            >
              Email*
            </Label>
            <Input
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
              type="email"
              className={cn(
                emailMatch && "border-green-400 ",
                " w-[70%] max-[768px]:w-full text-white"
              )}
            ></Input>
            <br></br>
            {/* Confirm Email Input*/}
            <Label
              htmlFor="confirmEmail"
              className="text-white w-[70%] max-[768px]:w-full mb-2"
            >
              Confirm Email*
            </Label>
            <Input
              id="confirmEmail"
              value={confirmEmail}
              onChange={(e) => {
                setConfirmEmail(e.target.value);
              }}
              required
              type="email"
              className={cn(
                emailMatch && "border-green-400 ",
                "w-[70%] max-[768px]:w-full text-white"
              )}
            ></Input>
            <br></br>
            {/* Password Input */}
            <Label
              htmlFor="pass"
              className="text-white w-[70%] max-[768px]:w-full mb-2"
            >
              Password*
            </Label>
            <Input
              id="pass"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              className={cn(
                passMatch && "border-green-400 ",
                "w-[70%] max-[768px]:w-full text-white"
              )}
            ></Input>
            <br></br>
            {/* Confirm password Input*/}
            <Label
              htmlFor="confirmPass"
              className="text-white w-[70%] max-[768px]:w-full mb-2"
            >
              Confirm Password*
            </Label>
            <Input
              id="confirmPass"
              value={confirmPass}
              onChange={(e) => {
                setConfirmPass(e.target.value);
              }}
              required
              type="password"
              className={cn(
                passMatch && "border-green-400 ",
                "w-[70%] max-[768px]:w-full text-white"
              )}
            ></Input>
            <br></br>
            {/* Create User Button (Submit) */}
            <Button
              type="submit"
              disabled={!formFilled}
              className="bg-white max-[768px]:w-full w-[70%] hover:bg-amber-950 hover:text-white cursor-pointer hover:border-white border border-transparent"
            >
              Create User
            </Button>
            
          </form>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full w-full">
          <Spinner color="white" className="w-10" />
        </div>
      )}
      {success ? (
        <SuccessfulSubmission
          message={successMessage || "User has been successfully created!"}
          successURL="/dashboard/users/create"
        />
      ) : null}
      <ModalPopup
        open={open}
        setOpen={setOpen}
        title={<span className="text-red-500">ERROR</span>}
        customClose={
          <Button
            className="cursor-pointer text-white  hover:bg-white hover:text-gray-400"
            variant="outline"
          >
            Close
          </Button>
        }
        description={
          <span className="text-left">
            <br></br>
            {error?.message} . . . please try again
            <br></br>
            {error?.code && error?.status && (
              <span className="text-xs text-gray-500 text-left">
                <br></br>Supabase Code [{error?.code}]<br></br>Status Code [
                {error?.status}]
              </span>
            )}
          </span>
        }
        className="z-999 bg-[#00000078] text-white backdrop-blur-lg border-none"
      />
    </div>
  );
};

export default CreateUser;
