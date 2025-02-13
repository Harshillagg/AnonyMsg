import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>YAY !!!</h1>
  
      <Link href="/sign-up" className="hover:text-blue-500 underline">register kr pehle</Link>
    </div>
  );
}