import { prisma } from "../../config/prisma.js";
import { type GetProductView } from "../../views/product.js";

export class ProductService {
  getProducts = async ({ skip, take, filter }: GetProductView) => {
    const where = filter
      ? {
          OR: [
            { title: { contains: filter, mode: "insensitive" } },
            { description: { contains: filter, mode: "insensitive" } },
          ],
        }
      : {};

    const productCount = await prisma.product.count({ where });

    const products = await prisma.product.findMany({
      skip,
      take,
      where,
      include: {
        stock: true,
      },
    });

    const productsWithNumbers = products.map((p) => ({
      ...p,
      price: p.price.toNumber(),
      stock: p.stock?.quantity,
    }));

    return { total: productCount, products: productsWithNumbers };
  };
}

export default new ProductService();
