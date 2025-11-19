import CategoryListItem from "./CategoryListItem";

export default function CategoryList({
  categories,
  editingId,
  editedName,
  setEditedName,
  onEditClick,
  onSave,
}) {
  return (
    <ul className="border divide-y">
      {categories.length === 0 ? (
        <li className="p-3 text-gray-500 italic">
          No hay categorías.
        </li>
      ) : (
        categories.map((cat) => (
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
