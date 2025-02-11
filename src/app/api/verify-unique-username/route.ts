import dbConnect from "@/lib/dbConnect";
import {z} from "zod";
import UserModel from "@/models/User.model";
import { ApiRes } from "@/utils/ApiRes";
import { usernameValidation } from "@/schemas/signUpSchema";

const queryUsernameSchema = z.object({
    username: usernameValidation
})

export async function GET(request : Request) {
    await dbConnect();

    try {
        const {searchParams} = new URL(request.url)

        const queryParams = {
            username : searchParams.get("username")
        }

        const result = queryUsernameSchema.safeParse(queryParams)

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