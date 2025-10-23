import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const imageCache = new Map();

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

function ProductThumb({ id, name, fallbackImage }) {
  const [src, setSrc] = useState(imageCache.get(id) || null);

  useEffect(() => {
    let active = true;
    if (imageCache.has(id)) return;
    (async () => {
      try {
        const res = await fetch(`http://localhost:4002/images?id=${id}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (active && data && data.file) {
          const img = `data:image/jpeg;base64,${data.file}`;
          imageCache.set(id, img);
          setSrc(img);
        }
      } catch {
        const fb = fallbackImage || "/default-product.png";
        imageCache.set(id, fb);
        if (active) setSrc(fb);
      }
    })();
    return () => { active = false; };
  }, [id, fallbackImage]);

  return (
    <img
      src={src || fallbackImage || "/default-product.png"}
      alt={name}
      className="h-16 w-16 object-cover rounded-md border border-gray-300 bg-white"
      onError={(e) => (e.currentTarget.src = "/default-product.png")}
    />
  );
}

// 👇 Acepta user como prop (como en AddProducts)
export default function Card({ user }) {
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
  }, []);

  const formatPrice = (value) =>
    parseArCurrency(value).toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
    });

  const total = cart.reduce(
    (acc, item) => acc + parseArCurrency(item.price) * (item.qty || 0),
    0
  );

  const removeItem = (id) => {
    const updated = cart.filter((x) => x.id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const handleConfirm = () => {
    if (!cart.length) return;
    setError(null);
    setShowPayment(true);
  };

  const getToken = () => {
    // 1) prop user.token (igual a AddProducts)
    let t = user?.token;

    // 2) fallback: user en localStorage (si guardás el user entero)
    if (!t) {
      const rawUser = localStorage.getItem("user");
      if (rawUser) {
        try {
          const u = JSON.parse(rawUser);
          t = u?.token;
        } catch (err) {
          console.warn("Error leyendo token del localStorage:", err);
        }
      }
    }

    // 3) fallback: "token" suelto
    if (!t) t = localStorage.getItem("token");

    // Limpia comillas accidentales y espacios
    if (typeof t === "string") t = t.replace(/^"(.*)"$/, "$1").trim();

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
        operationDetails: cart.map((i) => ({
          productId: i.id,
          quantity: i.qty,
        })),
        payMethod, // "TRANSFER" | "MERCADO_PAGO" | "CREDIT" | "DEBIT"
      };

      const res = await fetch("http://localhost:4002/operations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ mismo formato que AddProducts
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        console.error("POST /operations", res.status, text);
        if (res.status === 401) throw new Error("Sesión inválida o vencida.");
        if (res.status === 403) throw new Error("No tenés permisos para comprar.");
        throw new Error("Error al confirmar la compra.");
      }

      alert("✅ Compra confirmada correctamente");
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
      <h1 className="text-3xl font-bold text-red-600 mb-8 text-center">
        Tu carrito de compras
      </h1>

      {!cart.length ? (
        <div className="text-center mt-16">
          <p className="text-gray-500 mb-4 text-lg">Tu carrito está vacío 😢</p>
          <button
            onClick={() => navigate("/products")}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded font-semibold transition-colors"
          >
            Ir a productos
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <section className="lg:col-span-2 bg-white rounded-2xl shadow-md p-6 space-y-4 border border-gray-200">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-200 hover:border-red-400 transition-colors"
              >
                <div className="flex items-center gap-4 w/full sm:w-auto">
                  <ProductThumb
                    id={item.id}
                    name={item.name}
                    fallbackImage={item.image}
                  />
                  <div>
                    <p className="font-semibold text-lg">{item.name}</p>
                    <p className="text-gray-500">
                      {formatPrice(parseArCurrency(item.price))}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-3 sm:mt-0">
                  <span className="bg-white border border-gray-300 rounded-md px-3 py-1 text-gray-700">
                    Cantidad: {item.qty}
                  </span>
                  <span className="font-semibold text-lg w-28 text-right text-gray-800">
                    {formatPrice(parseArCurrency(item.price) * item.qty)}
                  </span>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-600 hover:underline text-sm font-medium"
                  >
                    Quitar
                  </button>
                </div>
              </div>
            ))}
          </section>

          <aside className="bg-white rounded-2xl shadow-md p-6 border border-gray-200 h-fit">
            <h2 className="text-2xl font-semibold mb-6 text-center text-red-600">
              Resumen del pedido
            </h2>

            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between border-b border-gray-200 pb-1 text-gray-700"
              >
                <span className="truncate w-2/3">
                  {item.name} × {item.qty}
                </span>
                <span>
                  {formatPrice(parseArCurrency(item.price) * item.qty)}
                </span>
              </div>
            ))}

            <div className="border-t border-gray-300 mt-6 pt-4 flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-red-600">{formatPrice(total)}</span>
            </div>

            {error && (
              <p className="mt-3 text-sm text-red-600 text-center">{error}</p>
            )}

            <button
              onClick={handleConfirm}
              className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition-colors"
            >
              Confirmar pedido
            </button>

            <button
              onClick={() => navigate("/products")}
              className="mt-3 w-full text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
            >
              ← Seguir comprando
            </button>
          </aside>
        </div>
      )}

      {showPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl border border-gray-200">
            <h3 className="text-xl font-semibold text-center text-red-600">
              Elegí un método de pago
            </h3>

            <div className="mt-5">
              <label className="block text-sm text-gray-600 mb-1">
                Método de pago
              </label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-300"
                value={payMethod}
                onChange={(e) => setPayMethod(e.target.value)}
              >
                <option value="">Seleccioná...</option>
                <option value="TRANSFER">TRANSFERENCIA</option>
                <option value="MERCADO_PAGO">MERCADO PAGO</option>
                <option value="CREDIT">CRÉDITO</option>
                <option value="DEBIT">DÉBITO</option>
              </select>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowPayment(false)}
                className="flex-1 border border-gray-300 text-gray-700 rounded-lg py-2 hover:bg-gray-50"
                disabled={opLoading}
              >
                ← Volver
              </button>
              <button
                onClick={handleSubmitOperation}
                disabled={!payMethod || opLoading}
                className={`flex-1 bg-red-600 hover:bg-red-700 text-white rounded-lg py-2 font-semibold transition-colors ${
                  (!payMethod || opLoading) ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                {opLoading ? "Enviando..." : "Confirmar compra"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
