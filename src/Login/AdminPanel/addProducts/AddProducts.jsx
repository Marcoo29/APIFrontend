import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../../redux/productSlice";

export default function AddProducts({ user }) {
  const dispatch = useDispatch();

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
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const categories = useSelector((state) => state.categories.items);

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

    setLoading(true);
    setError("");

    try {
      await dispatch(
        createProduct({
          product: {
            name: productName.trim(),
            price: Number(price),
            manufacturer: manufacturer.trim(),
            stock: Number(stock),
            description: description.trim(),
            fitFor: fitFor.trim(),
            productStatus: status,
            categoryId
          },
          image,
          token: user.token,
        })
      ).unwrap();

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

      alert("Producto creado correctamente con imagen!");
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
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
    <div className="w-full bg-white border border-[#dcdcdc] shadow-sm p-8 mt-10">
      <h3 className="text-xl font-semibold text-[#333] mb-6 border-b pb-3">
        Gestión de Productos
      </h3>

      <form onSubmit={handleAddProduct} className="flex flex-col gap-1.5">

        {/* Nombre */}
        <label className="text-sm font-medium text-[#444]">Nombre del producto</label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="border border-[#ccc] px-3 py-2 text-sm"
        />

        {/* Precio */}
        <label className="text-sm font-medium text-[#444]">Precio</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border border-[#ccc] px-3 py-2 text-sm"
        />

        {/* Fabricante */}
        <label className="text-sm font-medium text-[#444]">Fabricante</label>
        <input
          type="text"
          value={manufacturer}
          onChange={(e) => setManufacturer(e.target.value)}
          className="border border-[#ccc] px-3 py-2 text-sm"
        />

        {/* Stock */}
        <label className="text-sm font-medium text-[#444]">Stock disponible</label>
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="border border-[#ccc] px-3 py-2 text-sm"
        />

        {/* Descripción */}
        <label className="text-sm font-medium text-[#444]">Descripción</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-[#ccc] px-3 py-2 text-sm min-h-[80px]"
        />

        {/* FitFor */}
        <label className="text-sm font-medium text-[#444]">Vehículo al que aplica</label>
        <input
          type="text"
          value={fitFor}
          onChange={(e) => setFitFor(e.target.value)}
          className="border border-[#ccc] px-3 py-2 text-sm"
        />

        {/* Estado */}
        <label className="text-sm font-medium text-[#444]">Estado del producto</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border border-[#ccc] px-3 py-2 text-sm bg-white"
        >
          <option value="AVAILABLE">Disponible</option>
          <option value="UNAVAILABLE">No disponible</option>
        </select>

        {/* Categoría */}
        <label className="text-sm font-medium text-[#444]">Categoría</label>
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

        {/* Imagen */}
        <label className="text-sm font-medium text-[#444]">Imagen del producto</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />

        {preview && (
          <img
            src={preview}
            alt="Vista previa"
            className="w-24 h-24 object-cover border border-[#ddd] rounded mt-2"
          />
        )}

        {error && <p className="text-[#D32F2F] text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full bg-[#D32F2F] text-white py-2 font-medium tracking-wide
                     hover:bg-[#b71c1c] transition-all disabled:bg-[#ef9a9a] disabled:cursor-not-allowed"
        >
          {loading ? "Agregando..." : "Agregar Producto"}
        </button>
      </form>
    </div>
  );
}
