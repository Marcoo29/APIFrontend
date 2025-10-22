import { useState } from "react";

const AddProducts = ({ categories, user }) => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [fitFor, setFitFor] = useState("");
  const [status, setStatus] = useState("AVAILABLE");
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
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
      !categoryId ||
      !image
    ) {
      setError("Completa todos los campos del producto, incluida la imagen.");
      return;
    }

    setLoadingProduct(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("name", productName);
      formData.append("price", price);
      formData.append("manufacturer", manufacturer);
      formData.append("stock", stock);
      formData.append("description", description);
      formData.append("fitFor", fitFor);
      formData.append("status", status);
      formData.append("categoryId", categoryId);
      formData.append("image", image);

      const response = await fetch("http://localhost:4002/products", {
        method: "POST",
        headers: { Authorization: `Bearer ${user.token}` },
        body: formData,
      });

      if (!response.ok) throw new Error("Error al crear el producto");

      // limpiar campos
      setProductName("");
      setPrice("");
      setManufacturer("");
      setStock("");
      setDescription("");
      setFitFor("");
      setStatus("AVAILABLE");
      setCategoryId("");
      setImage(null);
      setPreview(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingProduct(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="w-full bg-white border border-[#dcdcdc] shadow-sm p-8">
      <h3 className="text-xl font-semibold text-[#333] mb-6 border-b pb-3">
        Gestión de Productos
      </h3>

      <form onSubmit={handleAddProduct} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Nombre"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="border border-[#ccc] px-3 py-2 text-sm focus:outline-none focus:border-[#D32F2F]"
        />
        <input
          type="number"
          placeholder="Precio"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border border-[#ccc] px-3 py-2 text-sm focus:outline-none focus:border-[#D32F2F]"
        />
        <input
          type="text"
          placeholder="Fabricante"
          value={manufacturer}
          onChange={(e) => setManufacturer(e.target.value)}
          className="border border-[#ccc] px-3 py-2 text-sm focus:outline-none focus:border-[#D32F2F]"
        />
        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="border border-[#ccc] px-3 py-2 text-sm focus:outline-none focus:border-[#D32F2F]"
        />
        <textarea
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-[#ccc] px-3 py-2 text-sm focus:outline-none focus:border-[#D32F2F] min-h-[80px]"
        />
        <input
          type="text"
          placeholder="Vehículo al que aplica"
          value={fitFor}
          onChange={(e) => setFitFor(e.target.value)}
          className="border border-[#ccc] px-3 py-2 text-sm focus:outline-none focus:border-[#D32F2F]"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border border-[#ccc] px-3 py-2 text-sm bg-white focus:outline-none focus:border-[#D32F2F]"
        >
          <option value="AVAILABLE">Disponible</option>
          <option value="UNAVAILABLE">No disponible</option>
        </select>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="border border-[#ccc] px-3 py-2 text-sm bg-white focus:outline-none focus:border-[#D32F2F]"
        >
          <option value="">Selecciona una categoría</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.description}
            </option>
          ))}
        </select>

        {/* 🎨 Campo de imagen personalizado */}
        <div className="flex flex-col">
          <label className="text-sm text-[#555] mb-2 font-medium">
            Imagen del producto
          </label>

          <div className="flex items-center justify-between border border-[#ccc] rounded px-3 py-2 bg-[#fafafa]">
            <label
              htmlFor="file-upload"
              className="bg-[#D32F2F] text-white px-4 py-1.5 text-sm font-medium cursor-pointer hover:bg-[#b71c1c] transition-all"
            >
              Seleccionar archivo
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <span className="text-sm text-gray-600 truncate ml-3">
              {image ? image.name : "Ningún archivo seleccionado"}
            </span>
          </div>

          {/* Mini preview */}
          {preview && (
            <div className="mt-3">
              <img
                src={preview}
                alt="Vista previa"
                className="w-24 h-24 object-cover border border-[#ddd] rounded"
              />
            </div>
          )}
        </div>

        {error && <p className="text-[#D32F2F] text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loadingProduct}
          className="mt-4 w-full bg-[#D32F2F] text-white py-2 font-medium tracking-wide
                     hover:bg-[#b71c1c] transition-all disabled:bg-[#ef9a9a] disabled:cursor-not-allowed"
        >
          {loadingProduct ? "Agregando..." : "Agregar Producto"}
        </button>
      </form>
    </div>
  );
};

export default AddProducts;
