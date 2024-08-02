import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";

import { SWRConfig } from "swr";
import Nav from "./components/Global/Nav.jsx";
import api from "./services/apiservice.js";
import App from "./App.jsx";

const fetcher = (url) => api.get(url).then((res) => res.data);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SWRConfig
      value={{ fetcher, revalidateOnFocus: true, dedupingInterval: 2000 }}
    >
      <Router>
        <Nav />
        <App />
      </Router>
    </SWRConfig>
  </React.StrictMode>
);
