import axiosInstance from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { ShoppingBag } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function SignIn() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("API_TOKEN")) {
      navigate("/order");
      return;
    }
  }, []);

  const mutation = useMutation({
    mutationFn: async (userType: string) => {
      const response = await axiosInstance.post("/api/auth/signin", {
        userType,
      });

      return response.data;
    },
    onSuccess: (data) => {
      if (data?.token) {
        localStorage.setItem("API_TOKEN", data.token);
      }
      navigate("/");
    },
    onError: (error) => {
      console.error(error);
      toast.error(error?.message || "Something went wrong");
    },
  });

  return (
    <div className="min-h-screen  lg:-mt-20 bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center">
              <ShoppingBag className="w-8 h-8 text-white" />
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome to GoKart
            </h1>
            <p className="text-sm text-gray-600">
              Try the App with minimal Auth
            </p>
          </div>

          <button
            onClick={() => mutation.mutate("customer")}
            className="w-full bg-gray-900 text-white py-3 px-4 rounded-md font-medium hover:bg-gray-800 transition-colors mb-6 cursor-pointer"
          >
            Continue as Customer
          </button>

          <button
            onClick={() => mutation.mutate("wholeseller")}
            className="w-full bg-gray-900 text-white py-3 px-4 rounded-md font-medium hover:bg-gray-800 transition-colors mb-6 cursor-pointer"
          >
            Continue as Wholeseller
          </button>

          <button
            onClick={() => mutation.mutate("admin")}
            className="w-full bg-gray-900 text-white py-3 px-4 rounded-md font-medium hover:bg-gray-800 transition-colors mb-6 cursor-pointer"
          >
            Continue as Admin
          </button>

          <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
            <p className="text-sm text-blue-800">
              <span className="font-semibold">Note:</span> This project
              implements customer and wholeseller only for simplicity. In a
              production environment, full authentication would be integrated.
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-gray-500 mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}

export default SignIn;
