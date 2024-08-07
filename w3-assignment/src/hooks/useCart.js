import { create } from "zustand";

import { devtools, persist } from "zustand/middleware";

const useCartStore = (set) => ({
  cart: [],
  addToCart: (product, quantity) =>
    set((state) => {
      const existingProduct = state.cart.find(
        (item) => item.product.id === product.id
      );
      if (existingProduct) {
        return {
          cart: state.cart.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      } else {
        return { cart: [...state.cart, { product, quantity: quantity }] };
      }
    }),
  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.product.id !== productId),
    })),
  clearCart: () => set({ cart: [] }),
  updateQuantity: (productId, quantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      ),
    })),
});

const useCart = create(
  devtools(
    persist(useCartStore, {
      name: "cartItems",
    })
  )
);

export default useCart;
