import express from "express";
import { loadEnvFile } from "node:process";
import errorFilter from "./middlewares/errorFilter.js";
import productRoutes from "./modules/product/product.routes.js";
import cors from "cors";
import orderRoutes from "./modules/order/order.routes.js";
import authRoutes from "./modules/auth/auth.routes.js";

loadEnvFile(".env");

const PORT = process.env.PORT ?? 3000;

const server = express();

server.use(express.json());

server.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

server.use("/api/auth", authRoutes);
server.use("/api/product", productRoutes);
server.use("/api/order", orderRoutes);

server.use(errorFilter);

server.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});
