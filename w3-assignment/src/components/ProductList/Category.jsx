import { Link } from "react-router-dom";
import RatingStars from "./RatingStar/RatingStar";
import { Plus } from "lucide-react";
import { Eye } from "lucide-react";
import useCart from "../../hooks/useCart";

const Category = ({ title, products }) => {
  const cart = useCart((state) => state.cart);
  const addToCart = useCart((state) => state.addToCart);

  return (
    <div>
      <div className="flex flex-col gap-4">
        <h2
          id={title}
          className="text-4xl font-extrabold capitalize text-center"
        >
          {title}
        </h2>
        <div className="flex flex-wrap justify-center lg:justify-start gap-y-4 gap-x-4 sm:gap-x-0">
          {products.map((product) => (
            <div
              key={product.id}
              className="basis-1/2 md:basis-1/3 xl:basis-1/4 flex justify-center p-2"
            >
              <div className="flex flex-col w-64 gap-2 bg-white border shadow-sm hover:shadow-lg transition-all duration-300 rounded-lg">
                <Link
                  to="#"
                  className="group relative w-full h-auto aspect-square overflow-hidden flex justify-center p-4 hover:pt-2 transition-all duration-300"
                >
                  <img
                    src={product.image}
                    alt=""
                    className="h-52 w-auto aspect-auto"
                  />
                  <div className="absolute top-0 right-[-100%] p-4 flex flex-col gap-4 transition-transform duration-300 transform group-hover:-translate-x-64 group-hover:translate-y-2">
                    <Plus
                      onClick={() => {
                        addToCart(product);
                        console.log(cart);
                      }}
                      className="w-8 h-8 p-1 bg-black text-white"
                    />
                    <Eye
                      onClick={() => {
                        console.log(cart);
                      }}
                      className="w-8 h-8 p-1 bg-black text-white"
                    />
                  </div>
                </Link>
                <Link>
                  <h4 className="font-bold sm:min-h-[48px] hover:text-[#414141] px-4 truncate-2-lines">
                    {product.title}
                  </h4>
                </Link>
                <RatingStars
                  rating={product.rating.rate}
                  totalRatings={product.rating.count}
                />
                <p className="font-medium px-4 pb-4">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
