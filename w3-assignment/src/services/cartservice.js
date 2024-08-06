import axios from "axios";

export const addToCartService = async (product, quantity = 1) => {
  await axios.post("https://fakestoreapi.com/carts", {
    userId: 5,
    date: "2020-02-03",
    products: [{ productId: product.id, quantity: quantity }],
  });
};

export const updateCartService = async (productId, quantity) => {
  await axios.put("https://fakestoreapi.com/carts/5", {
    userId: 5,
    date: "2020-02-03",
    products: [{ productId: productId, quantity: quantity + 1 }],
  });
};

export const removeFromCartService = async (cart, productId) => {
  await axios.put("https://fakestoreapi.com/carts/5", {
    products: cart.filter((item) => item.product.id !== productId),
  });
};
