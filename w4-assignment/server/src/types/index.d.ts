import { User } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
        name: string;
        age: number;
        gender: string;
        profilePicture?: string;
        role: Role;
      };
    }
  }
}
