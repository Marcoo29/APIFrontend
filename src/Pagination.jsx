export default function Pagination({ page, totalPages, onPageChange }) {
  return (
    <div className="flex justify-center mt-6 space-x-2">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 0}
        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
      >
        ⬅ Anterior
      </button>

      <span className="px-4 py-2">
        Página {page + 1} de {totalPages}
      </span>

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages - 1}
        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
      >
        Siguiente ➡
      </button>
    </div>
  );
}
