import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Categories({
  backendUrl = "http://localhost:4002/categories?page=0&size=100",
  onCategorySelect,
}) {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  // 🔹 Obtener categoría actual desde la URL (?category=)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryFromUrl = params.get("category");
    setActiveCategory(categoryFromUrl ? categoryFromUrl.toLowerCase() : null);
  }, [location.search]);

  // 🔹 Cargar categorías desde el backend
  useEffect(() => {
    fetch(backendUrl)
      .then((res) => res.json())
      .then((data) => {
        const fetched =
          data?.content && Array.isArray(data.content)
            ? data.content
            : Array.isArray(data)
            ? data
            : [];

        const mapped = fetched.map((c) => ({
          id: c.id,
          name: c.description,
        }));

        setCategories(mapped);
      })
      .catch((err) => console.error("Error cargando categorías:", err));
  }, [backendUrl]);

  // 🔹 Click en categoría → cambia estado, callback y URL
  const handleSelect = (category) => {
    if (category === null) {
      setActiveCategory(null);
      onCategorySelect?.(null);
      navigate(`/products`);
    } else {
      const lowerName = category.name.toLowerCase();
      setActiveCategory(lowerName);
      onCategorySelect?.(category.name);
      navigate(`/products?category=${encodeURIComponent(lowerName)}`);
    }
  };

  return (
    <aside className="bg-gray-50 border border-gray-200 rounded-md p-4 shadow-sm font-display self-start max-h-[80vh] overflow-y-auto">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-red-500 pb-2 text-center">
        Categorías
      </h3>

      <ul className="space-y-2">
        {/* Botón para ver todas */}
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

        {/* Lista de categorías */}
        {categories.map((c) => {
          const isActive =
            activeCategory === c.name.toLowerCase().trim() ||
            activeCategory === String(c.id);

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
                {c.name}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
