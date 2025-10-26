import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transactions - Spendlux",
  description: "View your transactions",
};

export default function pageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section about="transactions">{children}</section>;
}
