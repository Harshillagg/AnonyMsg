"use client";

import { User } from "next-auth";
import { useSession, signOut} from "next-auth/react";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Navbar() {
    const {data:session} = useSession()

    const user : User = session?.user as User

  return (
    <div className="p-4 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <Link href="/" className="text-xl font-bold mb-4 md:mb-0">Anony-Msg</Link>
        {
            session ? (
                <>
                    <span className="mr-4">Welcome, {user?.username}</span>
                    <Button onClick={() => signOut()} className="w-full md:w-auto">Logout</Button>
                </>
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
