import {z} from "zod";

export const verifySchema = z.string().length(6, "Code must be 6 characters long")