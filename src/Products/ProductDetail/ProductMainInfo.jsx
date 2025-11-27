export default function ProductMainInfo({
  product,
  cantidad,
  aumentar,
  disminuir,
  agregarAlCarrito,
  userRole,
  mensaje,
}) {
  const price = product.price || 0;

  const cuota3 = (price / 3).toFixed(2);
  const cuota6 = (price / 6).toFixed(2);

  return (
    <div className="bg-white shadow-sm border border-gray-200 overflow-hidden mb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch">

        {/* Imagen ocupando TODO el contenedor */}
        <div className="bg-gray-100 border-r border-gray-200 w-full h-full flex items-center justify-center">
          {product.imageBase64 ? (
            <img
              src={`data:image/jpeg;base64,${product.imageBase64}`}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="text-gray-400 italic text-center">
              Sin imagen disponible
            </div>
          )}
        </div>

        {/* Información */}
        <div className="flex flex-col p-8 justify-between">
          <div>
            <p className="text-sm font-semibold uppercase text-red-600">
              Fabricante: {product.manufacturer}
            </p>

            <h1 className="text-3xl font-bold leading-snug mt-1">
              {product.name}
            </h1>

            <p className="text-sm text-gray-500 mt-2">
              En stock:{" "}
              <span className="font-semibold text-gray-700">
                {product.stock}
              </span>
            </p>

            <hr className="border-red-500 w-full my-4" />

            {/* Precio */}
            <span className="text-4xl font-bold text-gray-900 block mb-4">
              ${price.toLocaleString("es-AR")}
            </span>

            {/* Cuotas */}
            <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
              <p className="text-sm font-semibold text-red-700 mb-1">
                Posibilidad de pago en cuotas:
              </p>

              <p className="text-sm text-gray-800">
                3 cuotas de{" "}
                <span className="font-bold">
                  ${Number(cuota3).toLocaleString("es-AR")}
                </span>
              </p>

              <p className="text-sm text-gray-800">
                6 cuotas de{" "}
                <span className="font-bold">
                  ${Number(cuota6).toLocaleString("es-AR")}
                </span>
              </p>
            </div>

            <p className="text-base text-gray-700 leading-relaxed">
              {product.description || "Sin descripción disponible."}
            </p>
          </div>

          {/* Cantidad y carrito */}
          <div className="pt-6 border-t border-gray-200 mt-6 flex items-center justify-center gap-3 w-full">
            <div className="flex items-center border border-gray-300 px-2 py-3">
              <button onClick={disminuir} className="px-2">–</button>
              <input
                type="number"
                value={cantidad}
                readOnly
                className="w-8 text-center bg-transparent"
              />
              <button onClick={aumentar} className="px-2">+</button>
            </div>

            <button
              onClick={agregarAlCarrito}
              disabled={userRole === "ADMIN"}
              className={`flex-1 flex items-center justify-center gap-2 font-semibold py-3 ${
                userRole === "ADMIN"
                  ? "bg-gray-300 text-gray-500"
                  : "bg-red-500 hover:bg-red-600 text-white"
              }`}
            >
              Agregar al carrito
              <span className="material-symbols-outlined text-sm">
                add_shopping_cart
              </span>
            </button>
          </div>

          {mensaje && (
            <p className="text-green-600 text-sm text-center mt-4">
              {mensaje}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
