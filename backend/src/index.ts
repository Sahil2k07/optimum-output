import express from "express";
import { loadEnvFile } from "node:process";
import errorFilter from "./middlewares/errorFilter.js";
import productRoutes from "./modules/product/product.routes.js";
import cors from "cors";
import orderRoutes from "./modules/order/order.routes.js";

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

server.post("/api/auth/signin", async (req, res) => {
  res.status(200).json({ token: "guest-user-token" });
});

server.use("/api/product", productRoutes);
server.use("/api/order", orderRoutes);

server.use(errorFilter);

server.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});
