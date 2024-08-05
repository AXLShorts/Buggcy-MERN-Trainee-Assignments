import useSWR from "swr";

const useProducts = ({ single, category }) => {
  const { data, error } = useSWR(
    single
      ? `products/${single}`
      : category
      ? `products/category/${category}`
      : "products"
  );
  return {
    products: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useProducts;
