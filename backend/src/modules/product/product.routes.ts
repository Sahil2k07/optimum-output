import { Router } from "express";
import productController from "./product.controller.js";

const productRoutes = Router();

productRoutes.get("/", productController.getProducts);

export default productRoutes;
