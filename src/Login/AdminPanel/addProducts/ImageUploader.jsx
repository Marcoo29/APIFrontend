export default function ImageUploader({ image, preview, setImage, setPreview }) {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex flex-col">
      <label className="text-sm text-[#555] mb-2 font-medium">
        Imagen del producto
      </label>

      <div className="flex items-center justify-between border border-[#ccc] px-3 py-2 bg-[#fafafa]">
        <label
          htmlFor="file-upload"
          className="bg-[#D32F2F] text-white px-4 py-1.5 text-sm font-medium cursor-pointer hover:bg-[#b71c1c]"
        >
          Seleccionar archivo
        </label>

        <input
          id="file-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />

        <span className="text-sm text-gray-600 truncate ml-3">
          {image ? image.name : "Ningún archivo seleccionado"}
        </span>
      </div>

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
  );
}
