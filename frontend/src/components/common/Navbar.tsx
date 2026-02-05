import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar() {
  const cartCount = 3;

  return (
    <nav className="bg-gray-900 border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="shrink-0">
            <a href="/" className="text-2xl font-bold text-white">
              GoKart
            </a>
          </div>

          <div className="flex items-center gap-4">
            <Link to={"/"} className="text-white font-bold">
              Home
            </Link>

            <Link to={"/order"} className="text-white font-bold">
              Orders
            </Link>

            <Link
              to={"/cart"}
              className="relative p-2 text-white hover:text-gray-200 hover:bg-white rounded-md transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-gray-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
