import ProductList from "@/components/product/ProductList";

export default function AllProducts() {
  return <ProductList isManaged={true} apiUrl="/api/product/managed/admin" />;
}
