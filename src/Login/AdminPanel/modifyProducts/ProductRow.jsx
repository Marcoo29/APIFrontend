import ProductFields from "./ProductFields";

export default function ProductRow({
  prod,
  editingId,
  editedProduct,
  handleChange,
  handleEditClick,
  handleEditSubmit,
}) {
  const isEditing = editingId === prod.id;

  return (
    <tr className="border-t hover:bg-[#fafafa] transition h-[60px] align-top">
      {/* ID */}
      <td className="px-3 py-2 text-gray-600">{prod.id}</td>

      {/* CAMPOS DEL PRODUCTO */}
      <ProductFields
        prod={prod}
        isEditing={isEditing}
        editedProduct={editedProduct}
        handleChange={handleChange}
      />

      {/* ACCIÓN */}
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
