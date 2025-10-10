import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navigation from "./components/Navigation";
import Landing from "./Landing";
import Products from "./Products/Products";
import Footer from "./components/Footer";
import Login from "./Login/Login";
import Register from "./Login/Register";
import "./index.css"; // Tailwind
import { Routes, Route } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Landing />}/>
        <Route path="/#" element={<Landing />}/>
        <Route path="/home" element={<Landing />}/>
	      <Route path="/products" element={<Products />} />
      </Routes>
    <Footer />
    </>

  );
}

export default App;
