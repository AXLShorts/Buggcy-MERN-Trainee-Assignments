import Category from "../ProductList/Category";
import useProducts from "../../hooks/useProducts";
import groupByCategory from "../../utils/groupByCategory";

const CategoryItems = ({ category }) => {
  const { products, isLoading, isError } = useProducts({
    category: category,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading products</div>;

  const groupedProducts = groupByCategory(products);
  return (
    <div>
      {Object.keys(groupedProducts).map((category, index) => (
        <Category
          categoryId={false}
          key={category}
          title={category}
          products={groupedProducts[category]}
        />
      ))}
    </div>
  );
};

export default CategoryItems;
