import { useEffect, useState } from "react";

export function useCategories(user, setCategories) {
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


  const addCategory = async (name) => {
    if (!name.trim()) return;

    setLoadingCategory(true);
    setError("");

    try {
      const res = await fetch("http://localhost:4002/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ description: name }),
      });

      if (!res.ok) throw new Error("Error al crear categoría");

      const created = await res.json();
      setCategories(prev => [...prev, created]);

    } catch (e) {
      setError(e.message);
    } finally {
      setLoadingCategory(false);
    }
  };


  const editCategory = async (id) => {
    if (!editedName.trim()) return;

    try {
      const res = await fetch(`http://localhost:4002/categories/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ description: editedName }),
      });

      if (!res.ok) throw new Error("Error al actualizar categoría");

      setCategories(prev =>
        prev.map(cat => cat.id === id ? { ...cat, description: editedName } : cat)
      );

      setEditingId(null);

    } catch (e) {
      setError(e.message);
    }
  };

  return {
    error,
    loadingCategory,
    editingId,
    editedName,
    setEditedName,
    setEditingId,
    addCategory,
    editCategory
  };
}
