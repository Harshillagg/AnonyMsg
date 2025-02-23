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
    <div className="shadow-md fixed top-0 left-0 w-full backdrop-blur-lg bg-opacity-50 z-50 p-4 text-white">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <Link href="/" className="text-xl font-bold mb-4 md:mb-0">Anony-Msg</Link>
        {
            session ? (

              pathname === "/dashboard" ? (
                <>
                   <span className="mr-4">Welcome, {user?.username}</span>
                    <Button onClick={() => signOut()} className="w-full md:w-auto">Logout</Button>
                </> 
              ) : (
                <Link href="/dashboard">
                  <Button className="w-full md:w-auto">
                    Dashboard
                  </Button>
                </Link>
              )
            ) : (
                <Link href="/sign-in">
                    <Button className="w-full md:w-auto">Login</Button>
                </Link>
            )
        }
      </div>
    </div>
  );
}
