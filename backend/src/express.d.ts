import type { Request } from "express";
import Roles from "./consts/role.ts";

declare global {
  namespace Express {
    interface Request {
      user: {
        email: string;
        id: number;
        name: string;
        role: Roles;
      };
    }
  }
}
