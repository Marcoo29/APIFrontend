import { useState } from "react";
import ProductInputs from "./ProductInputs";
import ImageUploader from "./ImageUploader";
import SubmitButton from "./SubmitButton";

const API_BASE = "http://localhost:4002";

export default function AddProducts({ categories, user, products, setProducts }) {
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

    if (!productName || !price || !manufacturer || !stock || !description || !fitFor || !categoryId || !image) {
      setError("Completa todos los campos del producto, incluida la imagen.");
      return;
    }

    setLoadingProduct(true);
    setError("");

    try {
      const productPayload = {
        name: productName.trim(),
        price: Number(price),
        manufacturer: manufacturer.trim(),
        stock: Number(stock),
        description: description.trim(),
        fitFor: fitFor.trim(),
        productStatus: status,
        categoryId,
      };

      const createRes = await fetch(`${API_BASE}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(productPayload),
      });

      if (!createRes.ok) throw new Error(await createRes.text());

      const created = await createRes.json();
      const productId = created?.id ?? created?.productId;
      if (!productId) throw new Error("No se recibió el ID del producto creado.");

      const fd = new FormData();
      fd.append("productId", productId.toString());
      fd.append("name", productName);
      fd.append("file", image);

      const uploadRes = await fetch(`${API_BASE}/images`, {
        method: "POST",
        headers: { Authorization: `Bearer ${user.token}` },
        body: fd,
      });

      if (!uploadRes.ok) throw new Error("Error al subir la imagen.");

      setProducts((prev) => [...prev, created]);

      // Reset
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

  return (
    <div className="w-full bg-white border border-[#dcdcdc] shadow-sm p-8">
      <h3 className="text-xl font-semibold text-[#333] mb-6 border-b pb-3">
        Gestión de Productos
      </h3>

      <form onSubmit={handleAddProduct} className="flex flex-col gap-4">

        <ProductInputs
          productName={productName}
          setProductName={setProductName}
          price={price}
          setPrice={setPrice}
          manufacturer={manufacturer}
          setManufacturer={setManufacturer}
          stock={stock}
          setStock={setStock}
          description={description}
          setDescription={setDescription}
          fitFor={fitFor}
          setFitFor={setFitFor}
          status={status}
          setStatus={setStatus}
          categoryId={categoryId}
          setCategoryId={setCategoryId}
          categories={categories}
        />

        <ImageUploader
          image={image}
          preview={preview}
          setImage={setImage}
          setPreview={setPreview}
        />

        {error && <p className="text-[#D32F2F] text-sm">{error}</p>}

        <SubmitButton loading={loadingProduct} />
      </form>
    </div>
  );
}
