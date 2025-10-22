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
import ProtectedRoute from "./Routes/ProtectedRoute"; // ✅ agregado

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <main className="flex-1">
        <ScrollToTop />
        <Routes>
          {/* 🌐 Rutas públicas */}
          <Route path="/" element={<Landing />} />
          <Route path="/#" element={<Landing />} />
          <Route path="/home" element={<Landing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* 🧭 Productos y detalle — visibles solo para usuarios logueados */}
          <Route
            path="/products"
            element={
              <ProtectedRoute allowedRoles={["USER", "ADMIN"]}>
                <Products />
              </ProtectedRoute>
            }
          />
          <Route
            path="/category/:categoryName"
            element={
              <ProtectedRoute allowedRoles={["USER", "ADMIN"]}>
                <Products />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products/:id"
            element={
              <ProtectedRoute allowedRoles={["USER", "ADMIN"]}>
                <ProductDetail />
              </ProtectedRoute>
            }
          />

          {/* 👤 Solo usuarios finales */}
          <Route
            path="/users"
            element={
              <ProtectedRoute allowedRoles={["USER"]}>
                <Users />
              </ProtectedRoute>
            }
          />

          {/* 🛠 Solo administradores */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <div className="flex flex-col items-center justify-center h-[70vh] text-center">
                  <h1 className="text-3xl font-bold text-gray-800 mb-3">
                    Panel de Administración
                  </h1>
                  <p className="text-gray-600">
                    Desde aquí podés gestionar artículos, categorías y pedidos.
                  </p>
                </div>
              </ProtectedRoute>
            }
          />

          {/* 🚫 Página de acceso denegado */}
          <Route
            path="/unauthorized"
            element={
              <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                <h1 className="text-4xl font-bold text-red-600 mb-4">
                  Acceso denegado
                </h1>
                <p className="text-gray-700 text-lg">
                  No tenés permisos para acceder a esta sección.
                </p>
              </div>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
