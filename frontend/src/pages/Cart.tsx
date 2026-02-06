import CartItems from "@/components/cart/CartItems";
import CartSummary from "@/components/cart/CartSummary";
import { CartContext } from "@/context/CartContext";
import { useContext } from "react";

function Cart() {
  const cartContext = useContext(CartContext);

  if (!cartContext || cartContext.items.length === 0) {
    return (
      <div className="min-h-screen -mt-20 bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-600">Add some products to get started</p>
        </div>
      </div>
    );
  }

  const {
    items,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    removeItem,
    isItemAlreadyAdded,
  } = cartContext;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <CartItems
            removeItem={removeItem}
            clearCart={clearCart}
            decreaseQuantity={decreaseQuantity}
            increaseQuantity={increaseQuantity}
            isItemAlreadyAdded={isItemAlreadyAdded}
            items={items}
          />

          <CartSummary cartItems={items} clearCart={clearCart} />
        </div>
      </div>
    </div>
  );
}

export default Cart;
