import express from 'express';
import { Router } from 'express';
import {login,register} from '../controllers/userControllers';

const userRouter:Router= express.Router();

userRouter.post('/login', login);
userRouter.post('/register', register);
userRouter.get('/getUser/:id', )
 
export default userRouter;