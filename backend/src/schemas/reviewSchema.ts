import { z } from "zod";

export const reviewSchema = z.object({
    bookId: z.string(),
    userId: z.string(),
    title: z.string(),
    description: z.string(),
});