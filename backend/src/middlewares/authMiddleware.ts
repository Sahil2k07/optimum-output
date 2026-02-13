import type { NextFunction, Request, Response } from "express";
import Roles from "../consts/role.js";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    let token = req.headers.authorization;

    if (!token || !token.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    token = token.replace("Bearer ", "");

    const allowedTokens = [
      "customer-user-token",
      "wholeseller-user-token",
      "admin-user-token",
    ];

    if (!allowedTokens.includes(token)) {
      return res.status(401).json({
        success: false,
        message: "The token is not issued by GoKart",
      });
    }

    let user = {
      id: 1,
      email: "customer.user@gmail.com",
      name: "Customer User",
      role: Roles.CUSTOMER,
    };

    if (token === "wholeseller-user-token") {
      user = {
        id: 2,
        email: "wholeseller.user@gmail.com",
        name: "Wholeseller User",
        role: Roles.WHOLESELLER,
      };
    } else if (token === "admin-user-token") {
      user = {
        id: 3,
        email: "admin.user@gmail.com",
        name: "Admin User",
        role: Roles.ADMIN,
      };
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

export default authMiddleware;
