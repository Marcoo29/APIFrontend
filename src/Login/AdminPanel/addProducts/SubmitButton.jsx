export default function SubmitButton({ loading }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="mt-4 w-full bg-[#D32F2F] text-white py-2 font-medium tracking-wide
                 hover:bg-[#b71c1c] transition-all disabled:bg-[#ef9a9a] disabled:cursor-not-allowed"
    >
      {loading ? "Agregando..." : "Agregar Producto"}
    </button>
  );
}
