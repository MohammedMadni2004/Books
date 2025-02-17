import { PrismaClient} from "@prisma/client";
const prisma = new PrismaClient();
import { Request,Response } from "express";
import bcrypt from "bcrypt";
import { loginSchema } from "../schemas/user";

async function login(req:Request,res:Response):Promise<Response>{
    try {
        const {email,password} = loginSchema.parse(req.body);
        const user = await prisma.user.findUnique({  
            where:{
                email : email
            }
        });
        console.log('hello')
        console.log(user)
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        const isValid=await bcrypt.compare(password,user.password);
        if(!isValid){
            return res.status(400).json({message:"Invalid password"});
        }
        return res.status(200).json({message:"Login successful"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Server error"});
    }
}

export  {login};