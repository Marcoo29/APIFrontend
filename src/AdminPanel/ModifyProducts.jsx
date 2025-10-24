import { useState, useMemo } from "react";

const ModifyProducts = ({ user, products, setProducts }) => {
  const [editingId, setEditingId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const currentProducts = useMemo(() => {
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    return products.slice(indexOfFirst, indexOfLast);
  }, [products, currentPage]);

  const handleEditClick = (prod) => {
    setEditingId(prod.id);
    setEditedProduct({ ...prod });
    setError("");
  };

  const handleEditSubmit = async (prodId) => {
    setError("");
    try {
      const response = await fetch(
        `http://localhost:4002/products/${prodId}/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            name: editedProduct.name,
            price: Number(editedProduct.price),
            manufacturer: editedProduct.manufacturer,
            stock: Number(editedProduct.stock),
            description: editedProduct.description,
            fitFor: editedProduct.fitFor,
            productStatus: editedProduct.productStatus,
            categoryId: editedProduct.categoryId,
          }),
        }
      );

      if (!response.ok) throw new Error("Error al actualizar el producto");

      const updatedProduct = await response.json();

      setProducts((prev) =>
        prev.map((p) => (p.id === prodId ? updatedProduct : p))
      );

      setEditingId(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleChange = (field, value) => {
    setEditedProduct((prev) => ({ ...prev, [field]: value }));
  };

  const emptyRows = itemsPerPage - currentProducts.length;

  return (
    <div className="w-full bg-white border border-[#dcdcdc] shadow-sm p-8 mt-10">
      <h3 className="text-xl font-semibold text-[#333] mb-6 border-b pb-3">
        Modificación de Productos
      </h3>

      {error && <p className="text-[#D32F2F] text-sm mb-4">{error}</p>}

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
            {currentProducts.length === 0 ? (
              <tr>
                <td
                  colSpan="9"
                  className="text-center py-3 text-gray-500 italic"
                >
                  No hay productos registrados.
                </td>
              </tr>
            ) : (
              <>
                {currentProducts.map((prod) => (
                  <tr
                    key={prod.id}
                    className="border-t hover:bg-[#fafafa] transition"
                  >
                    <td className="px-3 py-2 text-gray-600">{prod.id}</td>

                    {[
                      "name",
                      "price",
                      "manufacturer",
                      "stock",
                      "description",
                      "fitFor",
                      "productStatus",
                    ].map((field) => (
                      <td key={field} className="px-3 py-2">
                        {editingId === prod.id ? (
                          field === "productStatus" ? (
                            <select
                              value={editedProduct.productStatus || "AVAILABLE"}
                              onChange={(e) =>
                                handleChange("productStatus", e.target.value)
                              }
                              className="border border-[#ccc] px-2 py-1 text-sm w-full focus:outline-none focus:border-[#D32F2F]"
                            >
                              <option value="AVAILABLE">Disponible</option>
                              <option value="NOT_AVAILABLE">
                                No disponible
                              </option>
                            </select>
                          ) : (
                            <input
                              type={
                                field === "price" || field === "stock"
                                  ? "number"
                                  : "text"
                              }
                              value={editedProduct[field] || ""}
                              onChange={(e) =>
                                handleChange(field, e.target.value)
                              }
                              className="border border-[#ccc] px-2 py-1 text-sm w-full focus:outline-none focus:border-[#D32F2F]"
                            />
                          )
                        ) : (
                          <span
                            className={`text-sm font-medium ${
                              field === "productStatus"
                                ? prod.productStatus?.toUpperCase() ===
                                  "AVAILABLE"
                                  ? "text-green-600"
                                  : prod.productStatus?.toUpperCase() ===
                                    "NOT_AVAILABLE"
                                  ? "text-red-500"
                                  : "text-gray-400"
                                : "text-[#444]"
                            }`}
                          >
                            {field === "productStatus"
                              ? prod.productStatus?.toUpperCase() ===
                                "AVAILABLE"
                                ? "Disponible"
                                : prod.productStatus?.toUpperCase() ===
                                  "NOT_AVAILABLE"
                                ? "No disponible"
                                : "-"
                              : prod[field] ?? "-"}
                          </span>
                        )}
                      </td>
                    ))}

                    <td className="px-3 py-2 text-center">
                      <button
                        onClick={() =>
                          editingId === prod.id
                            ? handleEditSubmit(prod.id)
                            : handleEditClick(prod)
                        }
                        className="text-[#D32F2F] hover:text-[#b71c1c] transition"
                        title={
                          editingId === prod.id
                            ? "Guardar cambios"
                            : "Editar producto"
                        }
                      >
                        <span className="material-symbols-outlined text-base">
                          {editingId === prod.id ? "check" : "edit"}
                        </span>
                      </button>
                    </td>
                  </tr>
                ))}

                {emptyRows > 0 &&
                  Array.from({ length: emptyRows }).map((_, i) => (
                    <tr key={`empty-${i}`} className="border-t h-[45px]">
                      <td colSpan="9">&nbsp;</td>
                    </tr>
                  ))}
              </>
            )}
          </tbody>
        </table>

        {products.length > itemsPerPage && (
          <div className="flex justify-center items-center gap-4 mt-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 border rounded ${
                currentPage === 1
                  ? "text-gray-400 border-gray-300 cursor-not-allowed"
                  : "text-[#D32F2F] border-[#D32F2F] hover:bg-[#D32F2F] hover:text-white transition"
              }`}
            >
              Anterior
            </button>

            <span className="text-sm text-gray-600">
              Página {currentPage} de {totalPages}
            </span>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`px-3 py-1 border rounded ${
                currentPage === totalPages
                  ? "text-gray-400 border-gray-300 cursor-not-allowed"
                  : "text-[#D32F2F] border-[#D32F2F] hover:bg-[#D32F2F] hover:text-white transition"
              }`}
            >
              Siguiente
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModifyProducts;
