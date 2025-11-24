import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../redux/categorySlice";

export default function Categories({ onCategorySelect }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const categories = useSelector((state) => state.categories.items);

  const [activeCategory, setActiveCategory] = useState(null);

  // Cargar categorías si no existen
  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, []);

  // Detectar categoría desde la URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryFromUrl = params.get("category");
    setActiveCategory(categoryFromUrl ? categoryFromUrl.toLowerCase() : null);
  }, [location.search]);

  const handleSelect = (category) => {
    // Sin filtro
    if (!category) {
      setActiveCategory(null);
      onCategorySelect(null);
      navigate(`/products`);
      return;
    }

    const name = category.description.toLowerCase();

    setActiveCategory(name);
    onCategorySelect(category.description); // <-- Esto sí coincide con Products
    navigate(`/products?category=${encodeURIComponent(name)}`);
  };

  return (
    <aside className="bg-gray-50 border border-gray-200 rounded-md p-4 shadow-sm font-display self-start max-h-[80vh] overflow-y-auto">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-red-500 pb-2 text-center">
        Categorías
      </h3>

      <ul className="space-y-2">
        <li>
          <button
            onClick={() => handleSelect(null)}
            className={`w-full text-left px-3 py-2 rounded-sm transition-all duration-150 ${
              activeCategory === null
                ? "bg-red-600 text-white font-medium"
                : "text-gray-700 hover:text-red-600"
            }`}
          >
            Ver todas las categorías
          </button>
        </li>

        {categories.map((c) => {
          const isActive =
            activeCategory === c.description.toLowerCase().trim();

          return (
            <li key={c.id}>
              <button
                onClick={() => handleSelect(c)}
                className={`w-full text-left px-3 py-2 rounded-sm transition-all duration-150 ${
                  isActive
                    ? "bg-red-600 text-white font-medium"
                    : "text-gray-700 hover:text-red-600"
                }`}
              >
                {c.description}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
