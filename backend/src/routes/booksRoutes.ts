import express from "express";
import { Router } from "express";
import { getAllBooks, getBookById } from "../controllers/bookControllers";

const booksRouter: Router = express.Router();

booksRouter.get("/getAllBooks", getAllBooks);
booksRouter.get("/getBookById/:id", getBookById);
