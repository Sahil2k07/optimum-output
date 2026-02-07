import { Router } from "express";
import authMiddleware from "../../middlewares/authMiddleware.js";
import authController from "./auth.controller.js";

const authRoutes = Router();

authRoutes.get("/me", authMiddleware, authController.me);

authRoutes.post("/signin", authController.signIn);

export default authRoutes;
