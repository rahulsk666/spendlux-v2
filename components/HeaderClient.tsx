"use client";
import { linkItems } from "@/constants/navLinks";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User } from "@supabase/supabase-js";

type HeaderPageTypes = {
  user: User | null;
};

export default function HeaderClient({ user }: HeaderPageTypes) {
  const pathName = usePathname();
  const [pageName, setPageName] = useState({
    title: "",
  });

  useEffect(() => {
    linkItems.map((items) => {
      if (items.href == pathName) {
        setPageName({
          title: items.title,
        });
      } else if ("/profile" == pathName) {
        setPageName({
          title: "Profile",
        });
      }
    });
  }, [pathName]);
  return (
    <>
      <div className="col-span-2 text-left text-xs p-5">
        <p className="font-montserrat tracking-wider">
          Welcome!
          <span className="font-bold text-base pl-1">
            {user?.user_metadata?.name || "User"}
          </span>
        </p>
        <p>
          your
          <span className="font-bold text-lg pl-2">{pageName.title}</span>
        </p>
      </div>
      <a href="/profile" className="flex justify-end p-4">
        <Avatar className="w-12 h-12">
          <AvatarImage
            alt="U"
            src={user?.user_metadata?.avatar_url || undefined}
            loading="eager"
          />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </a>
    </>
  );
}
