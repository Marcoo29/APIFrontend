import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  setProductDiscount,
  removeProductDiscount,
} from "../../../redux/productSlice";

import ModifyProductsPagination from "../modifyProducts/ModifyProductsPagination";

export default function AdminDiscounts() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);

  const [draftDiscount, setDraftDiscount] = useState({});
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProducts = useMemo(() => {
    if (!search.trim()) return items;
    return items.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [items, search]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleDiscountChange = (productId, price, rawValue) => {
    let value = Number(rawValue);
    if (Number.isNaN(value)) value = 0;
    if (value < 0) value = 0;
    if (value > price) value = price;

    setDraftDiscount((prev) => ({
      ...prev,
      [productId]: value,
    }));
  };

  const applyDiscount = (productId, price) => {
    const discount =
      draftDiscount[productId] !== undefined ? draftDiscount[productId] : 0;

    const safeDiscount = Math.min(Math.max(discount, 0), price);

    dispatch(setProductDiscount({ id: productId, discountPrice: safeDiscount }));
  };

  const clearDiscount = (productId) => {
    dispatch(removeProductDiscount({ id: productId }));

    setDraftDiscount((prev) => {
      const copy = { ...prev };
      delete copy[productId];
      return copy;
    });
  };

  {loading && (
    <div className="text-center text-gray-500 py-4">
      Cargando productos…
    </div>
  )}

  if (error)
    return (
      <p className="p-6 text-red-600">
        Error al cargar productos: {error}
      </p>
    );

  return (
    <main className="w-full bg-white border border-[#dcdcdc] shadow-sm p-8 mt-10">
      <h3 className="text-xl font-semibold text-[#333] mb-6 border-b pb-3">
        Gestión de Descuentos
      </h3>

      {/* 🔍 BUSCADOR */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar producto por nombre…"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="border px-3 py-2 w-80 text-sm rounded"
        />
      </div>

      {/* TABLA */}
      <table className="w-full border-collapse text-sm table-fixed">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-4 py-2 border w-[60px]">ID</th>
            <th className="px-4 py-2 border w-[350px]">Nombre</th>
            <th className="px-4 py-2 border w-[140px]">Precio original</th>
            <th className="px-4 py-2 border w-[120px]">Descuento</th>
            <th className="px-4 py-2 border w-[140px]">Precio final</th>
            <th className="px-4 py-2 border w-[120px]">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {/* FILAS REALES */}
          {currentProducts.map((p) => {
            const currentDiscount =
              draftDiscount[p.id] !== undefined
                ? draftDiscount[p.id]
                : p.discountPrice || 0;

            const finalPrice = p.price - (p.discountPrice || 0);

            // 🔥 Nombre truncado para que no rompa la altura (aprox 2 líneas)
            const rawName = p.name || "";
            const truncatedName =
              rawName.length > 90 ? rawName.slice(0, 90) + "..." : rawName;

            return (
              <tr key={p.id} className="hover:bg-gray-50 h-[48px]">
                <td className="px-4 py-2 border w-[60px] align-middle">
                  {p.id}
                </td>

                <td className="px-3 border w-[350px] align-middle">
                  <div className="truncate whitespace-nowrap overflow-hidden text-ellipsis">
                    {p.name}
                  </div>
                </td>


                <td className="px-4 py-2 border w-[140px] align-middle">
                  ${p.price.toLocaleString("es-AR")}
                </td>

                <td className="px-4 py-2 border w-[120px] align-middle">
                  <input
                    type="number"
                    min="0"
                    max={p.price}
                    step="0.01"
                    value={currentDiscount}
                    onChange={(e) =>
                      handleDiscountChange(p.id, p.price, e.target.value)
                    }
                    className="w-24 border border-gray-300 rounded px-2 py-1 text-right"
                  />
                </td>

                <td className="px-4 py-2 border w-[140px] align-middle">
                  ${finalPrice.toLocaleString("es-AR")}
                </td>

                <td className="px-4 py-2 border w-[120px] space-x-2 align-middle">
                  <button
                    onClick={() => applyDiscount(p.id, p.price)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Aplicar
                  </button>

                  {p.discountPrice > 0 && (
                    <button
                      onClick={() => clearDiscount(p.id)}
                      className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"
                    >
                      Quitar
                    </button>
                  )}
                </td>
              </tr>
            );
          })}

          {/* 🔥 FILAS VACÍAS PARA COMPLETAR HASTA 10 (MISMA ALTURA) */}
          {Array.from({
            length: Math.max(ITEMS_PER_PAGE - currentProducts.length, 0),
          }).map((_, i) => (
            <tr key={"empty-" + i} className="h-[48px]">
              <td colSpan="6" className="border-t"></td>
            </tr>
          ))}
        </tbody>
      </table>

      <ModifyProductsPagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </main>
  );
}
