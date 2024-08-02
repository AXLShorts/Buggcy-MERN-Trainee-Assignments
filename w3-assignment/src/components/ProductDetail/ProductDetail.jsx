/* eslint-disable react/prop-types */
import RatingStars from "../../components/ProductList/RatingStar/RatingStar";
import useCart from "../../hooks/useCart";
import { useState } from "react";

const ProductDetail = ({ productData }) => {
  const addToCart = useCart((state) => state.addToCart);
  const category = productData.category;
  const [quantity, setQuantity] = useState(1);

  const handleChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity > 0 && newQuantity < 11) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="py-24 max-w-screen-2xl mx-auto flex flex-col md:flex-row px-4 2xl:px-0 gap-8">
      <div className="basis-1/2 bg-white rounded-lg p-4">
        <img
          className="max-h-[300px] sm:max-h-[400px] object-contain px-16 mx-auto"
          src={`${productData.image}`}
        />
      </div>
      <div className="basis-1/2 flex items-center">
        <div className="flex flex-col gap-4 my-auto ">
          <div className="flex flex-col gap-2">
            <h3 className="capitalize text-lg font-bold text-slate-700">
              {category}
            </h3>
            <h2 className="text-2xl font-bold">{productData.title}</h2>
          </div>
          <div>
            <RatingStars
              rating={productData.rating.rate}
              totalRatings={productData.rating.count}
            />
          </div>
          <p className="font-medium">{productData.description}</p>
          <div className="flex gap-2">
            <div className="flex relative">
              <button
                className="absolute text-lg my-auto left-0 px-3 h-[100%] border-gray-300"
                onClick={() => {
                  if (quantity > 1) {
                    setQuantity(quantity - 1);
                  }
                }}
              >
                <div className="flex justify-center items-center font-regular ">
                  -
                </div>
              </button>
              <input
                type="number"
                min={1}
                max={10}
                step={1}
                value={quantity}
                onChange={handleChange}
                className="text-lg font-regular p-1 border-2 border-gray-300 rounded-lg no-arrows text-center sm:w-36 w-24"
              />
              <button
                className="absolute text-lg my-auto right-0 px-3 h-[100%]  border-gray-300"
                onClick={() => {
                  if (quantity < 10) {
                    setQuantity(quantity + 1);
                  }
                }}
              >
                <div className="flex justify-center items-center font-regular">
                  +
                </div>
              </button>
            </div>
            <button
              onClick={() => {
                addToCart(productData, quantity);
              }}
              className="w-fit px-4 py-2 bg-[#160d0f] text-white rounded-lg"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
