import { formatPrice } from "../../utils/ParseCurrency";

export default function ProductFields({
  prod,
  isEditing,
  editedProduct,
  handleChange,
}) {
  const fields = [
    "name",
    "price",
    "manufacturer",
    "stock",
    "description",
    "fitFor",
    "productStatus",
  ];

  return fields.map((field) => (
    <td key={field} className="px-3 py-2">
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
            : prod[field] ?? "-"}
        </span>
      )}
    </td>
  ));
}
