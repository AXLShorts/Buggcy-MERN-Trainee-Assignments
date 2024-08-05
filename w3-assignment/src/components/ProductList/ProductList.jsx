import useProducts from "../../hooks/useProducts";
import Category from "./Category";
import groupByCategory from "../../utils/groupByCategory";

const ProductList = ({ categoryLink }) => {
  const { products, isLoading, isError } = useProducts({ single: false });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading products</div>;

  const groupedProducts = groupByCategory(products);

  const categoryNames = Object.keys(groupedProducts);

  return (
    <div className="mt-8 sm:mt-16 max-w-screen-2xl w-full flex flex-col gap-8">
      {categoryLink && (
        <div className="px-4 2xl:px-0 w-full gap-2 sm:gap-4 md:gap-6 lg:gap-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 justify center">
          {categoryNames.map((category, index) => (
            <a
              className="text-center text-lg flex justify-center bg-[#cae0e3] py-2 sm:py-8 rounded-lg capitalize shadow-md"
              key={index}
              href={`#${category.toLowerCase()}`}
            >
              <p className="p-1 m-auto">{category}</p>
            </a>
          ))}
        </div>
      )}
      {Object.keys(groupedProducts).map((category, index) => (
        <Category
          categoryId={categoryLink}
          key={category}
          title={category}
          products={groupedProducts[category]}
        />
      ))}
    </div>
  );
};

export default ProductList;
