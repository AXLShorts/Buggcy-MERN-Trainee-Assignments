import useSWR from "swr";

const useProducts = () => {
  const { data, error } = useSWR("products");
  return {
    products: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useProducts;
