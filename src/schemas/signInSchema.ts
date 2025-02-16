import {z} from "zod";

export const signInSchema = z.object({
    email: z.string(), // email or username
    password: z.string()
})