import dbConnect from "@/lib/dbConnect";
import { getServerSession, User } from "next-auth";
import { NextRequest } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import { ApiRes } from "@/utils/ApiRes";
import UserModel from "@/models/User.model";

export async function DELETE(request : NextRequest){
    await dbConnect()

    const searchParams = request.nextUrl.searchParams
    const messageId = searchParams.get('messageId')
    
    const session = await getServerSession(authOptions)
    const user: User = session?.user as User

    if(!session || !user) return ApiRes(false, "Unauthorised Access", 401)

    try {
        const updateResult = await UserModel.updateOne(
            {_id : user._id}, // match id of user
            {$pull : {messages: {_id: messageId}}} // update the single item in array
        )

        if(updateResult.modifiedCount == 0) return ApiRes(false, "Message not found", 404)

        return ApiRes(true, "Message deleted successfully", 200)
    }
    catch (error) {
        console.error("Error deleting message", error)
        return ApiRes(false, "Error deleting message", 500)
    }
}