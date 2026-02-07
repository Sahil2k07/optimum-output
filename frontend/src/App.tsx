import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Navbar from "@/components/common/Navbar";
import Home from "./pages/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Cart from "./pages/Cart";
import { Toaster } from "./components/ui/sonner";
import SignIn from "./pages/Signin";
import Protected from "./components/common/Protected";
import Order from "./pages/Order";
import CartProvider from "./context/CartContext";
import Product from "./pages/Product";

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/cart", element: <Cart /> },
      {
        path: "/order",
        element: (
          <Protected>
            <Order />
          </Protected>
        ),
      },
      {
        path: "/product",
        element: (
          <Protected>
            <Product />
          </Protected>
        ),
      },
      { path: "/signin", element: <SignIn /> },
    ],
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <main>
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <RouterProvider router={router} />
          <Toaster />
        </CartProvider>
      </QueryClientProvider>
    </main>
  );
}

export default App;
