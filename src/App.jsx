import Hero from "./Sheru/Hero";
import Navbar from "./Sheru/Navbar";
import Reviews from "./Sheru/Reviews";
import Sneakers from "./Sheru/Sneaker";
import Trending from "./Sheru/Trending";
import Collections from "./Sheru/Collections";
import Footer from "./Sheru/Footer";
import Banner from "./Sheru/Banner";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <Banner />
      <Hero />
      <Trending />
      <Sneakers />
      <Collections />
      <Reviews />
      <Footer />
    </>
  );
}

export default App;