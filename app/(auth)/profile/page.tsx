import { fetchProfile } from "@/lib/profileActions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Suspense } from "react";
import { signOut } from "./action";
import Loading from "./loading";

export default async function Profile() {
  const user = await fetchProfile();

  return (
    <Suspense fallback={<Loading />}>
      <form className="justify-self-center">
        <div className="rounded p-4 m-3">
          <Avatar className="w-44 h-44">
            <AvatarImage
              alt="U"
              src={user?.user_metadata?.avatar_url}
              loading="eager"
            />
            <AvatarFallback>
              {user?.user_metadata?.full_name?.charAt(0) ||
                user?.email?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="pt-4 text-center font-bold text-lg">
            <span>{user?.user_metadata.full_name || "User"}</span>
          </div>
          <div className="pt-2 text-center text-[10px]">
            <span>{user?.email}</span>
          </div>
          <div className="mt-6 p-3 px-5 text-center bg-appbar-blue rounded-full">
            <button formAction={signOut} className="font-semibold text-xs">
              Logout
            </button>
          </div>
        </div>
      </form>
    </Suspense>
  );
}
