import { useParams } from "react-router-dom";
import ProductDetail from "../../components/ProductDetail/ProductDetail";
import useProducts from "../../hooks/useProducts";
import CategoryItems from "../../components/ProductDetail/CategoryItems";

const ProductDetailsPage = () => {
  const { productid } = useParams();
  const { products, isLoading, isError } = useProducts({ single: productid });
  if (isLoading)
    return (
      <div className="flex max-w-screen-2xl pt-24 text-center w-full mx-auto">
        <p className="w-full text-center">Loading...</p>
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
