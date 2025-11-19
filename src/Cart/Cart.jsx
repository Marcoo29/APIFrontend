import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import PaymentModal from "./PaymentModal";

import { parseArCurrency, formatPrice } from "../utils/CartUtils";

export default function Cart({ user }) {
  const [cart, setCart] = useState([]);
  const [error, setError] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [payMethod, setPayMethod] = useState("");
  const [opLoading, setOpLoading] = useState(false);

  const navigate = useNavigate();
  const userId = Number(localStorage.getItem("userId")) || 1;

  // Load cart
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(stored);
  }, []);

  // Helpers
  const updateCart = (fn) => {
    const updated = fn(cart);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const increaseQty = (id) =>
    updateCart((c) =>
      c.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i))
    );

  const decreaseQty = (id) =>
    updateCart((c) =>
      c.map((i) =>
        i.id === id ? { ...i, qty: Math.max(1, i.qty - 1) } : i
      )
    );

  const removeItem = (id) =>
    updateCart((c) => c.filter((i) => i.id !== id));

  const total = cart.reduce(
    (acc, item) => acc + parseArCurrency(item.price) * item.qty,
    0
  );

  const getToken = () => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    return user?.token || storedUser?.token || localStorage.getItem("token");
  };

  const handleConfirm = () => {
    if (!cart.length) return;
    setError(null);
    setShowPayment(true);
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
        operationDetails: cart.map((i) => ({
          productId: i.id,
          quantity: i.qty,
        })),
        payMethod,
      };

      const res = await fetch("http://localhost:4002/operations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        if (res.status === 401) throw new Error("Sesión inválida o vencida.");
        if (res.status === 403)
          throw new Error("No tenés permisos para comprar.");
        throw new Error("Error al confirmar la compra.");
      }

      alert("Compra confirmada correctamente");
      localStorage.removeItem("cart");
      setCart([]);
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          <section className="lg:col-span-2 bg-white rounded-md shadow-md p-6 space-y-4 border border-gray-200">
            {cart.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                navigate={navigate}
                increaseQty={increaseQty}
                decreaseQty={decreaseQty}
                removeItem={removeItem}
              />
            ))}
          </section>

          <CartSummary
            cart={cart}
            total={total}
            error={error}
            navigate={navigate}
            onConfirm={handleConfirm}
          />
        </div>
      )}

      {showPayment && (
        <PaymentModal
          payMethod={payMethod}
          setPayMethod={setPayMethod}
          opLoading={opLoading}
          setShowPayment={setShowPayment}
          onSubmit={handleSubmitOperation}
        />
      )}
    </main>
  );
}
