import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // 🔹 Cargar carrito desde localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(stored);
  }, []);

  // 🔹 Eliminar producto
  const removeItem = (id) => {
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  // 🔹 Formatear precios (con separadores argentinos)
  const formatPrice = (value) =>
    value.toLocaleString("es-AR", { style: "currency", currency: "ARS" });

  // 🔹 Calcular total
  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  // 🔹 Enviar pedido al backend
  const handleConfirm = async () => {
    if (cart.length === 0) return;

    setLoading(true);
    setError(null);

    try {
      const body = {
        items: cart.map((item) => ({
          productId: item.id,
          quantity: item.qty,
        })),
      };

      const res = await fetch("http://localhost:8080/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Error al confirmar el pedido");

      const data = await res.json();
      console.log("Pedido enviado ✅", data);

      alert("✅ Pedido confirmado correctamente");
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/home");
    } catch (err) {
      console.error(err);
      setError("No se pudo confirmar el pedido. Intente más tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white text-gray-900 pt-24 px-6 md:px-16 lg:px-32">
      <h1 className="text-3xl font-bold text-red-600 mb-8 text-center">
        Tu carrito de compras
      </h1>

      {cart.length === 0 ? (
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
          {/* 🧾 Lista de productos */}
          <section className="lg:col-span-2 bg-white rounded-2xl shadow-md p-6 space-y-4 border border-gray-200">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-200 hover:border-red-400 transition-colors"
              >
                {/* Imagen + datos */}
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <img
                    src={
                      item.image && item.image.trim() !== ""
                        ? item.image
                        : "/default-product.png"
                    }
                    alt={item.name}
                    className="h-16 w-16 object-cover rounded-md border border-gray-300"
                    onError={(e) => {
                      e.target.src = "/default-product.png";
                    }}
                  />
                  <div>
                    <p className="font-semibold text-lg">{item.name}</p>
                    <p className="text-gray-500">{formatPrice(item.price)}</p>
                  </div>
                </div>

                {/* Cantidad + subtotal + eliminar */}
                <div className="flex items-center gap-4 mt-3 sm:mt-0">
                  <span className="bg-white border border-gray-300 rounded-md px-3 py-1 text-gray-700">
                    Cantidad: {item.qty}
                  </span>

                  <span className="font-semibold text-lg w-24 text-right text-gray-800">
                    {formatPrice(item.price * item.qty)}
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

          {/* 💰 Resumen */}
          <aside className="bg-white rounded-2xl shadow-md p-6 border border-gray-200 h-fit">
            <h2 className="text-2xl font-semibold mb-6 text-center text-red-600">
              Resumen del pedido
            </h2>

            <div className="space-y-3 text-gray-700">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between border-b border-gray-200 pb-1"
                >
                  <span className="truncate w-2/3">
                    {item.name} × {item.qty}
                  </span>
                  <span>{formatPrice(item.price * item.qty)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-300 mt-6 pt-4 flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-red-600">{formatPrice(total)}</span>
            </div>

            {error && (
              <p className="mt-3 text-sm text-red-600 text-center">{error}</p>
            )}

            <button
              onClick={handleConfirm}
              disabled={loading}
              className={`mt-6 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition-colors ${
                loading ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Confirmando..." : "Confirmar pedido"}
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
    </main>
  );
}