import { useState, useEffect } from "react";

const AddProducts = ({ categories, user }) => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [fitFor, setFitFor] = useState("");
  const [status, setStatus] = useState("AVAILABLE");
  const [categoryId, setCategoryId] = useState("");
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [error, setError] = useState("");

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (
      !productName ||
      !price ||
      !manufacturer ||
      !stock ||
      !description ||
      !fitFor ||
      !categoryId
    ) {
      setError("Completa todos los campos del producto");
      return;
    }

    setLoadingProduct(true);
    setError("");

    try {
      const response = await fetch("http://localhost:4002/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          name: productName,
          price: Number(price),
          manufacturer,
          stock: Number(stock),
          description,
          fitFor,
          status,
          categoryId: Number(categoryId),
        }),
      });

      if (!response.ok) throw new Error("Error al crear el producto");

      // Limpiar campos
      setProductName("");
      setPrice("");
      setManufacturer("");
      setStock("");
      setDescription("");
      setFitFor("");
      setStatus("AVAILABLE");
      setCategoryId("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingProduct(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-2xl mt-10">
      <h3 className="text-lg text-gray-600 mb-4">Agregar Producto</h3>
      <form onSubmit={handleAddProduct} className="flex flex-col gap-3 mb-6">
        <input
          type="text"
          placeholder="Nombre"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="input border px-3 py-2 rounded"
        />
        <input
          type="number"
          placeholder="Precio"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="input border px-3 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Fabricante"
          value={manufacturer}
          onChange={(e) => setManufacturer(e.target.value)}
          className="input border px-3 py-2 rounded"
        />
        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="input border px-3 py-2 rounded"
        />
        <textarea
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input border px-3 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Fit For"
          value={fitFor}
          onChange={(e) => setFitFor(e.target.value)}
          className="input border px-3 py-2 rounded"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="input border px-3 py-2 rounded"
        >
          <option value="AVAILABLE">Disponible</option>
          <option value="UNAVAILABLE">No disponible</option>
        </select>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="input border px-3 py-2 rounded"
        >
          <option value="">Selecciona una categoría</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.description}
            </option>
          ))}
        </select>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={loadingProduct}
          className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition disabled:bg-red-300"
        >
          {loadingProduct ? "Agregando..." : "Agregar Producto"}
        </button>
      </form>
    </div>
  );
};

export default AddProducts;