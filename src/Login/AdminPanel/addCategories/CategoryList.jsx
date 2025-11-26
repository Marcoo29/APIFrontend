import CategoryListItem from "./CategoryListItem";

export default function CategoryList({
  categories,
  editingId,
  editedName,
  setEditedName,
  onEditClick,
  onSave,
}) {
  const safeCategories = Array.isArray(categories) ? categories : [];

  return (
    <ul className="border divide-y">
      {safeCategories.length === 0 ? (
        <li className="p-3 text-gray-500 italic">No hay categorías.</li>
      ) : (
        safeCategories.map((cat) => (
          <CategoryListItem
            key={cat.id}
            cat={cat}
            editingId={editingId}
            editedName={editedName}
            setEditedName={setEditedName}
            onEditClick={onEditClick}
            onSave={onSave}
          />
        ))
      )}
    </ul>
  );
}
