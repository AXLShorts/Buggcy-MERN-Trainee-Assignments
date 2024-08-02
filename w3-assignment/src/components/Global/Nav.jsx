import { Link } from "react-router-dom";
import useCart from "../../hooks/useCart";

const Nav = () => {
  const cartItems = useCart((state) => state.cart);
  const totalQuantity = Array.isArray(cartItems)
    ? cartItems.reduce((total, item) => total + item.quantity, 0)
    : 0;
  return (
    <nav className="w-full  fixed z-10 backdrop-blur-md">
      <div
        style={{ backgroundColor: "rgba(243, 240, 251,0.2)" }}
        className="w-full max-w-screen-2xl mx-auto flex justify-between p-4 border border-t-0 border-r-0 border-l-0 border-b-1 border-[#0e081b]"
      >
        <Link to="/" className="flex items-center">
          <h1 className="font-logo text-4xl font-extrabold text-[#0e081b]">
            Tempest
          </h1>
        </Link>
        <Link to="/cart" className="relative">
          <img src="/assets/cart.webp" alt="" className="w-12 h-12" />
          <div className="absolute px-1 bg-[#ff0000] text-white rounded-full -bottom-1 -right-1 flex justify-center items-center">
            {totalQuantity}
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
