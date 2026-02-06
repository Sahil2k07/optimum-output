import { type NextFunction, type Request, type Response } from "express";
import orderService, { OrderService } from "./order.service.js";
import { placeOrderSchema } from "../../views/order.js";

class OrderController {
  private readonly orderService: OrderService;

  constructor(orderService: OrderService) {
    this.orderService = orderService;
  }

  placeOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;

      const payload = placeOrderSchema.parse(req.body);

      const response = await this.orderService.placeOrder(payload, user);

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  getUserOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;

      const response = await orderService.getUserOrders(user);

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
}

export default new OrderController(orderService);
