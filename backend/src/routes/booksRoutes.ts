import express from "express";
import { Router } from "express";
import { getAllBooks, getBookById, addBook } from "../controllers/bookControllers";
import { checkAdmin, isAuthenticated } from "../middlewares/auth";

const booksRouter: Router = express.Router();

booksRouter.get("/getAllBooks", getAllBooks);
booksRouter.get("/getBookById/:id", getBookById);
booksRouter.post('/addBook', isAuthenticated, checkAdmin, addBook);

export default booksRouter;