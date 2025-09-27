import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Profile - Spendlux",
  description: "View your profile",
};

export default function pageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section about="profile">{children}</section>;
}
