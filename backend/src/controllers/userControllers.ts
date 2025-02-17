import prisma from "../lib/prisma";
import { Request,Response } from "express";
import bcrypt from "bcrypt";
import { loginSchema } from "../schemas/user";

async function login(req:Request,res:Response):Promise<Response>{
    const {email,password} = loginSchema.parse(req.body);
    const user = await prisma.user.findUnique({
        where:{
            email : email
        }
    });
    if(!user){
        return res.status(404).json({message:"User not found"});
    }
     const isValid=await bcrypt.compare(password,user.password);
    if(!isValid){
        return res.status(400).json({message:"Invalid password"});
    }
    return res.status(200).json({message:"Login successful"});
}

export {login};