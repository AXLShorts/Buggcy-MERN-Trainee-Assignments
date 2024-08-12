import { z } from "zod";

export const signUpFormSchema: any = z
  .object({
    name: z
      .string()
      .min(3, "Name must be at least 3 characters long.")
      .max(50, "Name must be at most 50 characters long."),
    email: z.string().email("Invalid email address."),
    password: z.string().min(8, "Password must be at least 8 characters long."),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long."),
    age: z
      .number()
      .int("Age must be a number.")
      .min(18, "You must be at least 18 years old to sign up.")
      .max(120, "You must be at most 120 years old to sign up."),
    gender: z.string().regex(/(male|female)/, "Invalid gender."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
