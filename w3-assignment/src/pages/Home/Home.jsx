import Nav from "../../components/Global/Nav";
import Slider from "../../components/Hero/Slider/Slider";
import ProductList from "../../components/ProductList/ProductList";

const Home = () => {
  return (
    <header className="flex flex-col items-center max-w-screen-2xl mx-auto">
      <Nav />
      <Slider />
      <ProductList />
    </header>
  );
};

export default Home;
