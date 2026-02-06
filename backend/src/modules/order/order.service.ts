import { prisma } from "../../config/prisma.js";
import { BadRequestError } from "../../errors/errors.js";
import type { User } from "../../views/common.js";
import type { PlaceOrderRequest } from "../../views/order.js";

export class OrderService {
  placeOrder = async (payload: PlaceOrderRequest, user: User) => {
    const cartMap: Record<string, { id: number; quantity: number }> = {};

    for (const element of payload) {
      cartMap[String(element.id)] = element;
    }

    const requestedProductIds = Object.keys(cartMap).map(Number);

    const products = await prisma.product.findMany({
      where: { id: { in: requestedProductIds } },
      include: { stock: true },
    });

    if (requestedProductIds.length !== products.length) {
      const foundIds = new Set(products.map((p) => p.id));
      const missingIds = requestedProductIds.filter((id) => !foundIds.has(id));

      throw new BadRequestError(
        `Invalid product ids: ${missingIds.join(", ")}`,
      );
    }

    const result = await prisma.$transaction(async (tx) => {
      let subtotal = 0;

      for (const p of products) {
        const requestedQuantity = cartMap[p.id]?.quantity;

        if (
          !p.stock ||
          !requestedQuantity ||
          requestedQuantity > p?.stock?.quantity
        ) {
          throw new BadRequestError(`${p.title} is out of stock`);
        }

        const result = await tx.stock.updateMany({
          where: { productId: p.id, quantity: { gte: requestedQuantity } },
          data: { quantity: { decrement: requestedQuantity } },
        });

        if (result.count !== 1) {
          throw new BadRequestError(`${p.title} is out of stock`);
        }

        subtotal += p.price.toNumber() * requestedQuantity;
      }

      const order = await tx.order.create({
        data: {
          total: subtotal < 500 ? subtotal + 150 : subtotal,
          userId: user.id,
          orderItems: {
            create: products.map((p) => ({
              productId: p.id,
              price: p.price,
              quantity: cartMap[p.id]?.quantity!,
            })),
          },
        },
        select: { id: true },
      });

      return { orderId: order.id };
    });

    return result;
  };

  getUserOrders = async (user: User) => {
    const orders = await prisma.order.findMany({
      where: { userId: user.id },
      include: {
        orderItems: { include: { product: true } },
      },
    });

    return orders;
  };
}

export default new OrderService();
