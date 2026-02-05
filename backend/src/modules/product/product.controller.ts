import type { Request, Response, NextFunction } from "express";
import productService, { ProductService } from "./product.service.js";
import { getProductSchema } from "../../views/product.js";

class ProductController {
  private readonly service: ProductService;

  constructor(service: ProductService) {
    this.service = service;
  }

  getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const schema = getProductSchema.parse(req.query);

      const response = await this.service.getProducts(schema);

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
}

export default new ProductController(productService);
