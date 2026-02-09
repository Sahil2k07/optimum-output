import { prisma } from "../../config/prisma.js";
import Roles from "../../consts/role.js";
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} from "../../errors/errors.js";
import { Prisma } from "../../generated/prisma/client.js";
import type { User } from "../../views/common.js";
import {
  AddProductView,
  UpdateProductView,
  type GetProductView,
} from "../../views/product.js";

export class ProductService {
  getProducts = async ({ skip, take, filter }: GetProductView) => {
    const where: Prisma.ProductWhereInput = filter
      ? {
          OR: [
            { title: { contains: filter } },
            { description: { contains: filter } },
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

  getManagedProducts = async (
    { skip, take, filter }: GetProductView,
    user: User,
  ) => {
    let where: Prisma.ProductWhereInput = {};

    if (filter) {
      where.OR = [
        { title: { contains: filter } },
        { description: { contains: filter } },
      ];
    }

    if (user.role !== Roles.ADMIN) {
      where.createdById = user.id;
    }

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

  addProduct = async (view: AddProductView, user: User) => {
    const response = await prisma.product.create({
      data: {
        title: view.title,
        description: view.description,
        image:
          view.image ||
          "https://imgs.search.brave.com/2rARSIJgKeSynN6Pmjr0o6GKdU-4ikoHQqocWJbDTOw/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMDUv/NzIwLzQwOC9zbWFs/bC9jcm9zc2VkLWlt/YWdlLWljb24tcGlj/dHVyZS1ub3QtYXZh/aWxhYmxlLWRlbGV0/ZS1waWN0dXJlLXN5/bWJvbC1mcmVlLXZl/Y3Rvci5qcGc",
        price: view.price,
        createdById: user.id,
        stock: {
          create: {
            quantity: view.stock,
          },
        },
      },
    });

    return response;
  };

  updateProduct = async (view: UpdateProductView, user: User) => {
    const product = await prisma.product.findUnique({ where: { id: view.id } });

    if (!product) throw new NotFoundError("product with id not found");

    if (user.role !== Roles.ADMIN && product.createdById !== user.id) {
      throw new ForbiddenError("You cannot edit this product");
    }

    const data: Prisma.ProductUpdateInput = {
      title: view.title,
      description: view.description,
      price: view.price,
      stock: {
        update: {
          quantity: view.stock,
        },
      },
    };

    if (view.image) {
      data.image = view.image;
    }

    const response = await prisma.product.update({
      where: { id: view.id },
      data,
    });

    return response;
  };

  deleteProduct = async (id: number, user: User) => {
    const product = await prisma.product.findUnique({ where: { id } });

    if (!product) throw new NotFoundError("product with id not found");

    if (user.role !== Roles.ADMIN && product.createdById !== user.id)
      throw new BadRequestError("the product is not created by the user");

    await prisma.$transaction([
      prisma.orderItem.deleteMany({
        where: { productId: id },
      }),
      prisma.stock.deleteMany({
        where: { productId: id },
      }),
      prisma.product.delete({
        where: { id },
      }),
    ]);
  };
}

export default new ProductService();
