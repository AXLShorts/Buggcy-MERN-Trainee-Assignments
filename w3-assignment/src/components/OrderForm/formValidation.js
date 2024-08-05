import * as Yup from "yup";

export const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  address: Yup.string().required("Address is required"),
  paymentMethod: Yup.string().required("Payment method is required"),
  cardNumber: Yup.string().when("paymentMethod", {
    is: "CreditCard",
    then: Yup.string()
      .required("Credit card number is required")
      .min(16, "Must be exactly 16 digits")
      .max(16, "Must be exactly 16 digits"),
  }),
  cardExpiry: Yup.string().when("paymentMethod", {
    is: "CreditCard",
    then: Yup.string().required("Expiration date is required"),
  }),
  cardCVV: Yup.string().when("paymentMethod", {
    is: "CreditCard",
    then: Yup.string()
      .required("CVV is required")
      .min(3, "Must be exactly 3 digits")
      .max(3, "Must be exactly 3 digits"),
  }),
});
