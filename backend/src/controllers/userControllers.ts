import prisma from "../lib/prisma";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { loginSchema, registerSchema } from "../schemas/userSchema";
import z from "zod";

async function login(req: Request, res: Response): Promise<Response> {
  try {
    const { email, password } = loginSchema.parse(req.body);
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    console.log("hello");
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(400).json({ message: "Invalid password" });
    }
    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
}
async function register(req: Request, res: Response): Promise<Response> {
  try {
    const { email, password, name } = registerSchema.parse(req.body);
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
        name: name,
      },
    });
    
    return res.status(201).json({ user: newUser });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: error.errors });
    }
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
}
export { login, register };
