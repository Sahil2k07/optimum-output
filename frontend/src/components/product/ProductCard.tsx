import { CartContext } from "@/context/CartContext";
import type { Product } from "@/types/product";
import { useContext } from "react";

function ProductCard({ product }: { product: Product }) {
  const getStockDisplay = (stock: number) => {
    if (stock === 0) {
      return {
        text: "Sold Out",
        color: "text-red-600",
        dotColor: "bg-red-500",
      };
    } else if (stock > 10) {
      return {
        text: "In Stock",
        color: "text-green-600",
        dotColor: "bg-green-500",
      };
    } else {
      return {
        text: `Hurry, only ${stock} left`,
        color: "text-orange-600",
        dotColor: "bg-orange-500",
      };
    }
  };

  const stockInfo = getStockDisplay(product.stock);

  const cartContext = useContext(CartContext);

  return (
    <div className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-4/3 bg-linear-to-br from-gray-50 to-gray-100 overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg
              className="w-16 h-16 text-gray-300"
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

      {/* Product Info */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {product.title}
          </h3>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2 min-h-10">
          {product.description}
        </p>

        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${stockInfo.dotColor}`} />
          <span className={`text-xs font-medium ${stockInfo.color}`}>
            {stockInfo.text}
          </span>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div>
            <span className="text-2xl font-bold text-gray-900">
              र {product.price.toFixed(2)}
            </span>
          </div>

          <button
            disabled={
              product.stock <= 0 || cartContext?.isItemAlreadyAdded(product.id)
            }
            onClick={() => cartContext?.increaseQuantity(product)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              product.stock === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : cartContext?.isItemAlreadyAdded(product.id)
                  ? "text-gray-600 bg-gray-300 cursor-not-allowed"
                  : "bg-gray-900 text-white hover:bg-gray-800"
            }`}
          >
            {product.stock === 0
              ? "Unavailable"
              : cartContext?.isItemAlreadyAdded(product.id)
                ? "Added to Cart"
                : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
