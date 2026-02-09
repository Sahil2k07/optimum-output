import axiosInstance from "@/lib/axios";
import type { Product } from "@/types/product";
import { useMutation } from "@tanstack/react-query";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

type ManageProductCardProps = {
  product: Product;
  onEdit: (product: Product) => void;
  refetch: () => void;
};

function ManageProductCard({
  product,
  onEdit,
  refetch,
}: ManageProductCardProps) {
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
        text: `Only ${stock} left`,
        color: "text-orange-600",
        dotColor: "bg-orange-500",
      };
    }
  };

  const stockInfo = getStockDisplay(product.stock);

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.delete("/api/product", {
        params: { id: product.id },
      });

      return response.data;
    },
    onSuccess: () => {
      refetch();
      toast.success("Product deleted");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Something went wrong");
    },
  });

  return (
    <div className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Product Image Section */}
      <div className="aspect-4/3 bg-linear-to-br from-gray-50 to-gray-100 overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover"
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
        {/* Title */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {product.title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2 min-h-10">
          {product.description}
        </p>

        {/* Stock Status */}
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${stockInfo.dotColor}`} />
          <span className={`text-xs font-medium ${stockInfo.color}`}>
            {stockInfo.text}
          </span>
        </div>

        {/* Price */}
        <div className="pt-2 border-t border-gray-100">
          <span className="text-2xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <button
            onClick={() => onEdit(product)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors"
          >
            <Pencil className="w-4 h-4" />
            Edit
          </button>
          <button
            onClick={() => mutation.mutate()}
            disabled={mutation.isPending}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ManageProductCard;
