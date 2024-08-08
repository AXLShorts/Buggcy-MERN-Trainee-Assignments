import express from "express";
import {
  signup,
  signin,
  getProfile,
  // updateProfile,
} from "../controllers/authController";
import {
  googleAuth,
  googleAuthCallback,
  googleAuthRedirect,
} from "../controllers/googleAuthController";
import { authenticate } from "../middleware/auth";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/profile", authenticate, getProfile);
// router.put("/profile", authenticate, updateProfile);

// Google OAuth routes
router.get("/auth/google", googleAuth);
router.get("/auth/google/callback", googleAuthCallback, googleAuthRedirect);

export default router;
