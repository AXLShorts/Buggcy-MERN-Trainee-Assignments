"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const prisma_1 = __importDefault(require("../prisma"));
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await prisma_1.default.user.findUnique({
            where: { email: profile.emails[0].value },
        });
        if (!user) {
            user = await prisma_1.default.user.create({
                data: {
                    email: profile.emails[0].value,
                    name: profile.displayName,
                    profilePicture: profile.photos[0].value,
                    age: 0, // Default value
                    gender: "", // Default value
                    role: "USER",
                    password: "", // OAuth doesn't require a password
                },
            });
        }
        return done(null, user);
    }
    catch (error) {
        return done(error, false);
    }
}));
passport_1.default.serializeUser((user, done) => done(null, user.id));
passport_1.default.deserializeUser(async (id, done) => {
    const user = await prisma_1.default.user.findUnique({
        where: { id: parseInt(id, 10) },
    });
    done(null, user);
});
