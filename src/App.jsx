import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navigation from "./components/Navigation";
import Landing from "./Landing/Landing";
import Products from "./Products/Products";
import Footer from "./components/Footer";
import Login from "./Login/Login";
import Register from "./Login/Register";
import Contact from "./components/Contact";
import Users from "./Login/Users";
import "./index.css"; // Tailwind
import { Routes, Route } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <Navigation />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/#" element={<Landing />} />
          <Route path="/home" element={<Landing />} />
          <Route path="/products" element={<Products />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<Users />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
