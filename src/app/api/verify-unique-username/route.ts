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

        const queryParams = {
            username: searchParams.get('username')
        }

        const result = queryUsernameSchema.safeParse(queryParams)

        console.log("queryParams : ", queryParams)
        console.log("result : ", result)

        if(!result.success){
            const errorMessage = result.error.format().username?._errors || []
            return ApiRes(false, 
                        errorMessage?.length > 0 ? errorMessage.join(', ') : "Invalid username",
                        400)
        }

        const {username} = result.data

        const user = await UserModel.findOne({username, isVerified : true})

        if(!user) return ApiRes(true, "Username is available", 201)

        return ApiRes(false, "Username is already taken", 400)
    }
    catch (error) {
        console.log("error checking username : ", error)
        return ApiRes(false, "Error checking username", 500)
    }
}