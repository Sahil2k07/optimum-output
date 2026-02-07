import type { NextFunction, Request, Response } from "express";
import Roles from "../consts/role.js";
import { ForbiddenError, UnauthorizedError } from "../errors/errors.js";

function roleMiddleware(...roles: Roles[]) {
  return function (req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user;

      if (!user) throw new UnauthorizedError("token not found");

      if (!roles.includes(user.role)) {
        throw new ForbiddenError(
          "user is not authorized to access this feature",
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}

export default roleMiddleware;
