import {z} from "zod";

export const usernameValidation = z
    .string()
    .min(4, "Username must be atleast 4 characters long")
    .max(10, "Username must be atmost 10 characters long")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain alphabets and numbers")

export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({message: "Invalid email"}),
    password: z.string().min(6, {message: "Password must be atleast 6 characters long"})
})