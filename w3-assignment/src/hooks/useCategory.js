import useSWR from "swr";

const useCategory = ({ categoryName }) => {
  const { data, error } = useSWR(`products/category/${categoryName}`);
  return {
    categoryData: data,
    categoryLoading: !error && !data,
    categoryError: error,
  };
};

export default useCategory;
