import type { Product } from "./product";

export type CartItem = Product & {
  quantity: number;
};

export type CartContextType = {
  items: CartItem[];
  increaseQuantity: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  clearCart: () => void;
  isItemAlreadyAdded: (id: number) => boolean;
};

type OrderItems = {
  id: number;
  orderId: number;
  quantity: number;
  productId: number;
  price: string; // price at the time of order
  product: Product;
};

export type UserOrderResponse = {
  id: number;
  userId: number;
  total: number;
  createdAt: Date;
  updatedAt: Date;
  orderItems: OrderItems[];
};
