import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:4002/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => console.error("Error cargando producto:", err));
  }, [id]);

  if (loading) return <p className="text-center mt-10">Cargando producto...</p>;
  if (!product)
    return <p className="text-center mt-10">Producto no encontrado</p>;

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark font-display text-text-light dark:text-text-dark">
      <main className="flex-grow container mx-auto px-4 lg:px-8 py-8 mt-6">
        <div className="max-w-5xl py-10 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Image */}
            <div
              className="rounded-xl overflow-hidden shadow-sm border border-border-light dark:border-border-dark bg-cover bg-center w-full h-full aspect-square"
              style={{ backgroundImage: `url(${product.image})` }}
            ></div>

            {/* Info */}
            <div className="flex flex-col border border-border-light dark:border-border-dark p-2 rounded-xl">
              <div className="text-lg mb-4 border-b border-red-500 pb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Fabricante: {product.manufacturer}
                </span>
                <h1 className="text-3xl lg:text-4xl font-bold my-2 text-text-light dark:text-text-dark">
                  {product.name}
                </h1>
                <div>
                  <p className="text-sm font-normal text-text-light/70 dark:text-text-dark/70 mt-1">
                    En stock: {product.stock}
                  </p>
                  <p className="text-sm font-normal text-text-light/70 dark:text-text-dark/70 mt-1">
                    Categoria: {product.category.description}
                  </p>
                </div>
              </div>

              {/* Precio y stock */}
              <div className="my-4">
                <span className="text-4xl font-bold text-text-light dark:text-text-dark">
                  ${product.price}
                </span>
              </div>

              <p className="text-base text-text-light/80 dark:text-text-dark/80 leading-relaxed mb-6">
                {product.description}
              </p>

              <div className="mt-auto pt-6 border-t border-border-light dark:border-border-dark">
                <div className="flex items-center gap-4">
                  <button className="w-full flex items-center justify-center gap-2 bg-red-500 text-white font-bold text-xs tracking-wide py-3 squared-md hover:bg-red-600 hover:text-white transition-colors duration-300">
                    AGREGAR AL CARRITO
                    <span className="material-symbols-outlined">
                      add_shopping_cart
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
