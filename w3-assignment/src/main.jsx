import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorRoot from "./pages/ErrorPages/ErrorRoot/ErrorRoot.jsx";
import Home from "./pages/Home/Home.jsx";
import { SWRConfig } from "swr";
import axios from "axios";
import api from "./services/apiservice.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorRoot />,
  },
]);

const fetcher = (url) => api.get(url).then((res) => res.data);

ReactDOM.createRoot(document.getElementById("root")).render(
  <SWRConfig value={{ fetcher }}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </SWRConfig>
);
