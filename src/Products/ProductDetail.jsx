import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch(`http://localhost:4002/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);

        fetch(`http://localhost:4002/products?page=0&size=100`)
          .then((res) => res.json())
          .then((all) => {
            const list = all.content || [];
            const filtered = list.filter(
              (p) =>
                p.category?.description === data.category?.description &&
                p.id !== data.id
            );
            setRelatedProducts(filtered.slice(0, 8));
          })
          .catch((err) =>
            console.error("Error cargando productos relacionados:", err)
          );
      })
      .catch((err) => console.error("Error cargando producto:", err));
  }, [id]);

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchTerm.trim() !== "") {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  if (loading) return <p className="text-center mt-10">Cargando producto...</p>;
  if (!product)
    return <p className="text-center mt-10">Producto no encontrado</p>;

  const truncateName = (name) =>
    name && name.length > 25 ? name.slice(0, 25) + "..." : name;

  const categoryName = product.category?.description || "Sin categoría";

  return (
    <div className="min-h-screen flex flex-col bg-[#f6f6f6] font-display text-gray-900 relative">
      <main className="flex-grow container mx-auto px-4 lg:px-8 py-12 mt-10 max-w-6xl relative">
        {/* 🔍 Buscador */}
        <div className="absolute top-[-25px] left-1/2 -translate-x-1/2 w-full max-w-2xl px-6 z-40">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearch}
              className="w-full border border-gray-300 rounded-md py-2.5 pl-10 pr-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent shadow-sm bg-white"
            />
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-400">
              search
            </span>
          </div>
        </div>

        {/* 🔙 Botón Volver atrás */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-600 transition-colors mb-3 mt-4"
        >
          <span className="material-symbols-outlined text-base">arrow_back</span>
          <span className="font-medium">VOLVER ATRÁS</span>
        </button>

        {/* 🧭 Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-4">
          <Link to="/" className="hover:text-red-600 transition-colors">
            Inicio
          </Link>{" "}
          /{" "}
          <Link
            to={`/category/${categoryName.toLowerCase()}`}
            className="hover:text-red-600 transition-colors capitalize"
          >
            {categoryName}
          </Link>{" "}
          /{" "}
          <span className="text-gray-800 font-medium">
            {truncateName(product.name)}
          </span>
        </nav>

        {/* 📦 Ficha principal */}
        <div className="bg-white shadow-sm squared-xl border border-gray-200 overflow-hidden mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* 🖼 Imagen */}
            <div className="flex items-center justify-center bg-gray-100 p-8 border-r border-gray-200">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-[400px] object-contain"
                />
              ) : (
                <div className="text-gray-400 italic">
                  Sin imagen disponible
                </div>
              )}
            </div>

            {/* 📋 Info */}
            <div className="flex flex-col p-8">
              <div className="mb-4">
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
              </div>

              <hr className="border-red-500 w-full my-3" />

              <div className="my-4">
                <span className="text-4xl font-bold text-gray-900">
                  ${product.price?.toLocaleString("es-AR")}
                </span>
              </div>

              <p className="text-base text-gray-700 leading-relaxed mb-6">
                {product.description || "Sin descripción disponible."}
              </p>

              <div className="mt-auto pt-6 border-t border-gray-200">
                <button className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 squared-md transition-colors duration-200">
                  Agregar al carrito
                  <span className="material-symbols-outlined text-sm">
                    add_shopping_cart
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 🧲 Carrusel de productos relacionados */}
        {relatedProducts.length > 0 && (
          <section className="mt-10">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-red-600 tracking-wide mb-2">
                También podría interesarte
              </h2>
              <div className="w-240 h-[2px] bg-gray-200 mx-auto"></div>
            </div>

            <div className="flex gap-5 overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
              {relatedProducts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => navigate(`/products/${p.id}`)}
                  className="min-w-[230px] max-w-[230px] bg-white border border-gray-200 squared-none flex flex-col items-center justify-between shadow-sm hover:shadow-md hover:shadow-red-200 hover:border-red-400 transition-all duration-300 cursor-pointer"
                >
                  <div className="p-4 h-[200px] flex items-center justify-center bg-gray-50 w-full border-b border-gray-200">
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.name}
                        className="max-h-[160px] object-contain"
                      />
                    ) : (
                      <div className="text-gray-400 text-sm italic">
                        Sin imagen
                      </div>
                    )}
                  </div>

                  <div className="p-4 text-center flex flex-col items-center justify-between flex-1 w-full">
                    <p className="font-semibold text-sm text-gray-800 mb-3 leading-tight">
                      {truncateName(p.name)}
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/products/${p.id}`);
                      }}
                      className="w-[120px] text-white bg-red-500 hover:bg-red-600 text-xs font-semibold py-2 px-4 squared-none transition-colors"
                    >
                      Ver producto
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
