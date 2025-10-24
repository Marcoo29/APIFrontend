import { useEffect, useState } from "react";

const AddCategories = ({ categories, setCategories, user }) => {
  const [newCategoryName, setNewCategoryName] = useState("");
  const [loadingCategory, setLoadingCategory] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editedName, setEditedName] = useState("");

  useEffect(() => {
    if (!user) return;
    fetch("http://localhost:4002/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data.content || data || []))
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

  const handleEditClick = (cat) => {
    setEditingId(cat.id);
    setEditedName(cat.description);
    setError("");
  };

  const handleEditSubmit = async (catId) => {
    if (!editedName.trim()) return;

    setError("");

    try {
      const response = await fetch(`http://localhost:4002/categories/${catId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ description: editedName }),
      });

      if (!response.ok) {
        if (response.status === 400) {
          throw new Error("Ya existe una categoría con ese nombre");
        }
        throw new Error("Error al actualizar la categoría");
      }

      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === catId ? { ...cat, description: editedName } : cat
        )
      );

      setEditingId(null);
    } catch (err) {
      setError(err.message);
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
          <li className="p-3 text-gray-500 text-sm italic">
            No hay categorías registradas.
          </li>
        ) : (
          categories.map((cat) => (
            <li
              key={cat.id}
              className="p-3 flex justify-between items-center hover:bg-[#fafafa] transition"
            >
              <div className="flex items-center gap-2 w-full justify-between">

                {editingId === cat.id ? (
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="flex-1 border border-[#ccc] px-2 py-1 text-sm focus:outline-none focus:border-[#D32F2F]"
                    autoFocus
                  />
                ) : (
                  <span className="text-[#444]">{cat.description}</span>
                )}


                <button
                  onClick={() =>
                    editingId === cat.id
                      ? handleEditSubmit(cat.id)
                      : handleEditClick(cat)
                  }
                  className="text-[#D32F2F] hover:text-[#b71c1c] transition"
                  title={
                    editingId === cat.id
                      ? "Guardar cambios"
                      : "Editar categoría"
                  }
                >
                  <span className="material-symbols-outlined text-base">
                    {editingId === cat.id ? "check" : "edit"}
                  </span>
                </button>
              </div>

              <span className="text-xs text-gray-400 ml-2 whitespace-nowrap">
                ID: {cat.id}
              </span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default AddCategories;
