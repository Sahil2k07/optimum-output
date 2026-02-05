import type { CartContextType, CartItem } from "@/types/order";
import { createContext, useState } from "react";

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);

function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const increaseQuantity = (item: Omit<CartItem, "quantity">) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);

      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }

      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const decreaseQuantity = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
      ),
    );
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const isItemAlreadyAdded = (id: number): boolean => {
    return items.some((item) => item.id === id);
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        clearCart,
        isItemAlreadyAdded,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
