import React from "react";
import Image from "next/image";
// import { handleGoogleSignIn } from "./action";
// import { createClient } from "@/utils/supabase/server";
// import { redirect } from "next/navigation";

export default function Login() {
//   const supabase = await createClient();
//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   if (user) {
//     redirect("/"); // ✅ avoid landing on login again
//   }
  return (
    <form className="min-h-screen flex flex-col justify-center items-center">
      <div className="justify-center items-center flex w-auto h-auto">
        <Image
          src="/spendlux-title.webp"
          alt="logo"
          width={300}
          height={300}
          priority
        />
      </div>
      <button
        // formAction={handleGoogleSignIn}
        className="justify-center items-center flex rounded-full bg-white text-black p-4 px-6 hover:bg-gray-100 transition-colors cursor-pointer"
      >
        <Image
          src="/google_logo.svg"
          alt="login"
          width={20}
          height={20}
          priority
        />
        <div className="font-poppins font-light text-lg pl-1.5 pr-4">
          Sign in with Google
        </div>
      </button>
    </form>
  );
}
