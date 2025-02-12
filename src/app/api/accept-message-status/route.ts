import dbConnect from "@/lib/dbConnect"
import { getServerSession, User } from "next-auth"
import UserModel from "@/models/User.model"
import { ApiRes } from "@/utils/ApiRes"
import { authOptions } from "../auth/[...nextauth]/options"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request : NextRequest){
    await dbConnect()

    const session = await getServerSession(authOptions)
    const user: User = session?.user as User

    if(!session || !user) return ApiRes(false, "Unauthorised Access", 401)

    // console.log("session", session)

    // IMP :- this _id is string bcoz we saved it like this in auth options ... so it will work in findbyidandupdate or findone but not while using pipelines
    const userId = user._id

    const {messageFlag} = await request.json()

    try{
        const updatedUser = await UserModel.findByIdAndUpdate(userId, {acceptingMessages: messageFlag}, {new: true})

        if(!updatedUser) return ApiRes(false, "Failed to update status", 401)

        return ApiRes(true, "Accpeting Message Status updated successfully", 200)
    }
    catch(error){
        console.log("error updating accepting status", error)
        return ApiRes(false, "Error updating accepting status", 500)
    }

}

export async function GET(){
    await dbConnect()

    const session = await getServerSession(authOptions)
    const user: User = session?.user as User

    if(!session || !user) return ApiRes(false, "Unauthorised Access", 401)

    const userId = user._id

    try {
        const newUser = await UserModel.findById(userId)

        if(!newUser) return ApiRes(false, "User not found", 404)
        
        return NextResponse.json({
            status : "true",
            isAcceptingMessages : newUser.isAcceptingMessage
        },{status : 200, })
    }
    catch (error) {
        console.log("error getting accepting status", error)
        return ApiRes(false, "Error getting accepting status", 500)
    }
}