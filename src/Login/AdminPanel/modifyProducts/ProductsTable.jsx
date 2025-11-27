import ProductRow from "./ProductRow";

export default function ProductsTable({
  products,
  editingId,
  editedProduct,
  handleChange,
  handleEditClick,
  handleEditSubmit
}) {

  const emptyRows = Math.max(0, 10 - products.length);

  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-[#e0e0e0] text-sm table-fixed">
        <thead className="bg-[#f9f9f9] text-[#333] border-b">
          <tr>
            <th className="px-2 py-2 w-[50px] text-center">ID</th>
            <th className="px-2 py-2 w-[260px]">Nombre</th>
            <th className="px-2 py-2 w-[110px] text-center">Precio</th>
            <th className="px-2 py-2 w-[140px] text-center">Fabricante</th>
            <th className="px-2 py-2 w-[70px] text-center">Stock</th>
            <th className="px-2 py-2 w-[320px]">Descripción</th>
            <th className="px-2 py-2 w-[150px] text-center">Vehículo</th>
            <th className="px-2 py-2 w-[120px] text-center">Estado</th>
            <th className="px-2 py-2 w-[70px] text-center">Acción</th>
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

          {Array.from({ length: emptyRows }).map((_, i) => (
            <tr key={`empty-${i}`} className="h-[60px]">
              <td colSpan="9" className="border-t"></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
