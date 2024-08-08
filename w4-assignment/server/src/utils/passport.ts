import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import prisma from "../prisma";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken: any, refreshToken: any, profile: any, done: any) => {
      try {
        let user = await prisma.user.findUnique({
          where: { email: profile.emails![0].value },
        });

        if (!user) {
          user = await prisma.user.create({
            data: {
              email: profile.emails![0].value,
              name: profile.displayName,
              profilePicture: profile.photos![0].value,
              age: 0, // Default value
              gender: "", // Default value
              role: "USER",
              password: "", // OAuth doesn't require a password
            },
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, (user as any).id));
passport.deserializeUser(async (id: any, done) => {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(id, 10) },
  });
  done(null, user);
});
