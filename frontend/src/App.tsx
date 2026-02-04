import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "@/components/common/Navbar";

const router = createBrowserRouter([]);

function App() {
  return (
    <main>
      <Navbar />
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
