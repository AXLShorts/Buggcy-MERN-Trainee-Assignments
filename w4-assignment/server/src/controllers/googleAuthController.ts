import { Request, Response } from "express";
import passport from "passport";
import { generateToken } from "../utils/jwt";

export const googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
});

export const googleAuthCallback = passport.authenticate("google", {
  failureRedirect: "/login",
  session: false,
});

export const googleAuthRedirect = (req: Request, res: Response) => {
  const token = generateToken(req.user!);
  res.redirect(`/?token=${token}`);
};
