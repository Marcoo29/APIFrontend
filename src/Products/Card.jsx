import { useState, useEffect } from "react";

const Card = ({ id, title, price, image, manufacturer }) => {
  const [cantidad, setCantidad] = useState(1);
  const [imageBase64, setImageBase64] = useState(null);

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

  const aumentar = () => setCantidad((prev) => Math.min(prev + 1, 99));
  const disminuir = () => setCantidad((prev) => Math.max(prev - 1, 1));

  const formattedPrice =
    typeof price === "number"
      ? price.toLocaleString("es-AR")
      : price?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return (
    <div className="w-full max-w-sm bg-white border border-gray-300 rounded-none shadow-sm hover:shadow-md hover:border-red-600 hover:shadow-red-200 transition-all duration-200 font-display">
      {/* Imagen */}
      <a href={`/products/${id}`}>
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
      </a>

      {/* Contenido */}
      <div className="px-5 py-4 flex flex-col items-center">
        {/* 🧱 Título con altura fija de 2 líneas */}
        <a href={`/products/${id}`}>
          <h5
            title={title} // tooltip completo al pasar el mouse
            className="
              text-lg font-semibold tracking-tight text-gray-900 hover:text-red-600
              transition-colors duration-200 text-center mb-1
              line-clamp-2 overflow-hidden leading-snug min-h-[48px]
            "
          >
            {title || "Producto de ejemplo"}
          </h5>
        </a>

        {/* Fabricante */}
        <p className="text-xs uppercase text-red-600 font-semibold tracking-wide mb-2 text-center">
          {manufacturer || "Sin fabricante"}
        </p>

        {/* Precio */}
        <span className="text-2xl font-bold text-gray-900 mb-3">
          ${formattedPrice ?? "0"}
        </span>

        {/* Controles y botón */}
        <div className="flex items-center justify-center gap-3 w-full">
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

          {/* 🔒 Botón agregar bloqueado para admin */}
          <button
            disabled={userRole === "ADMIN"}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold transition-colors duration-300 ${
              userRole === "ADMIN"
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-red-600 text-white hover:bg-red-700"
            }`}
            title={
              userRole === "ADMIN"
                ? "Los administradores no pueden agregar productos al carrito"
                : "Agregar al carrito"
            }
          >
            Agregar
            <span className="material-symbols-outlined text-sm">
              add_shopping_cart
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
