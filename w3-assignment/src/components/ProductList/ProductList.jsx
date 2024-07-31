import useProducts from "../../hooks/useProducts";

const ProductList = () => {
  const { products, isLoading, isError } = useProducts();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading products</div>;

  return (
    <div>
      <h2>Products</h2>
      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.title}</h3>
          <p>{product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
