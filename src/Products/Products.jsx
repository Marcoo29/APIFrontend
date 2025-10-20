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
  const sizeParam = itemsPerPage === "all" ? totalItems || 1000 : itemsPerPage;


  // 🔹 Resetear página cuando cambian búsqueda, sort o itemsPerPage
  useEffect(() => {
    setPage(0);
  }, [searchTerm, sortOption, itemsPerPage]);

  // 🔹 Fetch de productos
  useEffect(() => {
    fetch(
      `http://localhost:4002/products?page=${page}&size=${itemsPerPage}&sort=${sortOption}&searchTerm=${searchTerm}`
    )
      .then((res) => res.json())
      .then((data) => {
        let fetchedProducts = data.content || [];

        // Filtrar por categoría en frontend si hay seleccionada
        if (selectedCategory) {
          fetchedProducts = fetchedProducts.filter(
            (p) =>
              p.category?.name === selectedCategory ||
              p.categoryName === selectedCategory
          );
        }

        setProducts(fetchedProducts);
        setTotalItems(data.totalElements || fetchedProducts.length);
        setTotalPages(data.totalPages || 1);
      })
      .catch((err) => console.error("Error cargando productos:", err));
  }, [page, itemsPerPage, sortOption, searchTerm, selectedCategory]);

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
          </div>
        </div>

        <div className="grid grid-cols-[1fr_3fr] gap-8">
          {/* 📂 Categorías */}
          <Categories onCategorySelect={setSelectedCategory} />

          {/* 🧱 Productos */}
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
              <CardList products={products} layoutView={layoutView} />
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
