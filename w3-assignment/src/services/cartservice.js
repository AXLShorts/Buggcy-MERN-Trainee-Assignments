import axios from "axios";

export const addToCartService = async (product, quantity = 1) => {
  const response = await axios.post("https://fakestoreapi.com/carts", {
    userId: 5,
    date: "2020-02-03",
    products: [{ productId: product.id, quantity: quantity }],
  });
  return response;
};

export const updateCartService = async (productId, quantity) => {
  const { response, error } = await axios.put(
    "https://fakestoreapi.com/carts/5",
    {
      userId: 5,
      date: "2020-02-03",
      products: [{ productId: productId, quantity: quantity }],
    }
  );
  return { response, error };
};

export const removeFromCartService = async (cart, productId) => {
  const { response, error } = await axios.put(
    "https://fakestoreapi.com/carts/5",
    {
      products: cart.filter((item) => item.product.id !== productId),
    }
  );
  return { response, error };
};
