import Shipping from "../../components/Cart/Shipping";
import Cart from "../../components/Cart/Cart";
import useCart from "../../hooks/useCart";
import ProductList from "../../components/ProductList/ProductList";

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
            <div className="text-center text-xl  sm:text-4xl font-bold p-16 sm:p-32">
              Your Cart is Empty
            </div>
            <ProductList categoryLink={false} />
          </div>
        )}
      </div>
    </header>
  );
};

export default CartPage;
