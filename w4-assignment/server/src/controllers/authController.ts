import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import prisma from "../prisma";
import { generateToken } from "../utils/jwt";
import { z } from "zod";
import cookie from "cookie";
import { User } from "@prisma/client";

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
  age: z.number().int().positive(),
  gender: z.string(),
  profilePicture: z.string().optional(),
});

const updateProfileSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  oldPassword: z.string().optional(),
  newPassword: z.string().optional(),
  age: z.number().int().positive(),
  profilePicture: z.string().optional(),
  gender: z.string(),
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
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7,
        expires: new Date(Date.now() + 60 * 60 * 24 * 7 * 1000),
        path: "/",
      })
    );

    // asd
    res.status(201).json({ user });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user);

    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7,
        expires: new Date(Date.now() + 60 * 60 * 24 * 7 * 1000),
        path: "/",
      })
    );

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
    res.status(500).json({ message: error.message });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  res.json(req.user);
};

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const {
      name,
      email,
      oldPassword,
      newPassword,
      age,
      gender,
      profilePicture,
    } = updateProfileSchema.parse(req.body);

    const reqUser = req.user as User;

    // Find the user by ID
    const user = await prisma.user.findUnique({ where: { id: reqUser.id } });

    // Check if the user exists and the old password matches
    if (
      oldPassword !== "" &&
      (!user || !(await bcrypt.compare(oldPassword || "", user.password)))
    ) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword || "", 10);

    // Update the user profile
    if (
      oldPassword === newPassword &&
      oldPassword === "" &&
      newPassword === ""
    ) {
      const updatedUser = await prisma.user.update({
        where: { id: user?.id },
        data: {
          name,
          email,
          age,
          gender,
          profilePicture,
        },
      });
      res.json(updatedUser);
    } else {
      const updatedUser = await prisma.user.update({
        where: { id: user?.id },
        data: {
          name,
          email,
          password: hashedPassword,
          age,
          gender,
          profilePicture,
        },
      });
      res.json(updatedUser);
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("token", "/", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development", // secure flag true in production
      sameSite: "strict",
      expires: new Date(-1), // Set the expiration date to the past
      maxAge: -1, // Set maxAge to -1 to delete the cookie immediately
      path: "/",
    })
  );

  res.status(200).json({ message: "Logged out successfully" });
};
