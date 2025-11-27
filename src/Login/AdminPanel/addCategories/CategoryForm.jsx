export default function CategoryForm({
  onSubmit,
  loading,
  value,
  setValue,
}) {

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col sm:flex-row gap-3 mb-6"
    >
      <input
        type="text"
        placeholder="Nombre de la nueva categoría"
        className="flex-1 border border-gray-300 px-3 py-2 text-sm"
        value={value}
        onChange={(e) => setValue(e.target.value)} //captura el valor que ingresa el usuario
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-red-700 text-white px-5 py-2 font-medium hover:bg-red-800"
      >
        {loading ? "Agregando..." : "Agregar"}
      </button>
    </form>
  );
}
