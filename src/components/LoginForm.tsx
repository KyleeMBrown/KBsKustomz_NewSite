"use client";

/**
 * @returns User login form 
 * @used_in /auth/private/login -> page.tsx
 * @description a form that allows users to login with password or with google
 * CLIENT COMPONENT
 */

import { cn } from "@/Styling configs/utils";
import { Button } from "@/Components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/Components/ui/field";
import { Input } from "@/Components/ui/input";
import { createClient } from "@/Lib/supabase/client";
import { Dispatch, SetStateAction, useState } from "react";
import Spinner from "./Spinner";
import { useRouter } from "next/navigation";
import ModalPopup from "./ModalPopup";
import { AuthApiError } from "@supabase/supabase-js";



export function LoginForm ({
  className,
  ...props
}: React.ComponentProps<"div">) {
  // create the supabase browser client
  const supabase = createClient();
  // router to handle refresh
  const router = useRouter();

  const [email, setEmail]: [string, Dispatch<SetStateAction<string>>] =
    useState<string>("");
  const [pass, setPass]: [string, Dispatch<SetStateAction<string>>] =
    useState<string>("");
  const [hidden, setHidden]: [boolean, Dispatch<SetStateAction<boolean>>] =
    useState<boolean>(true);
  const [loading, setLoading]: [boolean, Dispatch<SetStateAction<boolean>>] =
    useState<boolean>(false);
  const [open, setOpen]: [boolean, Dispatch<SetStateAction<boolean>>] =
    useState<boolean>(false);
  const [err, setErr]: [AuthApiError, Dispatch<SetStateAction<AuthApiError>>] =
    useState<AuthApiError>();

  /* Function to login with password */
  const login = async (): Promise<void> => {
    try {
      // set loading true
      setLoading(true);
      // request a signin from the supabase browser client
      let { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: pass,
      });

      // hadnle error
      if (error) {
        throw error;
      }

      // redirect the user after successful login
      router.replace("/dashboard");
      // stop loading state
      setLoading(false);

    } catch (err) {
      // set the error object
      setErr(err);
      // stop laoding state
      setLoading(false);
      // open modal to display error
      setOpen(true);
      // log error for dev
      console.error(err)
    }
  };


  /* Function to login with google */
  const loginWithGoogle = async (): Promise<void> => {
    try {
      setLoading(true);

      /*TODO:  check the user is already in the users table
       *       Then signin with google if email has been found
       */


      // request to signin with google using supabase browser client
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          // redirect to callback func
          redirectTo: `http://localhost:3000/api/auth/callback?next=/dashboard`,
        },
      });

      // stop laod state
      setLoading(false);
    } catch (err) {
      // set error object
      setErr(err);
      // set load state false
      setLoading(false);
      // open modal to display error
      setOpen(true);
      // log error for dev
      console.error(err)
    }
  };

  return (
    <>
      <div className={cn("flex flex-col gap-6 ", className)} {...props}>
        <Card className="bg-[#5c4033f0] border-0 text-white">
          <CardHeader>
            <CardTitle className="uppercase pb-1 text-center text-lg">
              Welcome
            </CardTitle>
            <CardTitle className="uppercase pb-2 text-center text-lg">
              KB's Kustomz Private Dashboard
            </CardTitle>
            <hr className="pt-2 pb-2"></hr>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription className="text-white">
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault(), login(), setPass(""), setEmail("");
              }}
            >
              <FieldGroup>
                {/* Email Input */}
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    className=" placeholder:opacity-40 b placeholder:text-white"
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Field>
                 {/* Password Input */}
                <Field>
                  <div className="flex items-center">
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                     {/* Forgot Password Link */}
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <div className="w-full flex items-center justify-end">
                    <Input
                      className="focus-within:shadow-none"
                      value={pass}
                      onChange={(e) => setPass(e.target.value)}
                      id="password"
                      type={hidden ? "password" : "text"}
                      required
                    />
                     {/* Hide/Reveal Password eye button */}
                    {hidden ? (
                      <svg
                        onClick={() => setHidden(false)}
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="black"
                        className={cn(
                          !hidden && "hidden",
                          "x bi bi-eye absolute mr-2 cursor-pointer hover:scale-106 active:scale-100"
                        )}
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                      </svg>
                    ) : (
                      <svg
                        onClick={() => setHidden(true)}
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="black"
                        className={cn(
                          hidden && "hidden",
                          "bi bi-eye-fill absolute mr-2 cursor-pointer hover:scale-106 active:scale-100"
                        )}
                        viewBox="0 0 16 16"
                      >
                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                      </svg>
                    )}
                  </div>
                </Field>
                <Field>
                  {/* Login Button */}
                  <Button
                    className="bg-amber-950 cursor-pointer hover:bg-white hover:text-amber-950"
                    type="submit"
                  >
                    {!loading ? "Login" : <Spinner className="w-5" />}
                  </Button>
                   {/* Login with Google Button */}
                  <Button
                    onClick={loginWithGoogle}
                    className="text-amber-950  bg-white cursor-pointer flex items-center justify-center gap-4 hover:bg-amber-950 hover:text-white"
                    variant="outline"
                    type="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-google"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z" />
                    </svg>
                    Login with Google
                  </Button>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
       {/* Pop up Modal */}
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
          <div className="text-left">
            <br></br>
            {err?.message} . . . please try again
            <br></br>
            <div className="text-xs text-gray-500 text-left">
              <br></br>Supabase Code [{err?.code}]<br></br>Status Code [
              {err?.status}]
            </div>
          </div>
        }
        className="z-999 bg-[#00000078] text-white backdrop-blur-lg border-none"
      />
    </>
  );
}
