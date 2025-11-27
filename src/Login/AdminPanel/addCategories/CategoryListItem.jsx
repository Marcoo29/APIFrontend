export default function CategoryListItem({
  cat,
  editingId,
  editedName,
  setEditedName,
  onEditClick,
  onSave,
}) {
  const isEditing = editingId === cat.id;

  return (
    <li className="flex justify-between items-center py-3 px-4 border-b">

      {/* NOMBRE / INPUT */}
      <div className="flex-1">
        {isEditing ? (
          <input
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            className="border border-gray-300 px-3 py-1 rounded w-full"
          />
        ) : (
          <span className="text-gray-800 text-sm">
            {cat.description}
          </span>
        )}
      </div>

      {/* ID + ICONO */}
      <div className="flex items-center gap-4 min-w-[110px] justify-end">

        {/* ID SIEMPRE EN UNA LÍNEA */}
        <span className="text-gray-500 text-xs whitespace-nowrap">
          ID: {cat.id}
        </span>

        {/* ÍCONO EDIT / CHECK */}
        <button
          onClick={() =>
            isEditing ? onSave(cat.id) : onEditClick(cat)
          }
          className="text-[#D32F2F] hover:text-[#b71c1c] transition"
        >
          <span className="material-symbols-outlined text-base">
            {isEditing ? "check" : "edit"}
          </span>
        </button>
      </div>
    </li>
  );
}
