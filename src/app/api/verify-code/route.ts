import dbConnect from "@/lib/dbConnect";
import {z} from "zod";
import UserModel from "@/models/User.model";
import { ApiRes } from "@/utils/ApiRes";
import { verifySchema } from "@/schemas/verifySchema";
import { NextRequest } from "next/server";

const queryCodeSchema = z.object({
    code: verifySchema
})

export async function POST(request : NextRequest){
    await dbConnect()

    try {
        const {username, code} = await request.json()
        
        // const decodedUsername = decodeURIComponent(username) // to decode params from url if encoded automatically

        const result = queryCodeSchema.safeParse({code})

        if(!result.success) return ApiRes(false, "Invalid code", 400)

        const user = await UserModel.findOne({username})

        if(!user) return ApiRes(false, "User not found", 404)

        if(user.verifyCode !== code) return ApiRes(false, "Invalid code", 400)
        
        if(user.verifyCodeExpiry < new Date()) return ApiRes(false, "Code expired, please try again", 400)

        user.isVerified = true
        await user.save()

        return ApiRes(true, "User verified successfully", 201)
    }
    catch (error) {
        console.log("error verifying user : ", error)
        return ApiRes(false, "Error verifying user", 500)
    }
}