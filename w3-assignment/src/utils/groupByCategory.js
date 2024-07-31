const groupByCategory = (products) => {
  return products.reduce((acc, product) => {
    const { category } = product;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {});
};

export default groupByCategory;
