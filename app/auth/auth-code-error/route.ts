"use client";

import { useEffect } from "react";
import { redirect, useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AuthCodeErrorPage() {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash;

    if (hash.includes("error=access_denied")) {
      // Redirect user back to login with error
      router.replace("/login?error=access_denied");
      toast.error("Access denied. Please try logging in again.", {
        style: {
          borderRadius: "10px",
          background: "#242A3D",
          color: "#fff",
        },
      });
    }
  }, [router]);

  redirect("/login"); // or a loader/spinner
}