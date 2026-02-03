import express from "express";
import { loadEnvFile } from "node:process";
import errorFilter from "./middlewares/errorFilter";

loadEnvFile(".env");

const PORT = process.env.PORT ?? 3000;

const server = express();

server.use(express.json());

server.use(errorFilter);

server.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});
