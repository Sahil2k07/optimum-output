import type { NextFunction, Request, Response } from "express";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers.authorization;

  if (!token || !token.includes("Bearer ")) {
    res.status(401).json({ success: false, message: "Invalid token" });
    return;
  }

  token = token.replace("Bearer ", "");

  // Will intergrate real jwt later for authenticatin; since right now we support only guest user this is fine
  if (token !== "guest-user-token") {
    res
      .status(401)
      .json({ success: false, message: "Only guest user supported for now" });

    return;
  }

  // simulation a user here; we ideally make a db call here or extract payload from jwt;
  req.user = {
    id: 1,
    email: "guest.user@gmail.com",
    name: "Guest User",
  };

  next();
};

export default authMiddleware;
