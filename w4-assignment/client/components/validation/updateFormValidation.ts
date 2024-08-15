import { z } from "zod";

export const updateFormSchema: any = z
  .object({
    name: z
      .string()
      .min(3, "Name must be at least 3 characters long.")
      .max(50, "Name must be at most 50 characters long."),
    email: z.string().email("Invalid email address."),
    oldPassword: z.string().optional(),
    newPassword: z.string().optional(),
    confirmPassword: z.string().optional(),
    age: z
      .number()
      .int("Age must be a number.")
      .min(18, "You must be at least 18 years old.")
      .max(120, "You must be at most 120 years old."),
    gender: z.string().regex(/(male|female)/, "Invalid gender."),
  })
  .refine((data) => {
    if (data.oldPassword) {
      return data.oldPassword;
    }
  })
  .refine(
    (data) => {
      // If the newPassword is provided, ensure oldPassword is also provided
      if (data.newPassword || data.confirmPassword) {
        return data.oldPassword !== "";
      }
      return true;
    },
    {
      message: "Need to provide old password to change password",
      path: ["oldPassword"],
    }
  )
  .refine(
    (data) => {
      // If the oldPassword is provided, ensure newPassword and confirmPassword are also provided and match
      if (data.oldPassword || data.newPassword || data.confirmPassword) {
        return data.newPassword === data.confirmPassword;
      }
      return true;
    },
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  )
  .refine(
    (data) => {
      // Ensure the new password is different from the old password
      if (data.oldPassword && data.newPassword) {
        return data.oldPassword !== data.newPassword;
      }
      return true;
    },
    {
      message: "New password must be different from the old password",
      path: ["newPassword"],
    }
  );
