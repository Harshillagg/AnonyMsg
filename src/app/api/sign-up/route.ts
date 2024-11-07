import dbConnect from "@/lib/dbConnect";
import User from "@/models/User.model";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/lib/resend";

export async function POST(request: Request) {
    await dbConnect() // Connect to database in every request

    try {
        const { username, email, password } = await request.json()
        
        // Check if username already exists
        const existingUserVerifiedByUsername = await User.findOne({
            username,
            isVerified: true
        })

        if(existingUserVerifiedByUsername){
            return Response.json({
                success: false,
                mesage: "Username already exists"
            }, {status: 400})
        }

        // Check if email already exists
        const existingUserVerifiedByEmail = await User.findOne({
            email,
            isVerified: true
        })
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString()
        
        if(existingUserVerifiedByEmail){
            // if user is already verified
            if(existingUserVerifiedByEmail.isVerified){
                return Response.json({ 
                    success: false, 
                    message: "USer already exist with this email" 
                },{status: 400})
            }
            // if not verified but registered
            else{
                const hashedPassword = await bcrypt.hash(password, 10)
                existingUserVerifiedByEmail.password = hashedPassword
                existingUserVerifiedByEmail.verifyCode = verifyCode
                existingUserVerifiedByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000)
                await existingUserVerifiedByEmail.save()
            }
        }
        else{
            // if not registered
            const hashedPassword = await bcrypt.hash(password, 10)
            const expiryDate = new Date()
            expiryDate.setHours(expiryDate.getHours() + 1)

            const newUser = new User({
                username,
                email,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                isAcceptingMessage: true,
                messages : []
            })

            await newUser.save()
        }

        // send verification email now
        const emailResponse = await sendVerificationEmail(
            email,
            username,
            verifyCode
        )

        if(!emailResponse.success){
            return Response.json({ 
                success: false, 
                message: emailResponse.message 
            },{status: 500})
        }

        return Response.json({ 
            success: true, 
            message: "User registered successfully. Please verify your email." 
        },{status: 201})

    }
    catch (error) {
        console.error("Error Registering user : ", error)   
        return Response.json({ 
            success: false, 
            message: "Error Registering user" 
        },{status: 500})
    }
} 