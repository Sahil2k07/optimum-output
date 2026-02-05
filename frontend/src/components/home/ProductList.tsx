import axiosInstance from "@/lib/axios";
import type { ListProductRequest, ListProductResponse } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { EmptyState } from "../common/EmptyState";
import SpinnerEmpty from "../common/Spinner";
import ProductCard from "./ProductCard";
import { ErrorState } from "../common/ErrorState.";

function ProductList() {
  const [payload, setPayload] = useState<ListProductRequest>({
    skip: 0,
    take: 10,
    filter: undefined,
  });

  const { data, error, isLoading } = useQuery<ListProductResponse>({
    queryKey: ["products", payload],
    queryFn: async () => {
      const res = await axiosInstance.get<ListProductResponse>("/api/product", {
        params: payload,
      });
      return res.data;
    },
  });

  if (isLoading) {
    return <SpinnerEmpty />;
  }

  if (error) {
    return <ErrorState message={error.message} />;
  }

  if (!data || data.products.length === 0) {
    return (
      <EmptyState
        title="No products yet"
        description="Run the seed script to insert data"
      />
    );
  }

  const currentPage = Math.floor(payload.skip / payload.take) + 1;
  const totalPages = Math.ceil(data.total / payload.take);

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
    <section className="min-h-screen bg-gray-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between border-b border-gray-300 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Products</h2>
            <p className="mt-1 text-sm text-gray-500">
              {data.total} items available
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data.products.map((product) => (
            <ProductCard key={product.title} product={product} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-end pt-4">
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
      </div>
    </section>
  );
}

export default ProductList;
