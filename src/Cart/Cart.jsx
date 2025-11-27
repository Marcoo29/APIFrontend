import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import CartList from "./CartList";
import CartSummary from "./CartSummary";

import {
  increaseQty,
  decreaseQty,
  removeItem,
  clearCart,
} from "../redux/cartSlice";

import { createOperation } from "../redux/operationSlice";


// ======================================================
// 🔥 Función para parsear moneda AR — EXACTA como la tuya
// ======================================================
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

function formatPrice(value) {
  return parseArCurrency(value).toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
  });
}
// ======================================================


export default function Cart({ onCartChange }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 🔹 Carrito desde Redux
  const cart = useSelector((state) => state.cart.items);

  // 🔹 Estado global del POST de operaciones
  const opLoading = useSelector((state) => state.operations.loading);
  const opError = useSelector((state) => state.operations.error);

  // 🔹 Estado interno
  const [localError, setLocalError] = useState(null);
  const [payMethod, setPayMethod] = useState("");

  const userId = Number(localStorage.getItem("userId")) || 1;

  // 🔹 Actualiza badge si lo usás
  useEffect(() => {
    if (onCartChange) onCartChange(cart.length);
  }, [cart.length]);

  // 🔹 Total
  const total = cart.reduce(
    (acc, item) => acc + parseArCurrency(item.price) * (item.qty || 1),
    0
  );

  // 🔹 Token del usuario
  const getToken = () => {
    let t = JSON.parse(localStorage.getItem("user") || "{}")?.token;
    if (!t) t = localStorage.getItem("token");
    return t || null;
  };

  // ======================================================
  // 🔥 Confirmar compra usando Redux
  // ======================================================
  const handleSubmit = async () => {
    if (!cart.length) return;

    if (!payMethod) {
      setLocalError("Elegí un método de pago.");
      return;
    }

    const token = getToken();
    if (!token) {
      setLocalError("Tenés que iniciar sesión.");
      return;
    }

    setLocalError(null);

    try {
      await dispatch(
        createOperation({
          userId,
          payMethod,
          cart,
          token,
        })
      ).unwrap();

      dispatch(clearCart());
      navigate("/order-success");
    } catch (err) {
      setLocalError(err.message);
    }
  };

  // ======================================================


  return (
    <main className="min-h-screen bg-white pt-24 px-6 md:px-16 lg:px-32">
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
            
            {/* Lista de productos */}
            <section className="lg:col-span-2 bg-white rounded-md shadow-md p-6 border border-gray-200">
              <CartList
                cart={cart}
                formatPrice={formatPrice}
                increaseQty={(id) => dispatch(increaseQty(id))}
                decreaseQty={(id) => dispatch(decreaseQty(id))}
                removeItem={(id) => dispatch(removeItem(id))}
                onNavigate={(path) => navigate(path)}
              />
            </section>

            {/* Resumen */}
            <CartSummary
              cart={cart}
              formatPrice={formatPrice}
              total={total}
              error={localError || opError}
              handleConfirm={handleSubmit}
              onNavigate={(path) => navigate(path)}
            />
          </div>
        </>
      )}
    </main>
  );
}
