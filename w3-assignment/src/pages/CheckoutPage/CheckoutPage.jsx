import OrderForm from "../../components/OrderForm/OrderForm";
import Shipping from "../../components/Cart/Shipping";
import { useParams } from "react-router";

const CheckoutPage = () => {
  const { checkout, shippingCost, discount } = useParams();

  return (
    <header className="max-w-screen-2xl w-full mx-auto">
      <div className="pt-24 flex flex-col md:flex-row">
        <div className="flex basis-2/3 bg-purple-100">
          <OrderForm />
        </div>
        <div className="basis-1/3 bg-purple-200">
          <Shipping
            checkout={checkout}
            shippingCost={shippingCost}
            discounted={discount}
          />
        </div>
      </div>
    </header>
  );
};

export default CheckoutPage;
