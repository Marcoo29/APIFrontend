import { useState } from "react";

const Card = ({ id, title, price, image }) => {
  const [cantidad, setCantidad] = useState(1);

  const aumentar = () => setCantidad((prev) => Math.min(prev + 1, 99));
  const disminuir = () => setCantidad((prev) => Math.max(prev - 1, 1));

  // 🔹 Formatear precio con separadores de miles (formato argentino)
  const formattedPrice =
    typeof price === "number"
      ? price.toLocaleString("es-AR")
      : price?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return (
    <div className="w-full max-w-sm bg-white border border-gray-300 rounded-none shadow-sm hover:shadow-md hover:border-red-600 hover:shadow-red-200 transition-all duration-200 font-display">
      {/* Imagen */}
      <a href={`/products/${id}`}>
        <div className="bg-gray-50 flex justify-center items-center h-60 overflow-hidden">
          <img
            src={image || "https://via.placeholder.com/300x220?text=Producto"}
            alt={title || "Producto"}
            className="object-contain h-full p-4"
          />
        </div>
      </a>

      {/* Contenido */}
      <div className="px-5 py-4 flex flex-col items-center">
        {/* Título */}
        <a href={`/products/${id}`}>
          <h5 className="text-lg font-semibold tracking-tight text-gray-900 hover:text-red-600 transition-colors duration-200 text-center mb-2 line-clamp-2">
            {title || "Producto de ejemplo"}
          </h5>
        </a>

        {/* Precio */}
        <span className="text-2xl font-bold text-gray-900 mb-3">
          ${formattedPrice ?? "0"}
        </span>

        {/* Controles */}
        <div className="flex items-center justify-center gap-3 w-full">
          {/* Selector de cantidad */}
          <div className="flex items-center border border-gray-300 rounded-none px-2 py-1 text-sm text-gray-800">
            <button
              onClick={disminuir}
              className="px-1 text-gray-500 hover:text-red-600 transition"
            >
              −
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

          {/* Botón agregar con ícono de carrito */}
          <button
            className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white py-2 text-sm font-semibold hover:bg-red-700 transition-colors duration-300"
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
