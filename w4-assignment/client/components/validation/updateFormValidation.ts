import { z } from "zod";

export const updateFormSchema: any = z
  .object({
    name: z
      .string()
      .min(3, "Name must be at least 3 characters long.")
      .max(50, "Name must be at most 50 characters long."),
    email: z.string().email("Invalid email address."),
    oldPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long."),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long."),
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
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.oldPassword !== data.newPassword, {
    message: "New password must be different from the old password",
    path: ["password"],
  });
