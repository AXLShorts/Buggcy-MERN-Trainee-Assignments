import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import prisma from "../prisma";
import { generateToken } from "../utils/jwt";
import { z } from "zod";
import cookie from "cookie";

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
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Ensure this is true in production
        sameSite: "none", // Allows cross-site cookie usage
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      })
    );

    // Respond with the created user data
    res.status(201).json({ user });
  } catch (error: any) {
    // Handle and respond with error
    res.status(400).json({ message: error.message });
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await prisma.user.findUnique({ where: { email } });

    // Check if user exists and password is correct
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT
    const token = generateToken(user);

    // Set the JWT as an httpOnly cookie
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      })
    );

    // Respond with the user data (excluding sensitive information)
    res.status(200).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
        age: user.age,
        gender: user.gender,
      },
    });
  } catch (error: any) {
    // Handle and respond with error
    res.status(500).json({ message: error.message });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  res.json(req.user);
};

// export const updateProfile = async (req: Request, res: Response) => {
//   const { name, age, gender, profilePicture } = req.body;

//   const user = await prisma.user.update({
//     where: { id: req.user?.id },
//     data: { name, age, gender, profilePicture },
//   });

//   res.json(user);
// };

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
};
