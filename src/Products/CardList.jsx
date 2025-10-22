import { useEffect, useState } from "react";
import Card from "./Card";

export default function CardList({ products = [], layoutView = "grid" }) {
  const [imagesMap, setImagesMap] = useState({});

  useEffect(() => {
    const fetchImages = async () => {
      const map = {};
      for (const p of products) {
        try {
          const res = await fetch(`http://localhost:4002/images?id=${p.id}`);
          if (res.ok) {
            const data = await res.json();
            if (data.file) {
              map[p.id] = `data:image/jpeg;base64,${data.file}`;
            }
          }
        } catch (err) {
          console.error("Error cargando imagen para producto", p.id, err);
        }
      }
      setImagesMap(map);
    };

    if (products.length > 0) fetchImages();
  }, [products]);

  if (products.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500 font-display">
        No se encontraron productos.
      </div>
    );
  }

  return (
    <div
      className={
        layoutView === "grid"
          ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          : "flex flex-col gap-4"
      }
    >
      {products.map((product) => {
        const formattedPrice =
          typeof product.price === "number"
            ? product.price.toLocaleString("es-AR")
            : product.price;

        const imageUrl =
          imagesMap[product.id] ||
          "https://via.placeholder.com/300x300?text=Producto";

        if (layoutView === "list") {
          return (
            <div
              key={product.id}
              className="flex items-center bg-white border border-gray-200 hover:border-red-500 hover:shadow-md transition-all duration-200 overflow-hidden"
            >
              {/* 🖼 Imagen */}
              <div className="w-48 h-48 flex-shrink-0 bg-gray-50 flex items-center justify-center border-r border-gray-200 overflow-hidden">
                <img
                  src={imageUrl}
                  alt={product.name}
                  className="max-w-full max-h-full object-contain transition-transform duration-300"
                  loading="lazy"
                />
              </div>

              {/* 📋 Info */}
              <div className="flex flex-col justify-between p-5 flex-1">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1 hover:text-red-600 transition-colors cursor-pointer">
                    {product.name}
                  </h3>
                  {product.manufacturer && (
                    <p className="text-sm uppercase text-red-600 font-semibold mb-2">
                      {product.manufacturer}
                    </p>
                  )}
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {product.description || "Sin descripción disponible."}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <span className="text-2xl font-bold text-gray-900">
                    ${formattedPrice}
                  </span>

                  <button
                    className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-sm font-semibold text-sm transition-colors"
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
        }

        // Vista grilla
        return (
          <Card
            key={product.id}
            id={product.id}
            title={product.name}
            price={formattedPrice}
            image={imageUrl}
            manufacturer={product.manufacturer}
          />
        );
      })}
    </div>
  );
}
