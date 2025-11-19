import { useState, useMemo } from "react";
import ProductsTable from "./ProductsTable";
import ModifyProductsPagination from "./ModifyProductsPagination";

const ModifyProducts = ({ user, products, setProducts }) => {
  const [editingId, setEditingId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const currentProducts = useMemo(() => {
    const indexLast = currentPage * itemsPerPage;
    const indexFirst = indexLast - itemsPerPage;
    return products.slice(indexFirst, indexLast);
  }, [products, currentPage]);

  const handleEditClick = (prod) => {
    setEditingId(prod.id);
    setEditedProduct({ ...prod });
    setError("");
  };

  const handleChange = (field, value) => {
    setEditedProduct((prev) => ({ ...prev, [field]: value }));
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

      const updated = await response.json();

      setProducts((prev) =>
        prev.map((p) => (p.id === prodId ? updated : p))
      );

      setEditingId(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="w-full bg-white border border-[#dcdcdc] shadow-sm p-8 mt-10">
      <h3 className="text-xl font-semibold text-[#333] mb-6 border-b pb-3">
        Modificación de Productos
      </h3>

      {error && <p className="text-[#D32F2F] text-sm mb-4">{error}</p>}

      <ProductsTable
        products={currentProducts}
        editingId={editingId}
        editedProduct={editedProduct}
        handleChange={handleChange}
        handleEditClick={handleEditClick}
        handleEditSubmit={handleEditSubmit}
      />

      {products.length > itemsPerPage && (
        <ModifyProductsPagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};

export default ModifyProducts;
