import useCart from "../../hooks/useCart";
import { useState } from "react";
import { Link } from "react-router-dom";

const Shipping = ({ checkout, shippingCost, discounted }) => {
  const [shipping, setShipping] = useState(80);
  const [discount, setDiscount] = useState(discounted ? discounted : 0);
  const [voucher, setVoucher] = useState("");
  const handleRadioChange = (event) => {
    setShipping(Number(event.target.value));
  };
  const cart = useCart((state) => state.cart);
  const subtotal = cart
    .reduce((acc, item) => acc + item.product.price * item.quantity, 0)
    .toFixed(2);
  const isDisabled = subtotal <= 0;
  return (
    <div className="flex shadow border h-full flex-col">
      <div className="w-full p-4 border text-xl font-semibold">
        Order Summary
      </div>
      <div className="p-4 flex flex-col">
        {!shippingCost && (
          <div className=" flex flex-col gap-2 mb-2">
            <div className="w-full text-lg font-semibold">Shipping</div>
            <label htmlFor="standardShipping">
              <input
                type="radio"
                id="standardShipping"
                name="shippingOption"
                value="80"
                className="w-4"
                checked={shipping === 80}
                onChange={handleRadioChange}
              />
              Standard ($80)
            </label>
            <label htmlFor="fastShipping">
              <input
                type="radio"
                id="fastShipping"
                name="shippingOption"
                value="120"
                className="w-4"
                checked={shipping === 120}
                onChange={handleRadioChange}
              />
              Fast Shipping ($120)
            </label>
          </div>
        )}
        <table>
          <thead>
            <tr>
              <th className="w-full text-left pb-4">Description</th>
              <th>Prices</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Subtotal</td>
              <td className="text-right">${subtotal}</td>
            </tr>
            <tr>
              <td>Shipping</td>
              <td className="text-right">
                ${shippingCost ? shippingCost : shipping}
              </td>
            </tr>
            <tr>
              <td>Tax</td>
              <td className="text-right">${(0.03 * subtotal).toFixed(2)}</td>
            </tr>
            <tr>
              <td>Discount</td>
              <td className="text-right">$ {discount}</td>
            </tr>
            {!checkout && (
              <tr>
                <td>
                  <input
                    type="text"
                    placeholder="Enter Voucher"
                    className="w-[99%] border p-2 my-4"
                    value={voucher}
                    onChange={(e) => setVoucher(e.target.value)}
                  />
                </td>
                <td>
                  <button
                    className="h-full bg-[#0e081b] text-white font-regular p-2 px-4"
                    onClick={() => {
                      if (voucher === "DISCOUNT") {
                        setDiscount(80);
                      }
                    }}
                  >
                    Submit
                  </button>
                </td>
              </tr>
            )}
            <tr className="border border-gray-400 border-x-0 border-b-0">
              <td className="pt-4">Total:</td>
              <td className="text-right">
                $
                {(
                  parseFloat(subtotal) +
                  shipping +
                  0.03 * subtotal -
                  discount
                ).toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
        <button
          disabled={isDisabled}
          className={`p-2 mt-2 w-full flex ${
            isDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-[#0e081b]"
          }`}
        >
          <Link
            to={`/checkout/checkout=true/${shipping}/${discount}`}
            className={`w-full p-2 text-white text-center ${
              isDisabled ? "pointer-events-none" : ""
            }`}
          >
            Proceed To Checkout
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Shipping;
