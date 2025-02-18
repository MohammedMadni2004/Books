import { title } from "process";
import prisma from "../lib/prisma";
import { Request, Response } from "express";
import { reviewSchema } from "../schemas/reviewSchema";

async function getReviewOfBook(req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.params.id;
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
    const { bookId, userId, description, title } = reviewSchema.parse(req.body);
  
    const bookExists = await prisma.book.findUnique({ where: { id: bookId } });
    if (!bookExists) {
      return res.status(400).json({ error: "Invalid bookId: Book does not exist" });
    }
  
    if (userId) {
      const userExists = await prisma.user.findUnique({ where: { id: userId } });
      if (!userExists) {
        return res.status(400).json({ error: "Invalid userId: User does not exist" });
      }
    }
  
    const newReview = await prisma.review.create({
      data: {
        bookId,
        userId,
        title,
        description,
      },
    });
  
    return res.status(201).json({ review: newReview });
  
  } catch (error) {
    return res.status(500).json({ error: "Internal server error", details: error.message });
  }
  
    }
export { getReviewOfBook, addReview };
