import { formatPrice } from "../../../utils/ParseCurrency";

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

  const fixedClasses = {
    name: "w-full h-[48px] border px-2 py-1 text-sm",
    price: "w-full h-[36px] border px-2 py-1 text-sm text-center",
    manufacturer: "w-full h-[36px] border px-2 py-1 text-sm",
    stock: "w-full h-[36px] border px-2 py-1 text-sm text-center",
    description:
      "w-full h-[48px] border px-2 py-1 text-sm overflow-hidden resize-none",
    fitFor: "w-full h-[36px] border px-2 py-1 text-sm",
    productStatus:
      "w-full h-[36px] border px-2 py-1 text-sm bg-white text-center",
  };

  const viewClasses = {
    name: "line-clamp-2 overflow-hidden text-ellipsis",
    description: "line-clamp-2 overflow-hidden text-ellipsis",
  };

  return fields.map((field) => (
    <td
      key={field}
      className={`px-2 py-2 ${
        ["price", "stock", "manufacturer", "fitFor", "productStatus"].includes(
          field
        )
          ? "text-center"
          : ""
      }`}
    >
      {isEditing ? (
        field === "productStatus" ? (
          <select
            value={editedProduct.productStatus || "AVAILABLE"}
            onChange={(e) => handleChange("productStatus", e.target.value)}
            className={fixedClasses[field]}
          >
            <option value="AVAILABLE">Disponible</option>
            <option value="NOT_AVAILABLE">No disponible</option>
          </select>
        ) : field === "description" ? (
          <textarea
            value={editedProduct.description || ""}
            onChange={(e) => handleChange(field, e.target.value)}
            className={fixedClasses[field]}
          />
        ) : (
          <input
            type={field === "price" || field === "stock" ? "number" : "text"}
            value={editedProduct[field] || ""}
            onChange={(e) => handleChange(field, e.target.value)}
            className={fixedClasses[field]}
          />
        )
      ) : (
        <span
          className={`text-sm font-medium ${
            viewClasses[field] || "text-[#444]"
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
