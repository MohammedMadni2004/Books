import express from 'express';
import { Router } from 'express';
import { login } from '../controllers/userControllers';

const userRouter:Router= express.Router();

userRouter.post('/login', login)
 
export default userRouter;