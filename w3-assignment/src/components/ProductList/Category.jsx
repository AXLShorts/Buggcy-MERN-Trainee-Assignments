const Category = ({ title, products }) => {
  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-4xl font-extrabold capitalize">{title}</h2>
      <div>
        {products.map((product) => (
          <div key={product.id}>
            <h3>{product.title}</h3>
            <p>{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
