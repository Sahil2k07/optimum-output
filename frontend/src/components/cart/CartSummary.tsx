import type { CartItem } from "@/types/order";

function CartSummary({ cartItems }: { cartItems: CartItem[] }) {
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const deliveryCharges = subtotal >= 500 || subtotal === 0 ? 0 : 150;
  const total = subtotal + deliveryCharges;

  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

        <div className="space-y-4 mb-6">
          <div className="flex justify-between text-gray-600">
            <span>Items ({totalItems})</span>
            <span className="font-medium">र {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Delivery Charges</span>
            <span
              className={`font-medium ${deliveryCharges === 0 ? "text-green-600" : ""}`}
            >
              {deliveryCharges === 0
                ? "FREE"
                : `र ${deliveryCharges.toFixed(2)}`}
            </span>
          </div>
          {subtotal < 500 && (
            <p className="text-xs text-gray-500">
              Add ${(500 - subtotal).toFixed(2)} more for free delivery
            </p>
          )}
          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-900">Total</span>
              <span className="text-2xl font-bold text-gray-900">
                र {total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <button className="w-full bg-gray-900 text-white py-3 rounded-md font-medium hover:bg-gray-800 transition-colors">
          Place Order
        </button>
      </div>
    </div>
  );
}

export default CartSummary;
