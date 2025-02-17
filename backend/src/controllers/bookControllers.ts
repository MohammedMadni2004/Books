import prisma from "../lib/prisma";
import { Request, Response } from "express";

async function getAllBooks(req: Request, res: Response): Promise<Response> {
  try {
    const books = await prisma.book.findMany();
    return res.status(200).json({ books });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
}
export { getAllBooks };
