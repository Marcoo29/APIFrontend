import { useEffect, useState } from "react";

export default function Categories({
  backendUrl = "http://localhost:4002/categories?page=0&size=100",
  onCategorySelect,
}) {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

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

  const handleSelect = (categoryName) => {
    if (activeCategory === categoryName) {
      setActiveCategory(null);
      onCategorySelect?.(null);
    } else {
      setActiveCategory(categoryName);
      onCategorySelect?.(categoryName);
    }
  };

  return (
    <aside
      className="
        bg-gray-50 
        border border-gray-200 
        rounded-md 
        p-4 
        shadow-sm 
        font-display
        self-start
        sticky top-[100px]
        max-h-[80vh]
        overflow-y-auto
      "
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-red-500 pb-2 text-center">
        Categorías
      </h3>

      <ul className="space-y-2">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.name;

          return (
            <li key={cat.id}>
              <button
                onClick={() => handleSelect(cat.name)}
                className={`
                  w-full text-left px-3 py-2 rounded-sm transition-all duration-150
                  ${
                    isActive
                      ? "bg-red-600 text-white font-medium" // 🔴 activa: fondo rojo sólido
                      : "text-gray-700 hover:text-red-600" // ⚪ hover: solo texto rojo
                  }
                `}
              >
                {cat.name}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
