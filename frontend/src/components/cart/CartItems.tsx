import type { CartContextType } from "@/types/order";
import { Minus, Plus, Trash2 } from "lucide-react";

function CartItems({
  items,
  removeItem,
  increaseQuantity,
  decreaseQuantity,
}: CartContextType) {
  return (
    <div className="lg:col-span-2 space-y-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex gap-4">
            {/* Product Image */}
            <div className="w-24 h-24 shrink-0 bg-gray-100 rounded-md overflow-hidden">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-1">
                    {item.description}
                  </p>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="ml-4 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    disabled={item.quantity <= 1}
                    className={`p-1.5 rounded-md border transition-colors ${
                      item.quantity <= 1
                        ? "border-gray-200 text-gray-300 cursor-not-allowed"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-gray-900 font-medium min-w-8 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => increaseQuantity(item)}
                    disabled={
                      item.quantity >= 10 || item.quantity >= item.stock
                    }
                    className={`p-1.5 rounded-md border transition-colors ${
                      item.quantity >= 10 || item.quantity >= item.stock
                        ? "border-gray-200 text-gray-300 cursor-not-allowed"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-right">
                  <p className="text-xl font-bold text-gray-900">
                    र {(item.price * item.quantity).toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500">
                    र {item.price.toFixed(2)} each
                  </p>
                </div>
              </div>

              {item.quantity >= item.stock && (
                <p className="text-xs text-orange-600 mt-2">
                  Maximum stock reached ({item.stock} available)
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CartItems;
