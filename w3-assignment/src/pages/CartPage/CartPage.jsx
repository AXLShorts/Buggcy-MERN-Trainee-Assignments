import Shipping from "../../components/Cart/Shipping";
import Cart from "../../components/Cart/Cart";

const CartPage = () => {
  return (
    <header>
      <div className="pt-24 max-w-screen-2xl w-full mx-auto px-2 2xl:px-0">
        <div className="flex flex-col lg:flex-row mt-0 xl:mt-24 gap-4">
          <Cart />
          <div className="basis-1/3">
            <Shipping />
          </div>
        </div>
      </div>
    </header>
  );
};

export default CartPage;
