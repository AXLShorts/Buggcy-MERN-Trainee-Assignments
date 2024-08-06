import { useParams } from "react-router-dom";
import ProductDetail from "../../components/ProductDetail/ProductDetail";
import useProducts from "../../hooks/useProducts";
import CategoryItems from "../../components/ProductDetail/CategoryItems";
import "ldrs/trefoil";

const ProductDetailsPage = () => {
  const { productid } = useParams();
  const { products, isLoading, isError } = useProducts({ single: productid });
  if (isLoading)
    return (
      <div className="pt-48 w-full flex justify-center">
        <l-trefoil
          size="40"
          stroke="4"
          stroke-length="0.15"
          bg-opacity="0.1"
          speed="1.4"
          color="black"
        ></l-trefoil>
      </div>
    );
  if (isError) return <div>Error loading products</div>;

  const category = products.category;

  return (
    <header>
      <ProductDetail productData={products} />
      <CategoryItems category={category} />
    </header>
  );
};

export default ProductDetailsPage;
