import ProductList from "@/components/product/ProductList";

function Product() {
  return <ProductList isManaged={true} apiUrl="/api/product/managed" />;
}

export default Product;
