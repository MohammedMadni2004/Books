import express from "express";
import { Router } from "express";
import { getUser, login, register } from "../controllers/userControllers";
import { checkAdmin, isAuthenticated } from "../middlewares/auth";

const userRouter: Router = express.Router();

userRouter.post("/login", login);
userRouter.post("/register", register);
userRouter.get("/getUser/", isAuthenticated, getUser);
userRouter.get('/test',isAuthenticated,checkAdmin) ; 

export default userRouter;
