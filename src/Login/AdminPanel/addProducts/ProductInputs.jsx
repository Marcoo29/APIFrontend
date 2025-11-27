export default function ProductInputs({
  productName, setProductName,
  price, setPrice,
  manufacturer, setManufacturer,
  stock, setStock,
  description, setDescription,
  fitFor, setFitFor,
  status, setStatus,
  categoryId, setCategoryId,
  categories
}) {
  return (
    <>
      <input
        type="text"
        placeholder="Nombre"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        className="border border-[#ccc] px-3 py-2 text-sm"
      />

      <input
        type="number"
        placeholder="Precio"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="border border-[#ccc] px-3 py-2 text-sm"
      />

      <input
        type="text"
        placeholder="Fabricante"
        value={manufacturer}
        onChange={(e) => setManufacturer(e.target.value)}
        className="border border-[#ccc] px-3 py-2 text-sm"
      />

      <input
        type="number"
        placeholder="Stock"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        className="border border-[#ccc] px-3 py-2 text-sm"
      />

      <textarea
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border border-[#ccc] px-3 py-2 text-sm min-h-[80px]"
      />

      <input
        type="text"
        placeholder="Vehículo al que aplica"
        value={fitFor}
        onChange={(e) => setFitFor(e.target.value)}
        className="border border-[#ccc] px-3 py-2 text-sm"
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border border-[#ccc] px-3 py-2 text-sm bg-white"
      >
        <option value="AVAILABLE">Disponible</option>
        <option value="UNAVAILABLE">No disponible</option>
      </select>

      <select
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        className="border border-[#ccc] px-3 py-2 text-sm bg-white"
      >
        <option value="">Selecciona una categoría</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.description}
          </option>
        ))}
      </select>
    </>
  );
}
