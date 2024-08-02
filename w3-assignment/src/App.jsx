/* eslint-disable no-unused-vars */
import ErrorRoot from "./pages/ErrorPages/ErrorRoot/ErrorRoot.jsx";
import Home from "./pages/Home/Home.jsx";
import ProductDetailsPage from "./pages/ProductDetailsPage/ProductDetailsPage.jsx";
import { useRoutes } from "react-router-dom";
import { useEffect } from "react";
import CartPage from "./pages/CartPage/CartPage.jsx";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage.jsx";

const App = () => {
  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll();
    })();
  }, []);
  const routes = useRoutes([
    { path: "/", element: <Home />, errorElement: <ErrorRoot /> },
    {
      path: "/products/:productid",
      element: <ProductDetailsPage />,
    },
    {
      path: "/cart",
      element: <CartPage />,
    },
    {
      path: "/checkout",
      element: <CheckoutPage />,
    },
  ]);

  return routes;
};

export default App;
