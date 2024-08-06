import Category from "../ProductList/Category";
import useProducts from "../../hooks/useProducts";
import groupByCategory from "../../utils/groupByCategory";
import "ldrs/trefoil";
import { trefoil } from "ldrs";

const CategoryItems = ({ category }) => {
  const { products, isLoading, isError } = useProducts({
    category: category,
  });

  trefoil.register();

  if (isLoading)
    return (
      <div className="pt-48 mx-auto w-full flex justify-center items-center">
        <l-trefoil
          size="40"
          stroke="4"
          stroke-length="0.15"
          bg-opacity="0.1"
          speed="1.4"
          color="black"
          className="mx-auto"
        ></l-trefoil>
      </div>
    );
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
