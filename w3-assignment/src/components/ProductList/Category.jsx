/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import RatingStars from "./RatingStar/RatingStar";
import useCart from "../../hooks/useCart";

const Category = ({ title, products, categoryId }) => {
  const addToCart = useCart((state) => state.addToCart);

  return (
    <div>
      <div className="flex flex-col gap-4">
        <h2
          id={categoryId ? title : null}
          className="text-4xl font-extrabold capitalize text-center"
        >
          {title}
        </h2>
        <div className="flex flex-wrap justify-center gap-y-4">
          {products.map((product) => (
            <div key={product.id} className="flex justify-center p-2">
              <div className="overflow-hidden flex flex-col w-36 sm:w-64 gap-2 bg-white border shadow-md hover:shadow-xl transition-all duration-300 rounded-lg">
                <Link
                  to={`/products/${product.id}`}
                  className="w-full h-auto aspect-square overflow-hidden flex justify-center p-4 hover:pt-2 transition-all duration-300"
                >
                  <img
                    src={product.image}
                    alt=""
                    className="object-contain h-24 sm:h-52 w-auto aspect-auto"
                  />
                </Link>
                <Link to={`/products/${product.id}`}>
                  <h4 className="text-sm sm:text-base font-bold sm:min-h-[48px] hover:text-[#414141] px-4 truncate-2-lines">
                    {product.title}
                  </h4>
                </Link>
                <div className="px-4">
                  <RatingStars
                    rating={product.rating.rate}
                    totalRatings={product.rating.count}
                  />
                </div>
                <p className="font-medium px-4 text-sm sm:text-base">
                  ${product.price}
                </p>
                <button
                  onClick={() => {
                    addToCart(product, 1);
                  }}
                  className="bg-[#160d0f] relative text-white p-2 hover:text-lg hover:p-1.5"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
