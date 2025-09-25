// import AppBar from "@/components/appbar";
import Header from "@/components/Header";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main>{children}</main>
      {/* <AppBar /> */}
    </>
  );
}
