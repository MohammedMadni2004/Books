import express from "express";
import { Router } from "express";
import { getReviewOfBook } from "../controllers/reviewControllers";

const reviewRouter: Router = express.Router();

reviewRouter.get("/getReviewOfBook/:id", getReviewOfBook);
reviewRouter.post("/addReview", addReview);

export default reviewRouter;