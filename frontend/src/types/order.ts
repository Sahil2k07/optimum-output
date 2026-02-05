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
