"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const googleAuthController_1 = require("../controllers/googleAuthController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.post("/signup", authController_1.signup);
router.post("/signin", authController_1.signin);
router.get("/profile", auth_1.authenticate, authController_1.getProfile);
router.put("/profile", auth_1.authenticate, authController_1.updateProfile);
// Google OAuth routes
router.get("/auth/google", googleAuthController_1.googleAuth);
router.get("/auth/google/callback", googleAuthController_1.googleAuthCallback, googleAuthController_1.googleAuthRedirect);
exports.default = router;
