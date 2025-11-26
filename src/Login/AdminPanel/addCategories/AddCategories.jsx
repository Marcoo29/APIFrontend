import { useState } from "react";
import { useCategories } from "./useCategories";
import CategoryForm from "./CategoryForm";
import CategoryList from "./CategoryList";

export default function AddCategories({ user }) {
  const [newCategoryName, setNewCategoryName] = useState("");

  const {
    categories,
    error,
    loadingCategory,
    editingId,
    editedName,
    setEditedName,
    setEditingId,
    addCategory,
    editCategory,
  } = useCategories(user);

  return (
    <div className="w-full bg-white border p-8 shadow-sm mt-10">
      <h3 className="text-xl font-semibold mb-6 border-b pb-3">
        Gestión de Categorías
      </h3>

      <CategoryForm
        value={newCategoryName}
        setValue={setNewCategoryName}
        loading={loadingCategory}
        onSubmit={(e) => {
          e.preventDefault();
          addCategory(newCategoryName);
          setNewCategoryName("");
        }}
      />

      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

      <h4 className="text-lg font-semibold mb-3 border-b pb-2">
        Categorías existentes
      </h4>

      <CategoryList
        categories={categories}
        editingId={editingId}
        editedName={editedName}
        setEditedName={setEditedName}
        onEditClick={(cat) => {
          setEditingId(cat.id);
          setEditedName(cat.description);
        }}
        onSave={editCategory}
      />
    </div>
  );
}
