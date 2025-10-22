import { useEffect, useState } from "react";

const AddCategories = ({ categories, setCategories, user }) => {
  const [newCategoryName, setNewCategoryName] = useState("");
  const [loadingCategory, setLoadingCategory] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;
    fetch("http://localhost:4002/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data.content || []))
      .catch(() => setError("Error al cargar categorías"));
  }, [user, setCategories]);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    setLoadingCategory(true);
    setError("");

    try {
      const response = await fetch("http://localhost:4002/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ description: newCategoryName }),
      });

      if (!response.ok) throw new Error("Error al crear la categoría");

      const createdCategory = await response.json();
      setCategories([...categories, createdCategory]);
      setNewCategoryName("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingCategory(false);
    }
  };

  return (
    <div className="w-full bg-white border border-[#dcdcdc] shadow-sm p-8">
      <h3 className="text-xl font-semibold text-[#333] mb-6 border-b pb-3">
        Gestión de Categorías
      </h3>

      <form
        onSubmit={handleAddCategory}
        className="flex flex-col sm:flex-row gap-3 mb-6"
      >
        <input
          type="text"
          placeholder="Nombre de la nueva categoría"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          className="flex-1 border border-[#ccc] px-3 py-2 text-sm focus:outline-none focus:border-[#D32F2F]"
        />
        <button
          type="submit"
          disabled={loadingCategory}
          className="bg-[#D32F2F] text-white px-5 py-2 font-medium tracking-wide hover:bg-[#b71c1c] transition-all disabled:bg-[#ef9a9a] disabled:cursor-not-allowed"
        >
          {loadingCategory ? "Agregando..." : "Agregar Categoría"}
        </button>
      </form>

      {error && <p className="text-[#D32F2F] text-sm mb-4">{error}</p>}

      <h4 className="text-lg font-semibold mb-3 text-[#333] border-b pb-2">
        Categorías existentes
      </h4>

      <ul className="border border-[#dcdcdc] divide-y divide-[#eaeaea]">
        {categories.length === 0 ? (
          <li className="p-3 text-gray-500 text-sm">
            No hay categorías registradas.
          </li>
        ) : (
          categories.map((cat) => (
            <li
              key={cat.id}
              className="p-3 flex justify-between items-center hover:bg-[#fafafa] transition"
            >
              <span className="text-[#444]">{cat.description}</span>
              <span className="text-xs text-gray-400">ID: {cat.id}</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default AddCategories;