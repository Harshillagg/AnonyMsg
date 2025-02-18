import dbConnect from "@/lib/dbConnect"
import { getServerSession, User } from "next-auth"
import UserModel from "@/models/User.model"
import { ApiRes } from "@/utils/ApiRes"
import { authOptions } from "../auth/[...nextauth]/options"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export async function GET(){
    await dbConnect()

    const session = await getServerSession(authOptions)
    const user: User = session?.user as User

    if(!session || !user) return ApiRes(false, "Unauthorised Access", 401)

    const userId = new mongoose.Types.ObjectId(user._id)

    try {
        const user = await UserModel.aggregate([
            { $match: { _id: userId } },
            { $unwind: "$messages" },
            { $sort: {"messages.createdAt" : -1} },
            { $group: { _id: "$_id", messages: { $push: "$messages" } } }
        ])

        if(!user) return ApiRes(false, "User not found", 401)

        return NextResponse.json({
            success : true,
            messages : user.length > 0 ? user[0].messages : []
        }, {status: 200})
    }
    catch (error) {
        console.log("error fetching messages : ", error)
        return ApiRes(false, "Error fetching messages", 500)
    }
}