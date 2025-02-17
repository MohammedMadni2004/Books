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

async function getBookById(req: Request, res: Response): Promise<Response> {
    try {
        const { id } = req.params;
        const book = await prisma.book.findUnique({
        where: {
            id: id,
        },
        });
        if (!book) {
        return res.status(404).json({ message: "Book not found" });
        }
        return res.status(200).json({ book });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" });
    }
    }
export { getAllBooks, getBookById };
