import {z} from "zod";

export const messageSchema = z.object({
    content: z.string().max(200, "Message must be atmost 200 characters long")
})