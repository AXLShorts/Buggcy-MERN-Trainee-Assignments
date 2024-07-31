import ErrorRoot from "./pages/ErrorPages/ErrorRoot/ErrorRoot.jsx";
import Home from "./pages/Home/Home.jsx";
import { useRoutes } from "react-router-dom";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll();
    })();
  }, []);
  const routes = useRoutes([
    { path: "/", element: <Home />, errorElement: <ErrorRoot /> },
  ]);

  return routes;
};

export default App;
