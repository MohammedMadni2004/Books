import { title } from "process";
import prisma from "../lib/prisma";
import { Request, Response } from "express";
import { reviewSchema } from "../schemas/reviewSchema";

async function getReviewOfBook(req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.params;
    const reviews = await prisma.review.findMany({
      where: {
        id: id,
      },
    });
    return res.status(200).json({ reviews });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
}
async function addReview(req: Request, res: Response): Promise<Response> {
    try {
        const { bookId, userId, description ,title } = reviewSchema.parse(req.body);    
        const newReview = await prisma.review.create({
        data: {
            bookId: bookId,
            userId: userId,
            title:title,
            description:description,
        },
        });
        return res.status(201).json({ review: newReview });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" });
    }
    }
export { getReviewOfBook, addReview };
