import type { Metadata } from "next";
import "../globals.css"
import { NavbarPrivada } from "@/components/navbar/navbarPrivado";


export default function RootLayoutPrivate({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavbarPrivada />
      {children}
    </>
    

  );
}
