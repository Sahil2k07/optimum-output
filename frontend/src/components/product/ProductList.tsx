import axiosInstance from "@/lib/axios";
import type {
  ListProductRequest,
  ListProductResponse,
  ManageProductRequest,
} from "@/types/product";
import type { Product } from "@/types/product";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Plus } from "lucide-react";
import { EmptyState } from "../common/EmptyState";
import SpinnerEmpty from "../common/Spinner";
import ProductCard from "./ProductCard";
import { ErrorState } from "../common/ErrorState";
import ManageProductCard from "./ManageProductCard";
import ProductForm from "./ProductForm";
import { toast } from "sonner";

type Props = {
  isManaged: boolean;
  apiUrl: string;
};

function ProductList({ apiUrl, isManaged }: Props) {
  const [payload, setPayload] = useState<ListProductRequest>({
    skip: 0,
    take: 10,
    filter: undefined,
  });

  const [formOpen, setFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const { data, error, isLoading, refetch } = useQuery<ListProductResponse>({
    queryKey: ["products", payload],
    queryFn: async () => {
      const res = await axiosInstance.get<ListProductResponse>(apiUrl, {
        params: payload,
      });
      return res.data;
    },
  });

  const handleAddProduct = () => {
    setEditingProduct(null);
    setFormOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setFormOpen(true);
  };

  const mutation = useMutation({
    mutationFn: async (payload: ManageProductRequest) => {
      const response = editingProduct
        ? await axiosInstance.put("/api/product", payload)
        : await axiosInstance.post("/api/product", payload);

      return response.data;
    },
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.error(error);
      toast.error("Something went wrong");
    },
  });

  if (isLoading) {
    return <SpinnerEmpty />;
  }

  if (error) {
    return <ErrorState message={error.message} />;
  }

  const currentPage = Math.floor(payload.skip / payload.take) + 1;
  const totalPages = Math.ceil((data?.total || 0) / payload.take);

  const onPageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;

    setPayload((prev) => ({
      ...prev,
      skip: (page - 1) * prev.take,
    }));
  };

  const getPages = (current: number, total: number) => {
    const pages: (number | "...")[] = [];

    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    pages.push(1);

    if (current > 4) {
      pages.push("...");
    }

    const start = Math.max(2, current - 2);
    const end = Math.min(total - 1, current + 2);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (current < total - 3) {
      pages.push("...");
    }

    pages.push(total);

    return pages;
  };

  return (
    <section className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-300 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Products</h2>
            <p className="mt-1 text-sm text-gray-500">
              {data?.total || 0} items available
            </p>
          </div>

          {isManaged && (
            <button
              onClick={handleAddProduct}
              className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Product
            </button>
          )}
        </div>

        {!data || data.products.length === 0 ? (
          <EmptyState
            title="No products yet"
            description={
              isManaged
                ? "Add products to continue"
                : "Run the seed script to insert data"
            }
          />
        ) : (
          <>
            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {data.products.map((product) => {
                return isManaged ? (
                  <ManageProductCard
                    key={product.id}
                    product={product}
                    onEdit={handleEditProduct}
                    refetch={refetch}
                  />
                ) : (
                  <ProductCard key={product.id} product={product} />
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center pt-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      currentPage === 1
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-700 hover:bg-white hover:shadow-sm"
                    }`}
                  >
                    Previous
                  </button>

                  <div className="flex items-center gap-1">
                    {getPages(currentPage, totalPages).map((page, index) => {
                      if (page === "...") {
                        return (
                          <span
                            key={`dots-${index}`}
                            className="px-2 text-gray-400"
                          >
                            ...
                          </span>
                        );
                      }

                      return (
                        <button
                          key={page}
                          onClick={() => onPageChange(page)}
                          className={`min-w-10 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                            currentPage === page
                              ? "bg-gray-900 text-white shadow-md"
                              : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      currentPage === totalPages
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-700 hover:bg-white hover:shadow-sm"
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <ProductForm
        open={formOpen}
        onOpenChange={setFormOpen}
        product={editingProduct}
        onSubmit={mutation.mutate}
      />
    </section>
  );
}

export default ProductList;
