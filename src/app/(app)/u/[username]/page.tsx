"use client";

import { useToast } from "@/hooks/use-toast";
import { messageSchema } from "@/schemas/messageSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useCompletion } from "@ai-sdk/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

export default function PublicPage() {
  const [questions, setQuestions] = useState<string[]>([
    "What's a skill you'd love to learn and why?",
    "If you could travel anywhere in the world tomorrow, where would you go and why?",
    "What's a small act of kindness you've witnessed recently that made you smile?",
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const param = useParams<{ username: string }>();

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: "",
    },
  });

  const { setValue } = form;

  // sending message to api
  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    setIsSubmitting(true);

    try {
      const response = await axios.post<ApiResponse>("/api/send-message", {
        username: param.username,
        content: data.content,
      });

      if (response.data.success) {
        toast({
          title: "Message Sent successfully",
          description: response.data.message,
          className: "bg-green-500",
        });
      } else {
        toast({
          title: "Error",
          description: response.data.message || "Something went wrong.",
          variant: "destructive",
        });
        return;
      }
    } catch (error) {
      console.error("An unexpected error occurred : ", error);
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "failed to send message",
        description: axiosError.response?.data.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const { complete, completion, isLoading } = useCompletion({
    api: "/api/suggest-messages",
  });

  const handleSuggestMessage = async () => {
    try{
      await complete("")
    }
    catch(error){
      console.error("Error suggesting messages:", error);
      toast({
        title: "Error",
        description: "Failed to generate message suggestions",
        variant: "destructive",
      });
    }
  }
 
  useEffect(() => {
    if (completion) {
      setQuestions(completion.split("||").map((q) => q.trim()));
    }
  }, [completion]);

  const handleSelectMessage = (question: string) => {
    setValue("content", question);
  };

  return (
    <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 bg-white rounded w-full max-w-6xl pt-20">
      <h1 className="text-4xl font-bold mb-4">Post Your Message</h1>

      <p></p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            name="content"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Send Anonymous Message to {param.username}
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write your message here"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="text-center">
            <Button type="submit" disabled={isSubmitting} className="">
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please Wait
                </div>
              ) : (
                "Send Message"
              )}
            </Button>
          </div>
        </form>
      </Form>

      <div className="my-6">
        <Button
          onClick={handleSuggestMessage}
          className="w-full md:w-auto"
          disabled={isLoading}
        >
          {isLoading ? "Generating..." : "Suggest Message 🤔"}
        </Button>

        <p>click on any message below to select it</p>

        <div className="border border-gray-400 p-4">
          <h2>Messages :</h2>
          <div>
            {questions.map((question, index) => (
              <div
                className="border p-2 mb-2 hover:bg-gray-200 text-center text-wrap"
                key={index}
                onClick={() => handleSelectMessage(question)}
              >
                {question}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
