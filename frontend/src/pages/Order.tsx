import { EmptyState } from "@/components/common/EmptyState";
import { ErrorState } from "@/components/common/ErrorState.";
import SpinnerEmpty from "@/components/common/Spinner";
import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { Package, Calendar, IndianRupee } from "lucide-react";

type UserOrderResponse = {
  id: number;
  userId: number;
  total: number;
  createdAt: Date;
  updatedAt: Date;
  orderItems: {
    id: number;
    orderId: number;
    quantity: number;
    productId: number;
    price: string; // price at the time of order
    product: {
      id: number;
      title: string;
      descripton: number;
      price: string; // current price of the same thing
      image: string;
    };
  }[];
};

function Order() {
  const { isLoading, error, data } = useQuery<UserOrderResponse[]>({
    queryKey: ["orders"],
    queryFn: async () => {
      const response = await axiosInstance<UserOrderResponse[]>("/api/order");

      return response.data;
    },
  });

  if (isLoading) {
    return (
      <SpinnerEmpty
        title="Loading your orders"
        description="Please wait while we fetch your order history"
      />
    );
  }

  if (error) {
    return <ErrorState message={error.message} />;
  }

  if (!data || data.length === 0) {
    return (
      <EmptyState
        title="No orders yet"
        description="Start shopping and your orders will appear here"
      />
    );
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <section className="min-h-screen bg-gray-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-b border-gray-300 pb-4">
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <p className="mt-1 text-sm text-gray-500">
            {data.length} {data.length === 1 ? "order" : "orders"} in total
          </p>
        </div>

        <div className="space-y-6">
          {data.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Order Header */}
              <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-gray-500" />
                      <div>
                        <p className="text-xs text-gray-500">Order ID</p>
                        <p className="text-sm font-semibold text-gray-900">
                          #{order.id}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <div>
                        <p className="text-xs text-gray-500">Order Date</p>
                        <p className="text-sm font-semibold text-gray-900">
                          {formatDate(order.createdAt)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <IndianRupee className="w-4 h-4 text-gray-500" />

                      <div>
                        <p className="text-xs text-gray-500">Total Amount</p>
                        <p className="text-sm font-semibold text-gray-900">
                          र {Number(order.total).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                      Completed
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-6 space-y-4">
                {order.orderItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                  >
                    {/* Product Image */}
                    <div className="w-20 h-20 shrink-0 bg-gray-100 rounded-md overflow-hidden">
                      {item.product.image ? (
                        <img
                          src={item.product.image}
                          alt={item.product.title}
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

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-semibold text-gray-900 mb-1">
                        {item.product.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>Qty: {item.quantity}</span>
                        <span>•</span>
                        <span>र {Number(item.price).toFixed(2)} each</span>
                      </div>
                    </div>

                    {/* Item Total */}
                    <div className="text-right">
                      <p className="text-base font-bold text-gray-900">
                        र {(Number(item.price) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Order Summary */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-600">
                      {order.orderItems.reduce(
                        (sum, item) => sum + item.quantity,
                        0,
                      )}{" "}
                      {order.orderItems.reduce(
                        (sum, item) => sum + item.quantity,
                        0,
                      ) === 1
                        ? "item"
                        : "items"}
                    </p>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 mb-1">Order Total</p>
                      <p className="text-xl font-bold text-gray-900">
                        र {Number(order.total).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Order;
