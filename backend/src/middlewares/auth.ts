import { Request, Response, NextFunction } from "express";
import { CustomRequest } from "../types/types";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma";

async function isAuthenticated(req: CustomRequest, res: Response, next: NextFunction) {
  try{
    const header= req.headers.authorization;
    if(!header || !header.startsWith("Bearer")){
      return res.status(401).json({message:"Unauthorized"});
    }
    const token= header.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
    const decoded= jwt.verify(token, process.env.JWT_SECRET|| '');
    if(!decoded || !decoded.userId){
      return res.status(401).json({message:"Unauthorized"});
    }
    const user=await prisma.user.findUnique({
      where:{
        id:decoded.userId,
      },
    });
    if(!user){
      return res.status(401).json({message:"Unauthorized"});
    }
    req.user=user;
    console.log('done');
    next();
} catch (error) {
  return res.status(500).json({ message: "Server error" });
}
  
}
async function checkAdmin(req: CustomRequest, res: Response, next: NextFunction) {
    if (req.user?.role !== "ADMIN") {  
      return res.status(403).json({ message: "Forbidden need to authorize" });
    }
    console.log("done");
    
    next();
  }
  

export  { isAuthenticated, checkAdmin};
