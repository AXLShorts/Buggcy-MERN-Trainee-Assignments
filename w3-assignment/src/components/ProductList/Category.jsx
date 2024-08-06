/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import RatingStars from "./RatingStar/RatingStar";
import useCart from "../../hooks/useCart";
import { Pencil, Trash } from "lucide-react";
import { useState } from "react";
import AddUpdate from "../Global/AddUpdate";
import axios from "axios";
import { addToCartService } from "../../services/cartservice";

const Category = ({ title, products: initialProducts, categoryId }) => {
  const [products, setProducts] = useState(initialProducts);
  const [isOpen, setIsOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const openDialog = (product = null) => {
    setCurrentProduct(product);
    setIsUpdating(!!product);
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
    setCurrentProduct(null);
  };

  const handleFormSubmit = async (values) => {
    if (isUpdating) {
      const response = await axios.put(
        `https://fakestoreapi.com/products/${currentProduct.id}`,
        values
      );
      const updatedProduct = response.data;
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === updatedProduct.id
            ? { ...product, ...updatedProduct }
            : product
        )
      );
    } else {
      const response = await axios.post(
        `https://fakestoreapi.com/products`,
        values
      );
      const newId =
        products[products.length - 1].id === 20
          ? 1
          : products[products.length - 1].id + 1;
      const updatedProduct = {
        ...response.data,
        id: newId,
        rating: { rate: 0, count: 0 },
      };

      console.log(updatedProduct);

      setProducts((prevProducts) => [...prevProducts, updatedProduct]);
    }
  };

  const handleDelete = async (productId) => {
    const response = await axios.delete(
      `https://fakestoreapi.com/products/${productId}`
    );
    const updatedProduct = response.data;
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== updatedProduct.id)
    );
  };

  const handleAddToCart = async (product) => {
    addToCart(product, 1);
    await addToCartService(product);
  };
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
              <div className=" relative group overflow-hidden flex flex-col w-36 sm:w-64 gap-2 bg-white border shadow-md hover:shadow-xl transition-all duration-300 rounded-lg">
                <div className="z-10 absolute top-4 -right-8 sm:top-8 sm:-right-8 group-hover:right-4 sm:group-hover:right-8 transition-all duration-300 flex flex-col gap-4">
                  <button
                    onClick={() => openDialog(product)}
                    className="w-6 h-6 sm:w-8 sm:h-8 bg-black rounded-lg"
                  >
                    <Pencil className="stroke-white p-1.5 w-6 h-6 sm:w-8 sm:h-8 rounded-lg" />
                  </button>
                  <button
                    onClick={() => {
                      handleDelete(product.id);
                    }}
                    className="w-6 h-6 sm:w-8 sm:h-8 bg-black rounded-lg"
                  >
                    <Trash className="  stroke-white p-1.5 w-6 h-6 sm:w-8 sm:h-8 rounded-lg" />
                  </button>
                </div>
                <Link
                  to={`/products/${product.id}`}
                  className=" w-full h-auto aspect-square overflow-hidden flex justify-center p-4 hover:pt-2 transition-all duration-300"
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
                    handleAddToCart(product);
                  }}
                  className="bg-[#160d0f] relative text-white p-2 hover:text-lg hover:p-1.5"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
          <div className="group flex gap-2 text-gray-200 justify-center items-center w-36 sm:w-64 h-[296px] sm:h-[423px] bg-gray-200 rounded-lg m-2">
            <button
              onClick={() => openDialog()}
              className="flex flex-col gap-2 justify-center items-center"
            >
              <div className="text-black text-2xl p-4 rounded-full bg-gray-300 w-16 h-16 flex justify-center items-center">
                +
              </div>
              <p className="hidden group-hover:block group-hover:text-black transition duration-300">
                Add Product
              </p>
            </button>
          </div>
        </div>
      </div>
      <AddUpdate
        isOpen={isOpen}
        initialValues={
          currentProduct || {
            title: "",
            price: "",
            description: "",
            image: "",
            category: title,
            rating: { rate: 0, count: 0 },
          }
        }
        isUpdating={isUpdating}
        onClose={closeDialog}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default Category;
