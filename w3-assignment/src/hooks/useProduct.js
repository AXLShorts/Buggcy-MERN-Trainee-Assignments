import useSWR from "swr";

const useProduct = ({ single }) => {
  if (single) {
    const { data, error } = useSWR(`products/${single}`);
  } else {
    const { data, error } = useSWR("products");
  }
  return {
    product: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useProduct;
