import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Landing from "./Landing/Landing";
import Products from "./Products/Products";
import ProductDetail from "./Products/ProductDetail";
import Footer from "./Landing/Footer";
import Login from "./Login/Login";
import Register from "./Login/Register";
import Contact from "./components/Contact";
import Users from "./Login/Users";
import "./index.css";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <main className="flex-1">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/#" element={<Landing />} />
          <Route path="/home" element={<Landing />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
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
