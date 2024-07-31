import useProducts from "../../hooks/useProducts";
import Category from "./Category";
import groupByCategory from "../../utils/groupByCategory";

const ProductList = () => {
  const { products, isLoading, isError } = useProducts();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading products</div>;

  const groupedProducts = groupByCategory(products);

  const categoryNames = Object.keys(groupedProducts);

  return (
    <div className="mt-8 sm:mt-16 max-w-screen-2xl w-full flex flex-col gap-8">
      <div className="px-2 2xl:px-0 w-full gap-2 sm:gap-4 md:gap-6 lg:gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {categoryNames.map((category, index) => (
          <a
            className="text-center text-lg basis-1/4 flex justify-center bg-white py-8 rounded-lg capitalize shadow-md"
            key={index}
            href={`#${category.toLowerCase()}`}
          >
            {category}
          </a>
        ))}
      </div>
      {Object.keys(groupedProducts).map((category, index) => (
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
