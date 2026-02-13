import Permissions from "@/consts/permissions";
import { CartContext } from "@/context/CartContext";
import useAuth from "@/hooks/useAuth";
import {
  LogIn,
  LogOut,
  ShoppingCart,
  Package,
  ShoppingBag,
} from "lucide-react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const cartCount = useContext(CartContext)?.items.length || 0;
  const navigate = useNavigate();
  const { user, hasAccess } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("API_TOKEN");
    navigate("/signin");
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center group-hover:bg-gray-800 transition-colors">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">GoKart</span>
          </Link>

          <div className="flex items-center gap-6">
            {user && (
              <>
                <Link
                  to="/product"
                  hidden={!hasAccess(Permissions.MANAGE_PRODUCTS)}
                  className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span className="hidden sm:inline">Manage Products</span>
                </Link>

                <Link
                  to="/all-products"
                  hidden={!hasAccess(Permissions.MANAGE_ALL_PRODUCTS)}
                  className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span className="hidden sm:inline">All Products</span>
                </Link>

                <Link
                  to="/order"
                  className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                >
                  <Package className="w-4 h-4" />
                  <span className="hidden sm:inline">Orders</span>
                </Link>
              </>
            )}

            <Link
              to="/cart"
              className="relative p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </Link>

            {/* Divider */}
            <div className="h-6 w-px bg-gray-200" />

            {!user ? (
              <Link
                to="/signin"
                className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In</span>
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
