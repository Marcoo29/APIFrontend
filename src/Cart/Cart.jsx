import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CartList from "./CartList";
import CartSummary from "./CartSummary";

// Función para parsear moneda AR
function parseArCurrency(value) {
  if (typeof value === "number") return value;
  if (!value) return 0;
  let s = String(value).trim();
  s = s.replace(/[^\d.,-]/g, "");
  const hasComma = s.includes(",");
  const hasDot = s.includes(".");
  if (hasComma && hasDot) s = s.replace(/\./g, "").replace(",", ".");
  else if (hasComma && !hasDot) s = s.replace(",", ".");
  else if (!hasComma && hasDot) s = s.replace(/\./g, "");
  const n = Number(s);
  return Number.isFinite(n) ? n : 0;
}

export default function Cart({ onCartChange }) {
  const [cart, setCart] = useState([]);
  const [error, setError] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [payMethod, setPayMethod] = useState("");
  const [opLoading, setOpLoading] = useState(false);

  const navigate = useNavigate();
  const userId = Number(localStorage.getItem("userId")) || 1;

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(stored);
    if (onCartChange) onCartChange(stored.length);
  }, []);

  const formatPrice = (value) =>
    parseArCurrency(value).toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
    });

  const updateCart = (updated) => {
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));

    // 🔥 NECESARIO PARA ACTUALIZAR EL BADGE DEL CARRITO
    window.dispatchEvent(new Event("cartUpdated"));

    if (onCartChange) onCartChange(updated.length);
  };

  const total = cart.reduce(
    (acc, item) => acc + parseArCurrency(item.price) * (item.qty || 1),
    0
  );

  const increaseQty = (id) => {
    const updated = cart.map((item) =>
      item.id === id ? { ...item, qty: (item.qty || 1) + 1 } : item
    );
    updateCart(updated);
  };

  const decreaseQty = (id) => {
    const updated = cart.map((item) =>
      item.id === id ? { ...item, qty: Math.max(1, (item.qty || 1) - 1) } : item
    );
    updateCart(updated);
  };

  const removeItem = (id) => {
    const updated = cart.filter((i) => i.id !== id);
    updateCart(updated);
  };

  const handleConfirm = () => {
    if (!cart.length) return;
    navigate("/checkout");
  };

  const getToken = () => {
    let t = JSON.parse(localStorage.getItem("user") || "{}")?.token;
    if (!t) t = localStorage.getItem("token");
    return t || null;
  };

  const handleSubmitOperation = async () => {
    if (!payMethod) return;

    const token = getToken();
    if (!token) {
      setError("Necesitás iniciar sesión para confirmar la compra.");
      return;
    }

    setOpLoading(true);
    setError(null);

    try {
      const body = {
        userId,
        payMethod,
        date: new Date().toISOString(),
        operationDetails: cart.map((i) => ({
          productId: i.id,
          quantity: i.qty,
        })),
      };

      const res = await fetch("http://localhost:4002/operations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Error al confirmar la compra.");

      alert("Compra confirmada correctamente");
      localStorage.removeItem("cart");
      updateCart([]);
      setShowPayment(false);
      navigate("/home");
    } catch (err) {
      setError(err.message || "No se pudo confirmar la compra.");
    } finally {
      setOpLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white text-gray-900 pt-24 px-6 md:px-16 lg:px-32">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Tu carrito de compras
      </h1>

      {!cart.length ? (
        <div className="text-center mt-16">
          <p className="text-gray-500 mb-4 text-lg">Tu carrito está vacío 😢</p>
          <button
            onClick={() => navigate("/products")}
            className="bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded-md font-semibold transition-colors"
          >
            Ir a productos
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <section className="lg:col-span-2 bg-white rounded-md shadow-md p-6 space-y-4 border border-gray-200">
              <CartList
                cart={cart}
                formatPrice={formatPrice}
                increaseQty={increaseQty}
                decreaseQty={decreaseQty}
                removeItem={removeItem}
                onNavigate={(path) => navigate(path)}
              />
            </section>

            <CartSummary
              cart={cart}
              formatPrice={formatPrice}
              total={total}
              error={error}
              handleConfirm={handleConfirm}
              onNavigate={(path) => navigate(path)}
            />
          </div>
        </>
      )}
    </main>
  );
}
