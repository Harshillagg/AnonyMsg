import dbConnect from "@/lib/dbConnect";
import User from "@/models/User.model";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/lib/resend";
import { ApiRes } from "@/utils/ApiRes";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    await dbConnect() // Connect to database in every request

    try {
        const { username, email, password } = await request.json()
        
        // Check if username already exists
        const existingUserByUsername = await User.findOne({
            username
        })

        const lowerEmail = email.toLowerCase()
        
        // if username already exists
        if(existingUserByUsername){
            // if user is already verified
            if(existingUserByUsername.isVerified){
                return ApiRes(false, "Username already taken", 400)
            }
            
            // if not verified but 
            if(existingUserByUsername.verifyCodeExpiry > new Date()){
                return ApiRes(false, "Username is reserved but not verified. Please wait until it expires.", 400);
            }
        
            // If the verification code has expired, allow the new registration
            await existingUserByUsername.deleteOne();
        }

        // Check if email already exists
        const existingUserByEmail = await User.findOne({
            email : lowerEmail
        })
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString()
        
        if(existingUserByEmail){
            // if user is already verified
            if(existingUserByEmail.isVerified){
                return ApiRes(false, "Email already taken", 400)
            }
            // if not verified but registered
            else{
                existingUserByEmail.username = username
                const hashedPassword = await bcrypt.hash(password, 10)
                existingUserByEmail.password = hashedPassword
                existingUserByEmail.verifyCode = verifyCode
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000)
                await existingUserByEmail.save()
            }
        }
        else{
            // if not registered
            const hashedPassword = await bcrypt.hash(password, 10)
            const expiryDate = new Date()
            expiryDate.setHours(expiryDate.getHours() + 1)

            const newUser = new User({
                username,
                email : lowerEmail,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                isAcceptingMessages: true,
                messages : []
            })

            await newUser.save()
        }

        // send verification email now
        const emailResponse = await sendVerificationEmail(
            lowerEmail,
            username,
            verifyCode
        )

        if(!emailResponse.success){
            return ApiRes(false, emailResponse.message, 500)
        }

        return ApiRes(true, "User registered successfully, Please verify your email", 201)

    }
    catch (error) {
        console.error("Error Registering user : ", error)   
        return ApiRes(false, "Error Registering User", 500)
    }
} 