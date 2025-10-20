import { useEffect, useState } from "react";
import CardList from "./CardList";
import Categories from "./Categories";
import Pagination from "./Pagination";

const Products = () => {
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [sortOption, setSortOption] = useState("name-asc");
  const [layoutView, setLayoutView] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // 🔹 Si es "all", pedimos todos los productos
        const sizeParam = itemsPerPage === "all" ? 100000 : itemsPerPage;
        const pageParam = itemsPerPage === "all" ? 0 : page;

        const res = await fetch(
          `http://localhost:4002/products?page=${page}&size=${itemsPerPage}&sort=${sortOption}`
        );
        const data = await res.json();

        // Filtramos solo los disponibles
        const availableOnly = (data.content || []).filter(
          (p) => p.productStatus === "AVAILABLE"
        );

        setProducts(availableOnly);
        setTotalItems(availableOnly.length);

        // Calculamos totalPages solo si no es "all"
        setTotalPages(itemsPerPage === "all" ? 1 : data.totalPages || 1);

        // Resetear página si es "all"
        if (itemsPerPage === "all") setPage(0);
      } catch (err) {
        console.error("Error cargando productos:", err);
      }
    };

    fetchProducts();
  }, [page, itemsPerPage]);

  // 🔁 Ordenamiento global
  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === "name-asc")
      return a.name.localeCompare(b.name, "es", { sensitivity: "base" });
    if (sortOption === "name-desc")
      return b.name.localeCompare(a.name, "es", { sensitivity: "base" });
    if (sortOption === "price-asc") return a.price - b.price;
    if (sortOption === "price-desc") return b.price - a.price;
    return 0;
  });

  // 🔍 Filtrado por búsqueda y categoría
  const filteredProducts = sortedProducts.filter((p) => {
    const matchesSearch = p.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory
      ? p.category?.name === selectedCategory || p.categoryName === selectedCategory
      : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark">
      <main className="container mx-auto flex-1 px-4 py-8 sm:px-6 lg:px-8 mt-16">
        {/* 🔍 Buscador */}
        <div className="absolute top-[15px] left-1/2 -translate-x-1/2 w-full max-w-2xl px-6 z-40">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2.5 pl-10 pr-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent shadow-sm bg-white"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="red"
              className="w-5 h-5 absolute left-3 top-2.5 text-red-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
              />
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-[1fr_3fr] gap-8">
          {/* Categorías */}
          <Categories onCategorySelect={setSelectedCategory} />

          {/* Productos */}
          <div className="flex flex-col">
            <Pagination
              type="top"
              page={page}
              totalPages={totalPages}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              onPageChange={setPage}
              onSortChange={setSortOption}
              onItemsPerPageChange={setItemsPerPage}
              layoutView={layoutView}
              onLayoutChange={setLayoutView}
            />

            <div className="mt-6">
              <CardList products={filteredProducts} layoutView={layoutView} />
            </div>

            <Pagination
              type="bottom"
              page={page}
              totalPages={totalPages}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              onPageChange={setPage}
            />
          </div>
        </div>
      </main>
    </section>
  );
};

export default Products;
