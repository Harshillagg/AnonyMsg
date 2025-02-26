import { Button } from "@/components/ui/button"
import {
  MessageSquare,
  Shield,
  Sparkles,
  ArrowRight,
  UserCircle2,
  Lock,
  ChevronRight,
} from "lucide-react"
import Link from "next/link";
import Image from "next/image"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-300 flex flex-col items-center md:px-20 px-8">
      <main className="flex-1">
        {/* Hero div */}
        <div className="w-full pt-32 md:pt-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4 md:items-start items-center text-center md:text-start">
                <div className="space-y-2 ">
                  <h1 className="text-3xl  font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
                    Share Your Thoughts, Anonymously & Safely
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl">
                    Express yourself freely with AI-powered anonymous messaging. Connect with registered users while
                    maintaining your privacy.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/sign-up">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="relative">

              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl blur-3xl" />
              <Image
                src="/hero.png"
                width={300}
                height={300}
                alt="Hero"
                className="relative mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:aspect-square"
              />
              </div>

            </div>
          </div>
        </div>

        {/* Features div */}
        <div className="w-full pt-12 md:pt-24 lg:pt-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Powerful Features</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Everything you need to communicate freely and securely
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              <div className="relative overflow-hidden rounded-lg border bg-background p-2 hover:bg-gray-100 hover:scale-105 transition duration-150">
                <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                  <Shield className="h-12 w-12 text-primary" />
                  <div className="space-y-2">
                    <h3 className="font-bold">Complete Anonymity</h3>
                    <p className="text-sm text-muted-foreground">
                      Send messages without revealing your identity. Your privacy is our priority.
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-lg border bg-background p-2 hover:bg-gray-100 hover:scale-105 transition duration-150">
                <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                  <Sparkles className="h-12 w-12 text-primary" />
                  <div className="space-y-2">
                    <h3 className="font-bold">AI-Powered Suggestions</h3>
                    <p className="text-sm text-muted-foreground">
                      Get creative message suggestions powered by advanced AI technology.
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-lg border bg-background p-2 hover:bg-gray-100 hover:scale-105 transition duration-150">
                <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                  <UserCircle2 className="h-12 w-12 text-primary" />
                  <div className="space-y-2">
                    <h3 className="font-bold">Personal Dashboard</h3>
                    <p className="text-sm text-muted-foreground">
                      Track and manage all your received messages in one secure place.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How it Works div */}
        <div className="w-full pt-12 md:pt-24 lg:pt-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">How It Works</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Start sending anonymous messages in three simple steps
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground hover:scale-110">
                  <UserCircle2 className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">1. Create Account</h3>
                <p className="text-center text-gray-500">Sign up to receive your unique profile link</p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground hover:scale-110">
                  <MessageSquare className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">2. Share Your Link</h3>
                <p className="text-center text-gray-500">Share your profile with friends or on social media</p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground hover:scale-110">
                  <Lock className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">3. Receive Messages</h3>
                <p className="text-center text-gray-500">Get anonymous messages in your private dashboard</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA div */}
        <div className="w-full py-12 md:py-24 lg:py-32 ">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Get Started?</h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of users already sharing anonymous messages
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <Link href="/sign-up">
                  <Button>
                    Sign Up
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500">© {new Date().getFullYear()} AnonyMsg. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}