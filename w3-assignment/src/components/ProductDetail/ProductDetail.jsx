/* eslint-disable react/prop-types */
import RatingStars from "../../components/ProductList/RatingStar/RatingStar";
import useCart from "../../hooks/useCart";
import { useState } from "react";
import { Pencil } from "lucide-react";
import AddUpdate from "../Global/AddUpdate";
import axios from "axios";
import { addToCartService } from "../../services/cartservice";

const ProductDetail = ({ productData: singleProduct }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [productData, setProductData] = useState(singleProduct);
  const addToCart = useCart((state) => state.addToCart);
  const category = productData.category;
  const [quantity, setQuantity] = useState(1);

  const handleChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity > 0 && newQuantity < 11) {
      setQuantity(newQuantity);
    }
  };
  const closeDialog = () => {
    setIsOpen(false);
  };

  const handleFormSubmit = async (values) => {
    const response = await axios.put(
      `https://fakestoreapi.com/products/${productData.id}`,
      values
    );
    const updatedProduct = { ...response.data, rating: productData.rating };
    setProductData(updatedProduct);
  };

  const handleAddToCart = async (product) => {
    addToCart(product, quantity);
    await addToCartService(product, quantity);
  };

  return (
    <div className="py-24 max-w-screen-2xl mx-auto flex flex-col md:flex-row px-4 2xl:px-0 gap-8">
      <AddUpdate
        isOpen={isOpen}
        initialValues={productData}
        isUpdating={true}
        onClose={closeDialog}
        onSubmit={handleFormSubmit}
      />
      <div className="basis-1/2 bg-white rounded-lg flex justify-center items-center">
        <img
          className="w-[70vw] sm:h-[400px] h-auto object-contain "
          src={`${productData.image}`}
        />
      </div>
      <div className="basis-1/2 flex items-center">
        <div className="flex flex-col gap-4 my-auto ">
          <div className="flex flex-col gap-2">
            <div className="group flex justify-between w-full">
              <h3 className="capitalize text-lg font-bold text-slate-700">
                {category}
              </h3>
              <button onClick={() => setIsOpen(true)}>
                <Pencil className="w-7 h-7 p-1 rounded-lg flex hover:bg-gray-500 hover:stroke-white bg-white stroke-black transition-all duration-150" />
              </button>
            </div>
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
                handleAddToCart(productData);
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
