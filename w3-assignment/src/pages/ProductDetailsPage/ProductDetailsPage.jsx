import { useParams } from "react-router-dom";
import ProductDetail from "../../components/ProductDetail/ProductDetail";
import useProduct from "../../hooks/useProduct";
import CategoryItems from "../../components/ProductDetail/CategoryItems";

const ProductDetailsPage = () => {
  const { productid } = useParams();
  const { product, isLoading, isError } = useProduct({ single: productid });
  if (isLoading)
    return (
      <div className="flex max-w-screen-2xl pt-24 text-center w-full mx-auto">
        <p className="w-full text-center">Loading...</p>
      </div>
    );
  if (isError) return <div>Error loading products</div>;

  const category = product.category;

  return (
    <header>
      <ProductDetail productData={product} />
      <CategoryItems category={category} />
    </header>
  );
};

export default ProductDetailsPage;
