import {z} from "zod"; // used for validation of data before sending it to the database or api

export const acceptMessageSchema = z.object({
    acceptMessages: z.boolean()
})