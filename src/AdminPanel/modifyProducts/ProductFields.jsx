import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { formatPrice } from "../../utils/ParseCurrency";
import { fetchCategories } from "../../redux/categorySlice";

export default function ProductFields({
  prod,
  isEditing,
  editedProduct,
  handleChange,
}) {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.items);

  useEffect(() => {
    if (categories.length === 0) dispatch(fetchCategories());
  }, [dispatch, categories.length]);

  const fields = [
    "name",
    "price",
    "manufacturer",
    "stock",
    "category",
    "description",
    "fitFor",
    "productStatus",
  ];

  return fields.map((field) => (
    <td key={field} className="px-3 py-2 max-w-[200px]">
      {isEditing ? (
        field === "productStatus" ? (
          <select
            value={editedProduct.productStatus || "AVAILABLE"}
            onChange={(e) => handleChange("productStatus", e.target.value)}
            className="border border-[#ccc] px-2 py-1 text-sm w-full focus:outline-none focus:border-[#D32F2F]"
          >
            <option value="AVAILABLE">Disponible</option>
            <option value="NOT_AVAILABLE">No disponible</option>
          </select>
        ) : field === "category" ? (
          <select
            value={editedProduct.category?.id || ""}
            onChange={(e) =>
              handleChange(
                "category",
                e.target.value ? { id: Number(e.target.value) } : null
              )
            }
            className="border border-[#ccc] px-2 py-1 text-sm w-full focus:outline-none focus:border-[#D32F2F]"
          >
            <option value="">Sin categoría</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.description}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={field === "price" || field === "stock" ? "number" : "text"}
            value={editedProduct[field] || ""}
            onChange={(e) => handleChange(field, e.target.value)}
            className="border border-[#ccc] px-2 py-1 text-sm w-full focus:outline-none focus:border-[#D32F2F]"
          />
        )
      ) : (
        <span
          className={`text-sm font-medium ${
            field === "productStatus"
              ? prod.productStatus?.toUpperCase() === "AVAILABLE"
                ? "text-green-600"
                : "text-red-500"
              : "text-[#444]"
          }`}
        >
          {field === "productStatus"
            ? prod.productStatus?.toUpperCase() === "AVAILABLE"
              ? "Disponible"
              : "No disponible"
            : field === "price"
            ? formatPrice(prod.price)
            : field === "category"
            ? prod.category?.description || "Sin categoría"
            : field === "description" ? (
                <span className="truncate max-w-[200px] block">
                  {prod.description || "-"}
                </span>
              ) : (
                prod[field] ?? "-"
              )}
        </span>
      )}
    </td>
  ));
}
