import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ id, title, price, manufacturer }) => {
  const [cantidad, setCantidad] = useState(1);
  const [mensaje, setMensaje] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const userRole = user?.role || null;

  // ====== TRAER IMAGEN POR PRODUCTO ID ======
  useEffect(() => {
    fetch(`http://localhost:4002/images?id=${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Error al cargar la imagen");
        return res.json();
      })
      .then(data => {
        setImage(`data:image/jpeg;base64,${data.file}`);
      })
      .catch(err => console.error(err));
  }, [id]);

  const aumentar = (e) => {
    e.stopPropagation();
    setCantidad((prev) => Math.min(prev + 1, 99));
  };

  const disminuir = (e) => {
    e.stopPropagation();
    setCantidad((prev) => Math.max(prev - 1, 1));
  };

  const formattedPrice =
    typeof price === "number"
      ? price.toLocaleString("es-AR")
      : price?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  // ============================================================
  // 🚀 AGREGAR AL CARRITO — FIX COMPLETO
  // ============================================================
  const agregarAlCarrito = (e) => {
    e.stopPropagation();
    if (userRole === "ADMIN") return;

    const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingIndex = currentCart.findIndex((item) => item.id === id);

    if (existingIndex !== -1) {
      currentCart[existingIndex].qty += cantidad;
    } else {
      currentCart.push({
        id,
        name: title,
        price,
        manufacturer,
        image,
        qty: cantidad,
      });
    }

    localStorage.setItem("cart", JSON.stringify(currentCart));

    // 🔥 Evento correcto para actualizar navbar y otros componentes
    window.dispatchEvent(new Event("cartUpdated"));

    setMensaje("✅ Producto agregado al carrito");
    setTimeout(() => setMensaje(""), 2000);
  };

  const abrirDetalle = () => {
    navigate(`/products/${id}`);
  };

  return (
    <div
      className="w-full max-w-sm bg-white border border-gray-300 rounded-none shadow-sm hover:shadow-md hover:border-red-600 hover:shadow-red-200 transition-all duration-200 font-display cursor-pointer"
      onClick={abrirDetalle}
    >
      <div className="bg-gray-50 flex justify-center items-center border-b border-gray-200 aspect-square">
        <img
          src={image || "https://via.placeholder.com/300x220?text=Producto"}
          alt={title || "Producto"}
          className="w-full h-full object-contain rounded-none"
          loading="lazy"
        />
      </div>

      <div className="px-5 py-4 flex flex-col items-center">
        <h5
          title={title}
          className="text-lg font-semibold tracking-tight text-gray-900 hover:text-red-600 transition-colors duration-200 text-center mb-1 line-clamp-2 overflow-hidden leading-snug min-h-[48px]"
        >
          {title || "Producto de ejemplo"}
        </h5>

        <p className="text-xs uppercase text-red-600 font-semibold tracking-wide mb-2 text-center">
          {manufacturer || "Sin fabricante"}
        </p>

        <span className="text-2xl font-bold text-gray-900 mb-3">
          ${formattedPrice ?? "0"}
        </span>

        <div
          className="flex items-center justify-center gap-3 w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center border border-gray-300 rounded-none px-2 py-1 text-sm text-gray-800">
            <button
              onClick={disminuir}
              className="px-1 text-gray-500 hover:text-red-600 transition"
            >
              –
            </button>
            <input
              type="number"
              value={cantidad}
              readOnly
              className="w-6 text-center bg-transparent text-gray-800 focus:outline-none"
            />
            <button
              onClick={aumentar}
              className="px-1 text-gray-500 hover:text-red-600 transition"
            >
              +
            </button>
          </div>

          <button
            onClick={agregarAlCarrito}
            disabled={userRole === "ADMIN"}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold transition-colors duration-300 ${
              userRole === "ADMIN"
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-red-600 text-white hover:bg-red-700"
            }`}
          >
            Agregar
            <span className="material-symbols-outlined text-sm">
              add_shopping_cart
            </span>
          </button>
        </div>

        {mensaje && (
          <p className="text-green-600 text-sm mt-3 font-medium animate-fadeIn">
            {mensaje}
          </p>
        )}
      </div>
    </div>
  );
};

export default Card;
