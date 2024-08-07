import Shipping from "../../components/Cart/Shipping";
import Cart from "../../components/Cart/Cart";
import useCart from "../../hooks/useCart";
import { Link } from "react-router-dom";

const CartPage = () => {
  const cart = useCart((state) => state.cart);
  return (
    <header>
      <div className="pt-24 max-w-screen-2xl w-full mx-auto px-2 2xl:px-0">
        {cart.length > 0 ? (
          <div className="flex flex-col lg:flex-row mt-0 xl:mt-24 gap-4">
            <Cart />
            <div className="basis-1/3">
              <Shipping />
            </div>
          </div>
        ) : (
          <div>
            <div className="text-center  p-16 sm:p-32 flex flex-col gap-8">
              <p className=" font-bold text-xl sm:text-4xl">
                Your Cart is Empty{" "}
              </p>
              <Link
                to="/"
                className="no-underline text-blue-500 flex mx-auto gap-2"
              >
                <p className="hidden sm:flex">&larr;</p> Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default CartPage;
