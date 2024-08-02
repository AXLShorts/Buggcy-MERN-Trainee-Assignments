import useSWR from "swr";

const useProduct = ({ single }) => {
  const { data, error } = useSWR(`products/${single}`);
  return {
    product: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useProduct;
