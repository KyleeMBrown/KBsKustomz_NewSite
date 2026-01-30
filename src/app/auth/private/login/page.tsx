import { LoginForm } from "@/Components/LoginForm";

export default function Page() {

  
  return (
    <div className="flex bg-[url('/images/rusticLoginBG.jpg')] bg-center bg-cover min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full h-full bg-[#5c4033c7] opacity-60  absolute"></div>
      <div className="absolute w-full h-full backdrop-blur-sm"></div>
      <div className="w-full max-w-lg z-99">
        <LoginForm />
      </div>
    </div>
  );
}
