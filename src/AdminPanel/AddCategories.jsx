import { useEffect, useState } from "react";

// Componente para agregar y listar categorías
const AddCategories = ({ categories, setCategories, user }) => {
  const [newCategoryName, setNewCategoryName] = useState("");
  const [loadingCategory, setLoadingCategory] = useState(false);
  const [error, setError] = useState("");

  // Obtener categorías al cargar
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
    <div className="mb-10">
      <h3 className="text-lg text-gray-600 mb-4">Gestión de Categorías</h3>
      <form
        onSubmit={handleAddCategory}
        className="flex flex-col sm:flex-row gap-3 mb-6"
      >
        <input
          type="text"
          placeholder="Nombre de la nueva categoría"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          className="input border px-3 py-2 rounded"
        />
        <button
          type="submit"
          disabled={loadingCategory}
          className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition disabled:bg-red-300"
        >
          {loadingCategory ? "Agregando..." : "Agregar Categoría"}
        </button>
      </form>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <h4 className="text-lg font-semibold mb-2 text-gray-800">
        Categorías existentes
      </h4>
      <ul className="divide-y divide-gray-200 border border-gray-200 rounded-lg">
        {categories.length === 0 ? (
          <li className="p-3 text-gray-500 text-sm">
            No hay categorías registradas.
          </li>
        ) : (
          categories.map((cat) => (
            <li
              key={cat.id}
              className="p-3 hover:bg-gray-50 transition flex justify-between"
            >
              <span className="text-gray-700">{cat.description}</span>
              <span className="text-sm text-gray-400">ID: {cat.id}</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default AddCategories;