import { useEffect, useState } from "react";

export default function Categories({
  backendUrl = "http://localhost:4002/categories?page=0&size=100",
  onCategorySelect, // callback para pasar el nombre/id al padre
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

  const handleSelect = (category) => {
    if (activeCategory === category.id) {
      setActiveCategory(null);
      onCategorySelect?.(null); // deselecciona
    } else {
      setActiveCategory(category.id);
      onCategorySelect?.(category.id); 
    }
  };

  return (
    <aside className="bg-gray-50 border border-gray-200 rounded-md p-4 shadow-sm font-display self-start max-h-[80vh] overflow-y-auto">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-red-500 pb-2 text-center">
        Categorías
      </h3>
      <ul className="space-y-2">
        {categories.map((c) => {
          const isActive = activeCategory === c.name;
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
