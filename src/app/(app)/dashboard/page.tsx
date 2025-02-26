"use client";

import MessageCard from "@/components/MessageCard";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Message } from "@/models/User.model";
import { acceptMessageSchema } from "@/schemas/acceptMessageSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Loader2, RefreshCcw } from "lucide-react";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Dashboard(){
  const {toast} = useToast()
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isSwitchLoading, setIsSwitchLoading] = useState(false)

  // optimistic update
  const handleDeleteMessage = (messageId:string) => {
    setMessages(messages.filter((message) => message._id !== messageId))
  }

  const {data : session} = useSession()

  const form = useForm({
    resolver: zodResolver(acceptMessageSchema),
  });

  const {register, setValue, watch} = form

  const acceptMessages = watch('acceptMessages')

  const getAcceptMessage = useCallback(async () => {
    setIsSwitchLoading(true)

    try{
      const response = await axios.get<ApiResponse>('/api/accept-message')
      setValue('acceptMessages', response.data.isAcceptingMessages)
    }
    catch(error){
      const axiosError = error as AxiosError<ApiResponse>
      toast({
        title: "Error",
        description: axiosError.response?.data.message || "failed to fetch message status",
        variant: "destructive",
      })
    }
    finally{
      setIsSwitchLoading(false)
    }
  }, [setValue, toast])

  const getAllMessages = useCallback(async (refresh: boolean = false) => {
    setIsLoading(true)
    setIsSwitchLoading(false)

    try {
      const response = await axios.get("/api/get-messages")
      setMessages(response.data.messages || [])

      if(refresh) toast({
        title: "refreshed Messages",
        description: "Showing Latest Messages",
        className: "bg-green-500",
      })
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast({
        title: "Error",
        description: axiosError.response?.data.message || "failed to fetch messages",
        variant: "destructive",
      })
    }
    finally{
      setIsLoading(false)
    }
  }, [setMessages, setIsLoading, toast])

  useEffect(() => {
    if(!session || !session.user) return
    
    getAcceptMessage()
    getAllMessages(true)
  }, [getAcceptMessage, getAllMessages, session, setValue])

  const handleSwitchChange = async () => {
    try {
      const response = await axios.post<ApiResponse>('/api/accept-message-status', {messageFlag: !acceptMessages})
      setValue('acceptMessages', !acceptMessages)
      toast({
        title: "Success",
        description: response.data.message,
        className: "bg-green-500",
      })
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast({
        title: "Error",
        description: axiosError.response?.data.message || "failed to update message status",
        variant: "destructive",
      })
    }
  }

  if(!session || !session.user) return <div>Login Please</div>

  const {username} = session?.user as User
  const baseUrl = `${window.location.origin}`
  const profileUrl = `${baseUrl}/u/${username}`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl)
    toast({
      title: "Copied to clipboard",
      className: "bg-green-500",
    })
  }

  return (
    <div className="p-6 md:p-10 bg-white rounded w-full max-w-6xl md:pt-24 pt-40 mx-auto">
      <h1 className="md:text-4xl text-2xl font-bold mb-4">
        User Dashboard
      </h1>

      <div className="mb-4">
        <h2 className="text-lg font-semibold">Copy Your Unique Link</h2>
        <div className="flex items-center">
          <input type="text" value={profileUrl} disabled className="input input-bordered w-full p-2 mr-2"/>
          <Button onClick={copyToClipboard}>Copy</Button>
        </div>
      </div>

      <div className="mb-4">
        <Switch
          {...register('acceptMessages')}
          checked={acceptMessages}
          onCheckedChange={handleSwitchChange}
          disabled={isSwitchLoading}
        />

        <span className="ml-2">
          Accept Messages: {acceptMessages ? "ON" : "OFF"}
        </span>
      </div>

      <Button className="mt-4"
        variant={"outline"}
        onClick={(e) => {
          e.preventDefault()
          getAllMessages(true)
        }}>
          {
            isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin"/>
            ) : (
              <RefreshCcw className="h-4 w-4"/>
            )
          }
        </Button>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        {messages.length > 0 ? (
          messages.map((message) => (
            <MessageCard key={message._id as string} message={message} onDeleteMessage={handleDeleteMessage} />
          ))
        ) : (
          <p>No messages to display.</p>
        )}
      </div>  
    </div>
  )
}