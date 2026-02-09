import ProductList from "@/components/product/ProductList";

function Home() {
  return (
    <>
      <ProductList isManaged={false} apiUrl="/api/product" />
    </>
  );
}

export default Home;
