import Link from "next/link";
// import Spline from "@splinetool/react-spline/next";

export default function Home() {
  return (
    // <div className="min-h-screen grid grid-cols-2 p-10 bg-black text-white">
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-[#121212]">
      <div className="bg-black/50 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-lg max-w-lg text-center">
        <h1 className="text-white text-2xl font-bold">Welcome to My Website</h1>
        <p className="text-gray-300 mt-2">A modern and professional glassy UI.</p>
      </div>
    </div>
  );
}