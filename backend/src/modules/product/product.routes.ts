import { Router } from "express";
import productController from "./product.controller.js";
import authMiddleware from "../../middlewares/authMiddleware.js";
import roleMiddleware from "../../middlewares/roleMiddleware.js";
import Roles from "../../consts/role.js";

const productRoutes = Router();

productRoutes.get("/", productController.getProducts);

productRoutes.get(
  "/managed",
  authMiddleware,
  roleMiddleware(Roles.WHOLESELLER),
  productController.getManagedProducts,
);

productRoutes.get(
  "/managed/admin",
  authMiddleware,
  roleMiddleware(Roles.ADMIN),
  productController.getAllManagedProducts,
);

productRoutes.post(
  "/",
  authMiddleware,
  roleMiddleware(Roles.WHOLESELLER),
  productController.addProduct,
);

productRoutes.put(
  "/",
  authMiddleware,
  roleMiddleware(Roles.WHOLESELLER),
  productController.updateProduct,
);

productRoutes.delete(
  "/",
  authMiddleware,
  roleMiddleware(Roles.WHOLESELLER),
  productController.deleteProduct,
);

export default productRoutes;
