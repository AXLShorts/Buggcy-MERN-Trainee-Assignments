import OrderForm from "../../components/OrderForm/OrderForm";
import Shipping from "../../components/Cart/Shipping";
import { useParams } from "react-router";
import Cart from "../../components/Cart/Cart";
import useCart from "../../hooks/useCart";
import { useState } from "react";
import { Link } from "react-router-dom";

const CheckoutPage = () => {
  const cart = useCart((state) => state.cart);
  const [checkoutDone, setCheckoutDone] = useState(false);

  const { checkout, shippingCost, discount } = useParams();

  return (
    <header className="pt-24 max-w-screen-2xl w-full mx-auto ">
      {cart.length === 0 && !checkoutDone ? (
        <div className="text-center p-32 flex flex-col gap-4">
          <p className="font-bold text-4xl">Your Cart is Empty</p>
          <Link
            to="/"
            className="no-underline text-blue-500 flex items-center mx-auto"
          >
            &larr; Continue Shopping
          </Link>
        </div>
      ) : checkoutDone ? (
        <div className="text-center p-32 flex flex-col gap-4">
          <p className="font-bold text-4xl">Order Placed Successfully</p>
          <Link
            to="/"
            className="no-underline text-blue-500 flex items-center mx-auto"
          >
            &larr; Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <h2 className="text-2xl md:text-4xl font-bold py-8 px-4">
            Complete Your Order
          </h2>
          <div className="relative w-full flex flex-col-reverse md:flex-col gap-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex basis-2/3">
                <OrderForm checkOutStatus={setCheckoutDone} />
              </div>
              <div className="basis-1/3 ">
                <Shipping
                  checkout={checkout}
                  shippingCost={shippingCost}
                  discounted={discount}
                />
              </div>
            </div>

            <Cart />
          </div>
        </>
      )}
    </header>
  );
};

export default CheckoutPage;
