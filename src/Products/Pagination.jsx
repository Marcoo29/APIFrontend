const Pagination = ({ page, totalPages, onPageChange }) => {
  const prevPage = () => {
    if (page > 0) onPageChange(page - 1);
  };

  const nextPage = () => {
    if (page < totalPages - 1) onPageChange(page + 1);
  };

  return (
    <div className="flex justify-center items-center mt-6 space-x-4">
      <button
        onClick={prevPage}
        disabled={page === 0}
        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
      >
        Anterior
      </button>
      <span>
        Página {page + 1} de {totalPages}
      </span>
      <button
        onClick={nextPage}
        disabled={page === totalPages - 1}
        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
      >
        Siguiente
      </button>
    </div>
  );
};

export default Pagination;
