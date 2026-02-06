import { Router } from "express";
import orderController from "./order.controller.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

const orderRoutes = Router();

orderRoutes.get("/", authMiddleware, orderController.getUserOrders);

orderRoutes.post("/", authMiddleware, orderController.placeOrder);

export default orderRoutes;
