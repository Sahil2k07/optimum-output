import express from "express";
import { loadEnvFile } from "node:process";
import errorFilter from "./middlewares/errorFilter";
import productRoutes from "./modules/product/product.routes";
import cors from "cors";

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

server.use("/api/product", productRoutes);

server.use(errorFilter);

server.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});
