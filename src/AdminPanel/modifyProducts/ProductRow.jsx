import ProductFields from "./ProductFields";

export default function ProductRow({
  prod,
  editingId,
  editedProduct,
  handleChange,
  handleEditClick,
  handleEditSubmit
}) {
  const isEditing = editingId === prod.id;

  return (
    <tr className="border-t hover:bg-[#fafafa] transition">
      <td className="px-3 py-2 text-gray-600">{prod.id}</td>

      <ProductFields
        prod={prod}
        isEditing={isEditing}
        editedProduct={editedProduct}
        handleChange={handleChange}
      />

      <td className="px-3 py-2 text-center">
        <button
          onClick={() =>
            isEditing ? handleEditSubmit(prod.id) : handleEditClick(prod)
          }
          className="text-[#D32F2F] hover:text-[#b71c1c] transition"
        >
          <span className="material-symbols-outlined text-base">
            {isEditing ? "check" : "edit"}
          </span>
        </button>
      </td>
    </tr>
  );
}
