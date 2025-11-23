import { useState, useMemo } from "react";
import ProductsTable from "./ProductsTable";
import ModifyProductsPagination from "./ModifyProductsPagination";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProducts, updateProduct } from "../../redux/productSlice";
import { parseArCurrency, formatPrice } from "../../utils/ParseCurrency";

const ModifyProducts = ({ user }) => {
  const [editingId, setEditingId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});

  const dispatch = useDispatch();

  const { items, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const currentProducts = useMemo(() => {
    const indexLast = currentPage * itemsPerPage;
    const indexFirst = indexLast - itemsPerPage;
    return items.slice(indexFirst, indexLast);
  }, [items, currentPage]);

  const handleEditClick = (prod) => {
    setEditingId(prod.id);
    setEditedProduct({ ...prod });
  };

  const handleChange = (field, value) => {
    setEditedProduct((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditSubmit = async (prodId) => {
    try {
      await dispatch(
        updateProduct({
          id: prodId,
          name: editedProduct.name,
          price: parseArCurrency(editedProduct.price),
          manufacturer: editedProduct.manufacturer,
          stock: Number(editedProduct.stock),
          description: editedProduct.description,
          fitFor: editedProduct.fitFor, // OJO: en camelCase correcto
          productStatus: editedProduct.productStatus,
          token: user.token,
        })
      ).unwrap(); // para capturar errores reales

      setEditingId(null);
    } catch (err) {
      console.error("Error en update:", err);
    }
  };

  const totalPages = Math.ceil(items.length / itemsPerPage);

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

      {items.length > itemsPerPage && (
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
