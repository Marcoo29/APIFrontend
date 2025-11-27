export default function ModifyProductsPagination({ currentPage, totalPages, setCurrentPage }) {
  return (
    <div className="flex justify-center items-center gap-4 mt-4">
      <button
        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
        disabled={currentPage === 1}
        className={`px-3 py-1 border rounded ${
          currentPage === 1
            ? "text-gray-400 border-gray-300 cursor-not-allowed"
            : "text-[#D32F2F] border-[#D32F2F] hover:bg-[#D32F2F] hover:text-white transition"
        }`}
      >
        Anterior
      </button>

      <span className="text-sm text-gray-600">
        Página {currentPage} de {totalPages}
      </span>

      <button
        onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 border rounded ${
          currentPage === totalPages
            ? "text-gray-400 border-gray-300 cursor-not-allowed"
            : "text-[#D32F2F] border-[#D32F2F] hover:bg-[#D32F2F] hover:text-white transition"
        }`}
      >
        Siguiente
      </button>
    </div>
  );
}
