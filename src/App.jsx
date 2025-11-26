import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Landing from "./Landing/Landing";
import Products from "./Products/Products";
import Footer from "./Landing/Footer";
import Login from "./Login/Login";
import Register from "./Login/Register";
import Contact from "./components/Contact";
import UserPanel from "./Login/UserPanel";
import "./index.css";
import ScrollToTop from "./components/ScrollToTop";
import AdminPanel from "./AdminPanel/AdminPanel";
import Cart from "./Cart/Cart";
import Operations from "./Operations/Operations";
import OrderSuccess from "./Cart/OrderSuccess";
import Checkout from "./Cart/Checkout";
import ProductDetail from "./Products/ProductDetail/ProductDetail";

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
          <Route path="/category/:categoryName" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<UserPanel />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/adminpanel" element={<AdminPanel />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/operations" element={<Operations />} />

        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
