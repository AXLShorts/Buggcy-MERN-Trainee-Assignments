import useCart from "../../hooks/useCart";
import { Link } from "react-router-dom";
import { Trash } from "lucide-react";

const Cart = () => {
  const cart = useCart((state) => state.cart);
  const removeFromCart = useCart((state) => state.removeFromCart);
  const updateQuantity = useCart((state) => state.updateQuantity);

  const cartItemsLength = cart.length;

  const handleIncrement = (productId, currentQuantity) => {
    updateQuantity(productId, currentQuantity + 1);
  };
  const handleDecrement = (productId, currentQuantity) => {
    if (currentQuantity > 1) {
      updateQuantity(productId, currentQuantity - 1);
    } else {
      removeFromCart(productId);
    }
  };
  const handleChange = (productId, e) => {
    const quantity = parseInt(e.target.value, 10);
    if (!isNaN(quantity) && quantity > 0) {
      updateQuantity(productId, quantity);
    } else if (quantity === 0) {
      removeFromCart(productId);
    }
  };

  return (
    <div className="flex flex-col w-full basis-2/3">
      <div className="flex justify-between p-4 items-center border-b-2 border-gray-200 px-4 2xl:px-0">
        <h2 className="font-bold text-2xl">Shopping Cart</h2>
        <h3 className="font-semibold text-xl">{cartItemsLength} Items</h3>
      </div>
      <div className="w-full">
        <table className="w-full">
          <thead>
            <tr className="text-sm">
              <th className="py-4 px-2">Product</th>
              <th className="px-8 md:table-cell hidden">Quantity</th>
              <th className="px-8 md:table-cell hidden">Total</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.product.id} className="text-center">
                <td className="p-2 text-left">
                  <div className="flex gap-2 w-full">
                    <div className="min-w-24 w-36 my-auto">
                      <Link to={`/products/${item.product.id}`}>
                        <img
                          src={item.product.image}
                          alt=""
                          className="object-contain w-full max-h-36"
                        />
                      </Link>
                    </div>
                    <div className="flex flex-col gap-1 md:gap-2 w-full">
                      <h5 className="capitalize font-semibold text-base text-gray-600 hidden sm:flex">
                        {item.product.category}
                      </h5>
                      <Link
                        to={`/products/${item.product.id}`}
                        className="hover:text-[#6c6c6c] font-semibold text-base sm:text-lg md:text-xl truncate-2-lines"
                      >
                        {item.product.title}
                      </Link>
                      <div>
                        <h4 className="hidden md:flex">
                          ${item.product.price}
                        </h4>
                        <div className="md:hidden flex my-4">
                          <div>
                            $ {(item.quantity * item.product.price).toFixed(2)}
                          </div>

                          <div className="relative flex ml-auto">
                            <button
                              className="text-lg px-2"
                              onClick={() => {
                                handleDecrement(item.product.id, item.quantity);
                              }}
                            >
                              -
                            </button>
                            <input
                              type="number"
                              className="max-w-16 no-arrows text-center"
                              value={item.quantity}
                              onChange={(e) => {
                                handleChange(item.product.id, e);
                              }}
                            />
                            <button
                              className="text-lg px-2"
                              onClick={() => {
                                handleIncrement(item.product.id, item.quantity);
                              }}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                      <button
                        className="w-fit flex gap-1 text-red-500 mt-auto mb-2"
                        onClick={() => {
                          removeFromCart(item.product.id);
                        }}
                      >
                        <Trash stroke="#EF4444" className="w-5 h-5" />
                        <p className="text-sm">Remove</p>
                      </button>
                    </div>
                  </div>
                </td>
                <td className=" md:table-cell hidden">
                  <div className="flex justify-center w-full">
                    <div className="relative flex mx-auto">
                      <button
                        className="text-lg px-2"
                        onClick={() => {
                          handleDecrement(item.product.id, item.quantity);
                        }}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        className="max-w-16 no-arrows text-center"
                        value={item.quantity}
                        onChange={(e) => {
                          handleChange(item.product.id, e);
                        }}
                      />
                      <button
                        className="text-lg px-2"
                        onClick={() => {
                          handleIncrement(item.product.id, item.quantity);
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </td>

                <td className=" md:table-cell hidden">
                  $ {(item.product.price * item.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cart;
