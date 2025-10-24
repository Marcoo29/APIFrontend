import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [imageBase64, setImageBase64] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [mensaje, setMensaje] = useState("");

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const userRole = user?.role || null;

  const aumentar = () => setCantidad((prev) => Math.min(prev + 1, 99));
  const disminuir = () => setCantidad((prev) => Math.max(prev - 1, 1));

  useEffect(() => {
    fetch(`http://localhost:4002/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);

        fetch(`http://localhost:4002/images?id=${id}`)
          .then((res) => res.json())
          .then((data) => {
            if (data && data.file) setImageBase64(data.file);
          })
          .catch((err) => console.error("Error cargando imagen:", err));

        fetch(`http://localhost:4002/products?page=0&size=100`)
          .then((res) => res.json())
          .then(async (all) => {
            const list = all.content || [];
            const filtered = list.filter(
              (p) =>
                p.category?.description === data.category?.description &&
                p.id !== data.id
            );

            const withImages = await Promise.all(
              filtered.slice(0, 8).map(async (p) => {
                try {
                  const res = await fetch(
                    `http://localhost:4002/images?id=${p.id}`
                  );
                  const imgData = await res.json();
                  if (imgData && imgData.file) {
                    return { ...p, imageBase64: imgData.file };
                  }
                } catch (e) {
                  console.warn(`Error cargando imagen del producto ${p.id}`, e);
                }
                return p;
              })
            );

            setRelatedProducts(withImages);
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

  const agregarAlCarrito = () => {
    if (userRole === "ADMIN" || !product) return;

    const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingIndex = currentCart.findIndex((item) => item.id === product.id);

    if (existingIndex !== -1) {
      currentCart[existingIndex].qty += cantidad;
    } else {
      currentCart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        manufacturer: product.manufacturer,
        image: imageBase64,
        qty: cantidad,
      });
    }

    localStorage.setItem("cart", JSON.stringify(currentCart));

    window.dispatchEvent(new Event("storage"));

    setMensaje("✅ Producto agregado al carrito");
    setTimeout(() => setMensaje(""), 2000);
  };

  if (loading) return <p className="text-center mt-10">Cargando producto...</p>;
  if (!product) return <p className="text-center mt-10">Producto no encontrado</p>;

  const truncateName = (name) =>
    name && name.length > 25 ? name.slice(0, 25) + "..." : name;

  const categoryName = product.category?.description || "Sin categoría";

  return (
    <div className="min-h-screen flex flex-col bg-[#f6f6f6] font-display text-gray-900 relative">
      <main className="flex-grow container mx-auto px-4 lg:px-8 py-12 mt-10 max-w-6xl relative">
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

        <button
          onClick={() => {
            const previousPath = document.referrer;

            if (previousPath && previousPath.includes(window.location.origin)) {
              navigate(-1);
            } else {
              navigate("/products");
            }
          }}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-600 transition-colors mb-3 mt-4"
        >
          <span className="material-symbols-outlined text-base">arrow_back</span>
          <span className="font-medium">VOLVER ATRÁS</span>
        </button>


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

        <div className="bg-white shadow-sm border border-gray-200 overflow-hidden mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch">
            <div className="flex items-center justify-center bg-gray-100 border-r border-gray-200 aspect-square">
              {imageBase64 ? (
                <img
                  src={`data:image/jpeg;base64,${imageBase64}`}
                  alt={product.name}
                  className="w-full h-full object-contain rounded-md"
                  loading="lazy"
                />
              ) : (
                <div className="text-gray-400 italic text-center">
                  Sin imagen disponible
                </div>
              )}
            </div>

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

                <span className="text-4xl font-bold text-gray-900 block mb-4">
                  ${product.price?.toLocaleString("es-AR")}
                </span>

                <p className="text-base text-gray-700 leading-relaxed">
                  {product.description || "Sin descripción disponible."}
                </p>
              </div>

              <div className="pt-6 border-t border-gray-200 mt-6 flex items-center justify-center gap-3 w-full">
                <div className="flex items-center border border-gray-300 rounded-none px-2 py-3 text-sm text-gray-800">
                  <button
                    onClick={disminuir}
                    className="px-2 text-gray-500 hover:text-red-600 transition"
                  >
                    –
                  </button>
                  <input
                    type="number"
                    value={cantidad}
                    readOnly
                    className="w-8 text-center bg-transparent text-gray-800 focus:outline-none"
                  />
                  <button
                    onClick={aumentar}
                    className="px-2 text-gray-500 hover:text-red-600 transition"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={agregarAlCarrito}
                  disabled={userRole === "ADMIN"}
                  className={`flex-1 flex items-center justify-center gap-2 font-semibold py-3 transition-colors duration-200 ${
                    userRole === "ADMIN"
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600 text-white"
                  }`}
                  title={
                    userRole === "ADMIN"
                      ? "Los administradores no pueden agregar productos al carrito"
                      : "Agregar al carrito"
                  }
                >
                  Agregar al carrito
                  <span className="material-symbols-outlined text-sm">
                    add_shopping_cart
                  </span>
                </button>
              </div>

              {mensaje && (
                <p className="text-green-600 text-sm text-center mt-4 font-medium animate-fadeIn">
                  {mensaje}
                </p>
              )}
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <section className="mt-10 relative">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-red-500 tracking-wide mb-2">
                También podría interesarte
              </h2>
              <div className="w-240 h-[2px] bg-gray-200 mx-auto"></div>
            </div>

            <div className="relative flex items-center">
              <button
                onClick={() => {
                  document.getElementById("relatedScroll").scrollBy({
                    left: -250,
                    behavior: "smooth",
                  });
                }}
                className="absolute -left-12 top-1/2 -translate-y-1/2 z-20 bg-white border border-gray-300 hover:border-red-500 rounded p-2 shadow-sm hover:shadow-md transition"
              >
                <span className="material-symbols-outlined text-gray-600 hover:text-red-600">
                  chevron_left
                </span>
              </button>

              <div
                id="relatedScroll"
                className="flex gap-5 overflow-x-hidden scroll-smooth pb-6 px-10 mx-auto"
              >
                {relatedProducts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => navigate(`/products/${p.id}`)}
                    className="min-w-[230px] max-w-[230px] bg-white border border-gray-200 flex flex-col items-center justify-between shadow-sm hover:shadow-md hover:shadow-red-200 hover:border-red-400 transition-all duration-300 cursor-pointer rounded-md"
                  >
                    <div className="bg-gray-50 w-full border-b border-gray-200 overflow-hidden flex items-center justify-center h-[230px] rounded-t-md">
                      {p.imageBase64 ? (
                        <img
                          src={`data:image/jpeg;base64,${p.imageBase64}`}
                          alt={p.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <img
                          src="https://via.placeholder.com/230x230?text=Producto"
                          alt="Sin imagen"
                          className="w-full h-full object-cover opacity-70"
                        />
                      )}
                    </div>

                    <div className="p-4 text-center flex flex-col items-center justify-between flex-1 w-full">
                      <p className="font-semibold text-sm text-gray-800 mb-3 leading-tight">
                        {p.name.length > 25 ? p.name.slice(0, 25) + "..." : p.name}
                      </p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/products/${p.id}`);
                        }}
                        className="w-[120px] text-white bg-red-500 hover:bg-red-600 text-xs font-semibold py-2 px-4 transition-colors rounded-sm"
                      >
                        Ver producto
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  document.getElementById("relatedScroll").scrollBy({
                    left: 250,
                    behavior: "smooth",
                  });
                }}
                className="absolute -right-12 top-1/2 -translate-y-1/2 z-20 bg-white border border-gray-300 hover:border-red-500 rounded p-2 shadow-sm hover:shadow-md transition"
              >
                <span className="material-symbols-outlined text-gray-600 hover:text-red-600">
                  chevron_right
                </span>
              </button>
            </div>
          </section>
        )}


      </main>
    </div>
  );
}
