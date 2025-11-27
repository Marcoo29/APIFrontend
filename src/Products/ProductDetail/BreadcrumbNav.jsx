import { Link } from "react-router-dom";

export default function BreadcrumbNav({ product, navigate }) {
  const category = product.category?.description || "Sin categoría";
  const truncate = (txt = "", max = 25) =>
    txt.length > max ? txt.slice(0, max) + "..." : txt;

  return (
    <>
      <button
        onClick={() => {
          const previous = document.referrer;
          if (previous && previous.includes(window.location.origin)) {
            navigate(-1);
          } else {
            navigate("/products");
          }
        }}
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-600 transition-colors mb-3 mt-4"
      >
        <span className="material-symbols-outlined text-base">arrow_back</span>
        VOLVER ATRÁS
      </button>

      <nav className="text-sm text-gray-500 mb-4">
        <Link to="/" className="hover:text-red-600">
          Inicio
        </Link>{" "}
        /{" "}
        <Link
          to={`/category/${category.toLowerCase()}`}
          className="hover:text-red-600 capitalize"
        >
          {category}
        </Link>{" "}
        /{" "}
        <span className="text-gray-800 font-medium">
          {truncate(product.name)}
        </span>
      </nav>
    </>
  );
}
