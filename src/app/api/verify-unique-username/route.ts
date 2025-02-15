import dbConnect from "@/lib/dbConnect";
import {z} from "zod";
import UserModel from "@/models/User.model";
import { ApiRes } from "@/utils/ApiRes";
import { usernameValidation } from "@/schemas/signUpSchema";
import { NextRequest } from "next/server";

const queryUsernameSchema = z.object({
    username: usernameValidation
})

export async function GET(request : NextRequest) {
    await dbConnect();

    try {
        const searchParams = request.nextUrl.searchParams 
        // const decodedUsername = decodeURIComponent(username) // to decode params from url if encoded automatically

        const queryParams = {
            username: searchParams.get('username')
        }

        const result = queryUsernameSchema.safeParse(queryParams)

        if(!result.success){
            const errorMessage = result.error.format().username?._errors || []
            return ApiRes(false, 
                        errorMessage?.length > 0 ? errorMessage.join(', ') : "Invalid username",
                        400)
        }

        const {username} = result.data

        const user = await UserModel.findOne({username})

        if(user){
            if(user.isVerified || user.verifyCodeExpiry > new Date()){
                return ApiRes(false, "Username already taken", 400)
            }
        
            // If the verification code has expired, allow the new registration
            await user.deleteOne();
        }

        return ApiRes(true, "Username is available", 201)
    }
    catch (error) {
        console.log("error checking username : ", error)
        return ApiRes(false, "Error checking username", 500)
    }
}