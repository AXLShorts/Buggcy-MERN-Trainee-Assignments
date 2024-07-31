import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="flex justify-between p-4 w-full border border-t-0 border-r-0 border-l-0 border-b-1 border-[#0e081b]">
      <Link to="/">
        <h1 className="font-logo text-4xl font-extrabold text-[#0e081b]">
          Tempest
        </h1>
      </Link>
      <button className="relative">
        <img src="src/assets/cart.webp" alt="" className="w-8 h-8" />
        <div className="absolute w-4 h-4 bg-[#ff0000] text-white rounded-full bottom-1 right-0 flex justify-center items-center">
          2
        </div>
      </button>
    </nav>
  );
};

export default Nav;
