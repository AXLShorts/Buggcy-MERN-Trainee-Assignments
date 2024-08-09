"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleAuthRedirect = exports.googleAuthCallback = exports.googleAuth = void 0;
const passport_1 = __importDefault(require("passport"));
const jwt_1 = require("../utils/jwt");
exports.googleAuth = passport_1.default.authenticate("google", {
    scope: ["profile", "email"],
});
exports.googleAuthCallback = passport_1.default.authenticate("google", {
    failureRedirect: "/login",
    session: false,
});
const googleAuthRedirect = (req, res) => {
    const token = (0, jwt_1.generateToken)(req.user);
    res.redirect(`/?token=${token}`);
};
exports.googleAuthRedirect = googleAuthRedirect;
