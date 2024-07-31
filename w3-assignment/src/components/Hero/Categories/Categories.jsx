import useSWR from "swr";

const Categories = () => {
  const { data } = useSWR("/products/categories");
  return (
    <div className="max-w-screen-2xl w-full">
      <div>{data}</div>
    </div>
  );
};

export default Categories;
