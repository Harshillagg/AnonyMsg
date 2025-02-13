"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/schemas/signUpSchema";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

export default function SignIn() {
  const [username, setUsername] = useState<string>("");
  const [usernameStatus, setUsernameStatus] = useState<string>("");
  const [isCheckingUsername, setIsCheckingUsername] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const debounced = useDebounceCallback(setUsername, 500);
  const { toast } = useToast();
  const router = useRouter();

  // zod implementation
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const checkUniqueUsername = async () => {
      if (username) {
        setIsCheckingUsername(true);
        setUsernameStatus("...");
        try {
          const result = await axios.get(
            `/api/verify-unique-username?username=${username}`
          );
          setUsernameStatus(result.data.message);
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          setUsernameStatus(
            axiosError.response?.data.message ?? "An error occurred"
          );
        } finally {
          setIsCheckingUsername(false);
        }
      }
    };

    checkUniqueUsername();
  }, [username]);

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true);
    try {
      const result = await axios.post("/api/sign-up", data);

      if (result.data.success) {
        toast({
          title: "Success",
          description: result.data.message,
        });
        router.replace(`/verify/${username}`);
      } else {
        toast({
          title: "Error",
          description: result.data.message || "Something went wrong.",
          variant: "destructive",
        });
        return;
      }
    } catch (error) {
      console.error("An unexpected error occurred : ", error);
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Sign-up Failed",
        description: axiosError.response?.data.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join <br/>
            Anony-Msg
          </h1>
          <p className="mb-4"> Sign up for an anonymous adventure </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="username"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e)
                        debounced(e.target.value)
                      }}
                    />
                  </FormControl>
                  {isCheckingUsername && <Loader2 className="animate-spin" />}
                  <p className= {`text-sm ${usernameStatus === "Usenrame is available" ? "text-green-500" : "text-red-500"}`} >test {usernameStatus}</p>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled = {isSubmitting}>
              {
                isSubmitting ? (
                  <div>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please Wait
                  </div>
                ) : "Sign Up"
              }
            </Button>
          </form>
          <div className="text-center mt-4">
              <p>
                Already have an account?{" "}
                <Link href="/sign-in" className="text-blue-500 hover:text-blue-800">
                  Sign In
                </Link>
              </p>
          </div>
        </Form>
      </div>
    </div>
  );
}
