import express from "express";
import session from "express-session";
import passport from "passport";
import { apiLimiter } from "../src/middleware/rateLimiter";
import authRoutes from "../src/routes/authRoutes";
import "../src/utils/passport";
import cors from "cors";

const app = express();

const corsOptions = {
  origin: "*", // Replace with your frontend's origin
  methods: ["GET", "POST", "PUT", "DELETE"], // Add any other methods you use
  credentials: true, // Allow cookies and authorization headers
};

app.options("*", cors(corsOptions));

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.JWT_SECRET!,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(apiLimiter); // Apply rate limiting middleware

app.use("/api", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
