import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { parseArCurrency, formatPrice } from "../utils/ParseCurrency";


export default function Checkout() {
  const [cart, setCart] = useState([]);
  const [payMethod, setPayMethod] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const userId = Number(localStorage.getItem("userId")) || null;

  const getToken = () => {
    let token = null;
    const rawUser = localStorage.getItem("user");
    if (rawUser) {
      try {
        const u = JSON.parse(rawUser);
        token = u?.token;
      } catch {}
    }
    if (!token) token = localStorage.getItem("token");
    if (typeof token === "string") token = token.replace(/^"(.*)"$/, "$1").trim();
    return token || null;
  };

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(stored);
  }, []);

  const total = cart.reduce(
    (acc, i) => acc + parseArCurrency(i.price) * (i.qty || 0),
    0
  );

  const handleSubmit = async () => {
    if (!payMethod) {
      setError("Elegí un método de pago.");
      return;
    }

    if (!userId) {
      setError("Tenés que iniciar sesión.");
      return;
    }

    const token = getToken();
    if (!token) {
      setError("Sesión inválida. Volvé a iniciar sesión.");
      return;
    }

    setLoading(true);
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

      if (!res.ok) {
        const txt = await res.text();
        console.error("POST /operations ERROR:", res.status, txt);
        throw new Error("No se pudo registrar la compra.");
      }

      localStorage.removeItem("cart");
      navigate("/order-success");
    } catch (err) {
      setError(err.message || "Error al procesar la compra.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white pt-24 px-6 md:px-16 lg:px-32">
      <h1 className="text-3xl font-bold text-center mb-6">Confirmar compra</h1>

      {!cart.length ? (
        <p className="text-center text-gray-600">Tu carrito está vacío.</p>
      ) : (
        <div className="max-w-3xl mx-auto bg-white shadow-md border border-gray-200 p-6 rounded-md">
          <h2 className="text-xl font-semibold mb-4">Productos</h2>

          {cart.map((item) => {
            const priceNumber = parseArCurrency(item.price);
            const subtotal = priceNumber * item.qty;

            return (
              <div key={item.id} className="flex justify-between py-2 border-b">
                <span>
                  {item.name} × {item.qty}
                </span>
                <span>{formatPrice(subtotal)}</span>
              </div>
            );
          })}

          <div className="text-right mt-4 text-2xl font-bold text-red-600">
            Total: {formatPrice(total)}
          </div>

          <h2 className="text-xl font-semibold mt-8">Método de pago</h2>
          <div className="mt-3 space-y-2">
            {["TRANSFER", "MERCADO_PAGO", "CREDIT", "DEBIT"].map((m) => (
              <label key={m} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="pay"
                  value={m}
                  checked={payMethod === m}
                  onChange={(e) => setPayMethod(e.target.value)}
                />
                {m.replace("_", " ")}
              </label>
            ))}
          </div>

          {error && <p className="text-red-600 text-center mt-4">{error}</p>}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`mt-6 w-full py-3 rounded-md text-white font-semibold ${
              loading ? "bg-gray-400" : "bg-red-600 hover:bg-red-500"
            }`}
          >
            {loading ? "Procesando..." : "Finalizar compra"}
          </button>

          <button
            onClick={() => navigate("/cart")}
            className="mt-4 w-full text-red-600 text-sm"
          >
            ← Volver al carrito
          </button>
        </div>
      )}
    </main>
  );
}
