const Pagination = ({
  type = "full",
  page,
  totalPages,
  totalItems,
  itemsPerPage,
  layoutView,
  onLayoutChange,
  onSortChange,
  onItemsPerPageChange,
  onPageChange,
}) => {
  const prevPage = () => page > 0 && onPageChange(page - 1);
  const nextPage = () => page < totalPages - 1 && onPageChange(page + 1);

  const handleSortChange = (e) => onSortChange?.(e.target.value);
  const handleItemsPerPageChange = (e) => {
    const value = e.target.value === "all" ? "all" : Number(e.target.value);
    onItemsPerPageChange?.(value);
  };

  const startItem =
    totalItems === 0 || itemsPerPage === "all" ? 0 : page * itemsPerPage + 1;
  const endItem =
    totalItems === 0 || itemsPerPage === "all"
      ? totalItems
      : Math.min((page + 1) * itemsPerPage, totalItems);

  return (
    <div
      className={`w-full flex flex-col font-display ${
        type === "bottom" ? "mt-8" : "mb-4"
      }`}
    >
      {type === "top" && (
        <div className="flex flex-wrap justify-between items-center border border-gray-200 rounded-sm bg-gray-50 px-4 py-3 text-sm shadow-sm">
          <div className="flex items-center gap-2 text-gray-500">
            <button
              onClick={() => onLayoutChange?.("grid")}
              className={`p-1 rounded-sm ${
                layoutView === "grid"
                  ? "text-red-600 border border-red-500"
                  : "hover:text-red-600 transition"
              }`}
              title="Vista en cuadrícula"
            >
              <span className="material-symbols-outlined">grid_view</span>
            </button>
            <button
              onClick={() => onLayoutChange?.("list")}
              className={`p-1 rounded-sm ${
                layoutView === "list"
                  ? "text-red-600 border border-red-500"
                  : "hover:text-red-600 transition"
              }`}
              title="Vista en lista"
            >
              <span className="material-symbols-outlined">view_list</span>
            </button>
          </div>

          <p className="text-gray-600 text-sm">
            Mostrando {startItem}-{endItem} de {totalItems} artículo(s)
          </p>

          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-gray-600 text-sm">
              Ordenar por:
            </label>
            <select
              id="sort"
              onChange={handleSortChange}
              className="border border-gray-300 text-sm px-2 py-1 focus:outline-none focus:ring-1 focus:ring-red-500"
            >
              <option value="name-asc">Nombre, A → Z</option>
              <option value="name-desc">Nombre, Z → A</option>
              <option value="price-asc">Precio, Menor → Mayor</option>
              <option value="price-desc">Precio, Mayor → Menor</option>
            </select>

            <select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="border border-gray-300 text-sm px-2 py-1 focus:outline-none focus:ring-1 focus:ring-red-500"
            >
              <option value="12">12</option>
              <option value="24">24</option>
              <option value="36">36</option>
              <option value="all">Todos</option>
            </select>
          </div>
        </div>
      )}

      {type === "bottom" && (
        <div className="flex justify-center items-center mt-4 space-x-4">
          <button
            onClick={prevPage}
            disabled={page === 0 || itemsPerPage === "all"}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-sm rounded disabled:opacity-50 transition"
          >
            Anterior
          </button>

          <span className="text-gray-700 text-sm">
            Página {page + 1} de {totalPages}
          </span>

          <button
            onClick={nextPage}
            disabled={page === totalPages - 1 || itemsPerPage === "all"}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-sm rounded disabled:opacity-50 transition"
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
};

export default Pagination;
