import Category from "../ProductList/Category";
import useCategory from "../../hooks/useCategory";
import groupByCategory from "../../utils/groupByCategory";

const CategoryItems = ({ category }) => {
  const { categoryData, categoryLoading, categoryError } = useCategory({
    categoryName: category,
  });

  if (categoryLoading) return <div>Loading...</div>;
  if (categoryError) return <div>Error loading products</div>;

  const groupedProducts = groupByCategory(categoryData);
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
