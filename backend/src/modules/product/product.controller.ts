import type { Request, Response, NextFunction } from "express";
import productService, { ProductService } from "./product.service.js";
import {
  addProductSchema,
  getProductSchema,
  updateProductSchema,
} from "../../views/product.js";

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

  getManagedProducts = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const schema = getProductSchema.parse(req.query);

      const response = await this.service.getManagedProducts(schema, req.user);

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  addProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const schema = addProductSchema.parse(req.body);

      const response = await this.service.addProduct(schema, req.user);

      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  };

  updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const schema = updateProductSchema.parse(req.body);

      const response = await this.service.updateProduct(schema, req.user);

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.query.id);

      await this.service.deleteProduct(id, req.user);

      res.status(200).json({ success: true, message: "product was deleted" });
    } catch (error) {
      next(error);
    }
  };
}

export default new ProductController(productService);
