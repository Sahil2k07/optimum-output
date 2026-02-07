import { NextFunction, Request, Response } from "express";
import authService, { AuthService } from "./auth.service.js";
import { UnauthorizedError } from "../../errors/errors.js";

class AuthController {
  private readonly authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  me = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;

      if (!user) throw new UnauthorizedError();

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };

  signIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userType = "customer" } = req.body;

      const response = await this.authService.signIn(userType);

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
}

export default new AuthController(authService);
