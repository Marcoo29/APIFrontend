import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  setProductDiscount,
  removeProductDiscount,
} from "../../../redux/productSlice";

export default function AdminDiscounts() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);

  // descuento que está escribiendo el admin por producto
  const [draftDiscount, setDraftDiscount] = useState({}); // { [productId]: number }

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // 🔥 controla que el descuento esté entre 0 y price
  const handleDiscountChange = (productId, price, rawValue) => {
    let value = Number(rawValue);
    if (Number.isNaN(value)) value = 0;

    // no menos de 0
    if (value < 0) value = 0;
    // no más que el precio del producto
    if (value > price) value = price;

    setDraftDiscount((prev) => ({
      ...prev,
      [productId]: value,
    }));
  };

  const applyDiscount = (productId, price) => {
    const discount =
      draftDiscount[productId] !== undefined
        ? draftDiscount[productId]
        : 0;

    // por las dudas, volvemos a clamp acá
    const safeDiscount = Math.min(Math.max(discount, 0), price);

    dispatch(
      setProductDiscount({
        id: productId,
        discountPrice: safeDiscount,
      })
    );
  };

  const clearDiscount = (productId) => {
    dispatch(removeProductDiscount({ id: productId }));
    setDraftDiscount((prev) => {
      const copy = { ...prev };
      delete copy[productId];
      return copy;
    });
  };

  if (loading) return <p className="p-6">Cargando productos…</p>;
  if (error)
    return (
      <p className="p-6 text-red-600">
        Error al cargar productos: {error}
      </p>
    );

  return (
    <main className="flex-1 bg-white rounded-lg shadow-sm p-6 mt-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Gestión de descuentos
      </h1>

      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">Nombre</th>
            <th className="px-4 py-2 border">Precio original</th>
            <th className="px-4 py-2 border">Descuento</th>
            <th className="px-4 py-2 border">Precio final</th>
            <th className="px-4 py-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {items.map((p) => {
            const currentDiscount =
              draftDiscount[p.id] !== undefined
                ? draftDiscount[p.id]
                : p.discountPrice || 0;

            const finalPrice = p.price - (p.discountPrice || 0);

            return (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{p.id}</td>
                <td className="px-4 py-2 border">{p.name}</td>
                <td className="px-4 py-2 border">
                  ${p.price.toLocaleString("es-AR")}
                </td>

                {/* 🔥 INPUT CON LÍMITE */}
                <td className="px-4 py-2 border">
                  <input
                    type="number"
                    min="0"
                    max={p.price}              // límite HTML
                    step="0.01"
                    value={currentDiscount}
                    onChange={(e) =>
                      handleDiscountChange(p.id, p.price, e.target.value)
                    }
                    className="w-24 border border-gray-300 rounded px-2 py-1 text-right"
                  />
                </td>

                <td className="px-4 py-2 border">
                  ${finalPrice.toLocaleString("es-AR")}
                </td>

                <td className="px-4 py-2 border space-x-2">
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
        </tbody>
      </table>
    </main>
  );
}
