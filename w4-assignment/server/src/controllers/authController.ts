import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import prisma from "../prisma";
import { generateToken } from "../utils/jwt";
import { z } from "zod";

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
  age: z.number().int().positive(),
  gender: z.string(),
  profilePicture: z.string().optional(),
});

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password, name, age, gender, profilePicture } =
      signupSchema.parse(req.body);
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        age,
        gender,
        profilePicture,
      },
    });

    const token = generateToken(user);
    res.json({ token, user });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = generateToken(user);
  res.json({ token, user });
};

export const getProfile = async (req: Request, res: Response) => {
  res.json(req.user);
};

export const updateProfile = async (req: Request, res: Response) => {
  const { name, age, gender, profilePicture } = req.body;

  const user = await prisma.user.update({
    where: { id: req.user?.id },
    data: { name, age, gender, profilePicture },
  });

  res.json(user);
};
