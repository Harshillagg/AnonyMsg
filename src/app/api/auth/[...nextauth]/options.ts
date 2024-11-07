import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";

export const authOptions : NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials:{
                email: {label: "Email", type: "text", placeholder: "abc@example.com"},
                password: {label: "Password", type: "password", placeholder: "******"}
            },

            // tell the provider how to authorize
            async authorize(credentials : any): Promise<any>{
                // connect to database to verify credentials
                await dbConnect()

                try {
                    const user = await UserModel.findOne({
                        $or : [
                            // credentials.identifier gives the parameter value
                            {email : credentials.identifier},
                            {username : credentials.identifier}
                        ]
                    })

                    if(!user) throw new Error('No user found with this email')

                    if(!user.isVerified) throw new Error('Please verify your email first')

                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)

                    if(!isPasswordCorrect) throw new Error('Incorrect password')
                    
                    return user
                }
                catch (error:any) {
                    //  always throw error here
                    throw new Error(error)    
                }
            }
        })
    ],
    callbacks: {
        // updating token and session so that we dont have to query database again ansd again now
        async jwt({user, token}){
            if(user){
                // declared user types in 'next-auth.d.ts' to access user _id ...
                token._id = user._id?.toString()
                token.isVerified = user.isVerified
                token.isAcceptingMessage = user.isAcceptingMessage
                token.username = user.username
            }

            return token
        },
        async session({session, token}){
            if(token){
                session.user._id = token._id
                session.user.isVerified = token.isVerified
                session.user.isAcceptingMessage = token.isAcceptingMessage
                session.user.username = token.username
            }
            return session
        }
    },
    pages: {
        signIn: "/sign-in"
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET
}