import rateLimit from "express-rate-limit";

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 100000, // 15 minutes
  max: 10000, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later",
});
