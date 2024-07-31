import useProducts from "../../hooks/useProducts";
import Category from "./Category";
import groupByCategory from "../../utils/groupByCategory";

const ProductList = () => {
  const { products, isLoading, isError } = useProducts();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading products</div>;

  const groupedProducts = groupByCategory(products);

  return (
    <div className="max-w-screen-2xl w-full mt-16 flex flex-col gap-16">
      {Object.keys(groupedProducts).map((category) => (
        <Category
          key={category}
          title={category}
          products={groupedProducts[category]}
        />
      ))}
    </div>
  );
};

export default ProductList;
