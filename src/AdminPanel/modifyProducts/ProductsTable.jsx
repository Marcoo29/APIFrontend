import ProductRow from "./ProductRow";

export default function ProductsTable({
  products,
  editingId,
  editedProduct,
  handleChange,
  handleEditClick,
  handleEditSubmit
}) {

  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-[#e0e0e0] text-sm text-left">
        <thead className="bg-[#f9f9f9] text-[#333] border-b">
          <tr>
            <th className="px-3 py-2">ID</th>
            <th className="px-3 py-2">Nombre</th>
            <th className="px-3 py-2">Precio</th>
            <th className="px-3 py-2">Fabricante</th>
            <th className="px-3 py-2">Stock</th>
            <th className="px-3 py-2">Descripción</th>
            <th className="px-3 py-2">Vehículo</th>
            <th className="px-3 py-2">Estado</th>
            <th className="px-3 py-2 text-center">Acción</th>
          </tr>
        </thead>

        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="9" className="text-center py-3 text-gray-500 italic">
                No hay productos registrados.
              </td>
            </tr>
          ) : (
            products.map((prod) => (
              <ProductRow
                key={prod.id}
                prod={prod}
                editingId={editingId}
                editedProduct={editedProduct}
                handleChange={handleChange}
                handleEditClick={handleEditClick}
                handleEditSubmit={handleEditSubmit}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
