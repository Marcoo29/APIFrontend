import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ id, title, price, image, manufacturer }) => {
  const [cantidad, setCantidad] = useState(1);
  const [imageBase64, setImageBase64] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  // 🔹 Obtener usuario local
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const userRole = user?.role || null;

  // 🔹 Cargar imagen asociada al producto
  useEffect(() => {
    fetch(`http://localhost:4002/images?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.file) setImageBase64(data.file);
      })
      .catch((err) => console.error("Error cargando imagen:", err));
  }, [id]);

  // 🔹 Control de cantidad
  const aumentar = (e) => {
    e.stopPropagation();
    setCantidad((prev) => Math.min(prev + 1, 99));
  };

  const disminuir = (e) => {
    e.stopPropagation();
    setCantidad((prev) => Math.max(prev - 1, 1));
  };

  // 🔹 Formato de precio
  const formattedPrice =
    typeof price === "number"
      ? price.toLocaleString("es-AR")
      : price?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  // 🔹 Agregar producto al carrito
  const agregarAlCarrito = (e) => {
    e.stopPropagation(); // 🔒 evita que abra el ProductDetail
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
        image: imageBase64 || image,
        qty: cantidad,
      });
    }

    localStorage.setItem("cart", JSON.stringify(currentCart));
    window.dispatchEvent(new Event("storage"));

    setMensaje("✅ Producto agregado al carrito");
    setTimeout(() => setMensaje(""), 2000);
  };

  // 🔹 Abrir detalle del producto
  const abrirDetalle = () => {
    navigate(`/products/${id}`);
  };

  return (
    <div
      className="w-full max-w-sm bg-white border border-gray-300 rounded-none shadow-sm hover:shadow-md hover:border-red-600 hover:shadow-red-200 transition-all duration-200 font-display cursor-pointer"
      onClick={abrirDetalle}
    >
      {/* Imagen */}
      <div className="bg-gray-50 flex justify-center items-center border-b border-gray-200 aspect-square">
        {imageBase64 ? (
          <img
            src={`data:image/jpeg;base64,${imageBase64}`}
            alt={title || "Producto"}
            className="w-full h-full object-contain rounded-none"
            loading="lazy"
          />
        ) : (
          <img
            src={image || "https://via.placeholder.com/300x220?text=Producto"}
            alt={title || "Producto"}
            className="w-full h-full object-contain rounded-none"
            loading="lazy"
          />
        )}
      </div>

      {/* Contenido */}
      <div className="px-5 py-4 flex flex-col items-center">
        {/* 🧱 Título */}
        <h5
          title={title}
          className="text-lg font-semibold tracking-tight text-gray-900 hover:text-red-600 transition-colors duration-200 text-center mb-1 line-clamp-2 overflow-hidden leading-snug min-h-[48px]"
        >
          {title || "Producto de ejemplo"}
        </h5>

        {/* Fabricante */}
        <p className="text-xs uppercase text-red-600 font-semibold tracking-wide mb-2 text-center">
          {manufacturer || "Sin fabricante"}
        </p>

        {/* Precio */}
        <span className="text-2xl font-bold text-gray-900 mb-3">
          ${formattedPrice ?? "0"}
        </span>

        {/* Controles y botón */}
        <div
          className="flex items-center justify-center gap-3 w-full"
          onClick={(e) => e.stopPropagation()} // Evita navegación en botones
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

        {/* Mensaje de confirmación */}
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
