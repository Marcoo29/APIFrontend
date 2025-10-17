import { useEffect, useState } from "react";

export default function Categories({
  backendUrl = "http://localhost:4002/categories",
  onCategorySelect,
}) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(backendUrl)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setCategories(data);
        } else {
          // fallback local si no hay backend aún
          setCategories([
            { id: 1, name: "Cabina" },
            { id: 2, name: "Motor" },
            { id: 3, name: "Rodamientos" },
            { id: 4, name: "Suspensión" },
            { id: 5, name: "Dirección" },
            { id: 6, name: "Frenos" },
          ]);
        }
      })
      .catch(() => {
        setCategories([
          { id: 1, name: "Cabina" },
          { id: 2, name: "Motor" },
          { id: 3, name: "Rodamientos" },
          { id: 4, name: "Suspensión" },
          { id: 5, name: "Dirección" },
          { id: 6, name: "Frenos" },
        ]);
      });
  }, [backendUrl]);

  return (
    <aside
      className="
        bg-gray-50 
        border border-gray-200 
        rounded-md 
        p-4 
        shadow-sm 
        font-display
        self-start                /* 👈 evita estirarse verticalmente */
        sticky top-[100px]        /* 👈 queda fijo al hacer scroll */
        max-h-[80vh]              /* 👈 límite máximo de altura */
        overflow-y-auto           /* 👈 si hay muchas categorías, scroll interno */
      "
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-red-500 pb-2 text-center">
        Categorías
      </h3>

      <ul className="space-y-2">
        {categories.map((cat) => (
          <li key={cat.id}>
            <button
              onClick={() => onCategorySelect?.(cat.name)}
              className="
                w-full 
                text-left 
                px-3 py-2 
                rounded-sm 
                text-gray-700 
                hover:text-red-600 
                hover:bg-red-50 
                transition-colors 
                duration-150
              "
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
