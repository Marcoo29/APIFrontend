import { useState } from "react";
import ProductInputs from "./ProductInputs";
import ImageUploader from "./ImageUploader";
import SubmitButton from "./SubmitButton";
import { useProducts } from "./useProducts";
import { useSelector } from "react-redux";

export default function AddProducts({ user }) {
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

  const {
    products,
    loadingProducts,
    addProduct,
  } = useProducts(user);

  const categories = useSelector(state => state.categories.items);

  const handleAddProduct = (e) => {
    e.preventDefault();

    if (!productName || !price || !manufacturer || !stock || !description || !fitFor || !categoryId || !image) {
      setError("Completa todos los campos del producto, incluida la imagen.");
      return;
    }

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

    addProduct(productPayload, image);

    setProductName(""); setPrice(""); setManufacturer(""); setStock("");
    setDescription(""); setFitFor(""); setStatus("AVAILABLE"); setCategoryId("");
    setImage(null); setPreview(null); setError("");
  };

  return (
    <div className="w-full bg-white border border-[#dcdcdc] shadow-sm p-8">
      <h3 className="text-xl font-semibold text-[#333] mb-6 border-b pb-3">
        Gestión de Productos
      </h3>

      <form onSubmit={handleAddProduct} className="flex flex-col gap-4">
        <ProductInputs
          productName={productName} setProductName={setProductName}
          price={price} setPrice={setPrice}
          manufacturer={manufacturer} setManufacturer={setManufacturer}
          stock={stock} setStock={setStock}
          description={description} setDescription={setDescription}
          fitFor={fitFor} setFitFor={setFitFor}
          status={status} setStatus={setStatus}
          categoryId={categoryId} setCategoryId={setCategoryId}
          categories={categories}
        />

        <ImageUploader
          image={image} preview={preview}
          setImage={setImage} setPreview={setPreview}
        />

        {error && <p className="text-[#D32F2F] text-sm">{error}</p>}

        <SubmitButton loading={loadingProducts} />
      </form>
    </div>
  );
}
