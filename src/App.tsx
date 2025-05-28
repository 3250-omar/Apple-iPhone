import Features from "./Components/Features";
import Footer from "./Components/Footer";
import Hero from "./Components/Hero";
import Highlights from "./Components/Highlights";
import HowitWorks from "./Components/HowitWorks";
import Model from "./Components/Model";
import NavBar from "./Components/NavBar";
const App = () => {
  return (
    <main className="bg-black ">
      <NavBar />
      <Hero />
      <Highlights />
      <Model />
      <Features />
      <HowitWorks />
      <Footer/>
    </main>
  );
};

export default App;
