import {z} from "zod";

export const messageSchema = z.object({
    content: z.string().min(1, "Message must be atleast 1 character long").max(200, "Message must be atmost 200 characters long")
})