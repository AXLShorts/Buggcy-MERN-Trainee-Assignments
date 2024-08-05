import OrderForm from "../../components/OrderForm/OrderForm";
import Shipping from "../../components/Cart/Shipping";
import { useParams } from "react-router";
import Cart from "../../components/Cart/Cart";

const CheckoutPage = () => {
  const { checkout, shippingCost, discount } = useParams();

  return (
    <header className="pt-24 max-w-screen-2xl w-full mx-auto ">
      <h2 className="text-2xl md:text-4xl font-bold py-8 px-4">
        Complete Your Order
      </h2>
      <div className="relative w-full flex flex-col-reverse md:flex-col gap-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex basis-2/3">
            <OrderForm />
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
    </header>
  );
};

export default CheckoutPage;
