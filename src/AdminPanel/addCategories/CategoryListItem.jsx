export default function CategoryListItem({
  cat,
  editingId,
  editedName,
  setEditedName,
  onEditClick,
  onSave,
}) {
  return (
    <li className="p-3 flex justify-between items-center hover:bg-gray-50">
      <div className="flex items-center gap-2 w-full justify-between">
        {editingId === cat.id ? (
          <input
            className="flex-1 border px-2 py-1 text-sm"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
        ) : (
          <span className="text-gray-700">{cat.description}</span>
        )}

        <button
          onClick={() =>
            editingId === cat.id ? onSave(cat.id) : onEditClick(cat)
          }
          className="text-red-600 hover:text-red-800"
        >
          {editingId === cat.id ? "✔" : "✎"}
        </button>
      </div>

      <span className="text-xs text-gray-400">ID: {cat.id}</span>
    </li>
  );
}
