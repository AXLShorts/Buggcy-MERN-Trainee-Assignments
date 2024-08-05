import { useState } from "react";
import { useFormik } from "formik";
import { initialValues } from "./initialValues";
import { validationSchema } from "./formValidation";

const OrderForm = () => {
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const handleFormSubmit = (values) => {
    console.log("Form values:", values);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleFormSubmit,
  });

  return (
    <div className="w-full mx-auto border p-4 shadow">
      <div className="w-full  pb-8 text-xl font-semibold">
        Shipping & Billing
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col md:flex-row md:flex-wrap gap-2"
      >
        <div className="mb-4 md:w-[calc(50%-4px)]">
          <label htmlFor="name" className="block text-gray-700">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="mt-1 block w-full px-3 py-2 border rounded-lg border-gray-300 "
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-red-500 text-sm">{formik.errors.name}</div>
          ) : null}
        </div>

        <div className="mb-4 md:w-[calc(50%-4px)]">
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500 text-sm">{formik.errors.email}</div>
          ) : null}
        </div>

        <div className="mb-4 md:w-[calc(50%-4px)]">
          <label htmlFor="phone" className="block text-gray-700">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="text"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
          />
          {formik.touched.phone && formik.errors.phone ? (
            <div className="text-red-500 text-sm">{formik.errors.phone}</div>
          ) : null}
        </div>

        <div className="mb-4 md:w-[calc(50%-4px)]">
          <label htmlFor="address" className="block text-gray-700">
            Address
          </label>
          <input
            id="address"
            name="address"
            type="text"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.address}
          />
          {formik.touched.address && formik.errors.address ? (
            <div className="text-red-500 text-sm">{formik.errors.address}</div>
          ) : null}
        </div>

        <div className="mb-4 w-full">
          <label className="block text-gray-700">Payment Method</label>
          <div className="mt-1 flex flex-wrap gap-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="COD"
                checked={formik.values.paymentMethod === "COD"}
                onChange={(e) => {
                  formik.handleChange(e);
                  setPaymentMethod(e.target.value);
                }}
                className="form-radio"
              />
              <span className="ml-2">Cash on Delivery</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="CreditCard"
                checked={formik.values.paymentMethod === "CreditCard"}
                onChange={(e) => {
                  formik.handleChange(e);
                  setPaymentMethod(e.target.value);
                }}
                className="form-radio"
              />
              <span className="ml-2">Credit Card</span>
            </label>
          </div>
        </div>

        {paymentMethod === "CreditCard" && (
          <>
            <div className="mb-4 md:w-[calc(50%-4px)]">
              <label htmlFor="cardNumber" className="block text-gray-700">
                Card Number
              </label>
              <input
                id="cardNumber"
                name="cardNumber"
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.cardNumber}
              />
              {formik.touched.cardNumber && formik.errors.cardNumber ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.cardNumber}
                </div>
              ) : null}
            </div>

            <div className="mb-4 md:w-[calc(25%-8px)]">
              <label htmlFor="cardExpiry" className="block text-gray-700">
                Expiry Date
              </label>
              <input
                id="cardExpiry"
                name="cardExpiry"
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.cardExpiry}
              />
              {formik.touched.cardExpiry && formik.errors.cardExpiry ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.cardExpiry}
                </div>
              ) : null}
            </div>

            <div className="mb-4 md:w-[calc(25%-4px)]">
              <label htmlFor="cardCVV" className="block text-gray-700">
                CVV
              </label>
              <input
                id="cardCVV"
                name="cardCVV"
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.cardCVV}
              />
              {formik.touched.cardCVV && formik.errors.cardCVV ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.cardCVV}
                </div>
              ) : null}
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default OrderForm;
