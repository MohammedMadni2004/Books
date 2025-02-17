import prisma from "../lib/prisma";
import { Request, Response } from "express";

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
export { getReviewOfBook };
