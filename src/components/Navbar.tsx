"use client";

import { User } from "next-auth";
import { useSession, signOut} from "next-auth/react";
import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const {data:session} = useSession()
    const pathname = usePathname()

    const user : User = session?.user as User

  return (
    <div className="shadow-md fixed top-0 left-0 w-full b z-50 p-4 backdrop-blur-lg px-40">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <Link href="/" className="text-2xl font-extrabold mb-4 md:mb-0">Anony-Msg</Link>
        {
            session ? (

              pathname === "/dashboard" ? (
                <>
                   <span className="mr-4 font-semibold text-xl">Welcome, {user?.username}</span>
                    <Button onClick={() => signOut()} className="w-full md:w-auto hover:scale-110 transition duration-200 text-md">Logout</Button>
                </> 
              ) : (
                <Link href="/dashboard">
                  <Button className="w-full md:w-auto hover:scale-110 transition duration-200 text-md">
                    Dashboard
                  </Button>
                </Link>
              )
            ) : (
              <div className="flex justify-center items-center gap-2">
                <Link href="/sign-in">
                    <Button className="w-full md:w-auto hover:scale-110 transition duration-200 text-md">Login</Button>
                </Link>
                <Link href="/sign-up">
                  <Button variant={"outline"} className="text-md">Get Started</Button>
                </Link>
              </div>
            )
        }
      </div>
    </div>
  );
}
