import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import { Message } from "@/models/User.model";
import { ApiRes } from "@/utils/ApiRes";
import { NextRequest } from "next/server";

export async function POST(request : NextRequest){
    await dbConnect()

    const {username, content} = await request.json()

    try {
        const user = await UserModel.findOne({username})
        if(!user) return ApiRes(false, "User not found", 400)
        
        if(!user.isAcceptingMessages) return ApiRes(false, "User is not accepting messages", 400)
        
        const newMessage = {content, createdAt: new Date()}
        user.messages.push(newMessage as Message)

        await user.save()

        return ApiRes(true, "Message sent successfully", 200)
    }
    catch (error) {
        console.log("Unable to send message", error)
        return ApiRes(false, "Unable to send message", 500)   
    }
}