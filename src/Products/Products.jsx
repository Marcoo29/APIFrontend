import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import CardList from "./CardList";
import Categories from "./Categories";
import Pagination from "./Pagination";

const Products = () => {
  const { categoryName } = useParams();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const initialSearch = searchParams.get("search") || "";
  const queryCategory = searchParams.get("category") || null;

  const [selectedCategory, setSelectedCategory] = useState(
    categoryName || queryCategory || null
  );
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [sortOption, setSortOption] = useState("name-asc");
  const [layoutView, setLayoutView] = useState("grid");
  const [searchTerm, setSearchTerm] = useState(initialSearch);

  const sizeParam = itemsPerPage === "all" ? totalItems || 1000 : itemsPerPage;

  // 🔹 Actualizar búsqueda si cambia el parámetro en la URL
  useEffect(() => {
    const paramSearch =
      new URLSearchParams(location.search).get("search") || "";
    setSearchTerm(paramSearch);
  }, [location.search]);

  // 🔹 Resetear página cuando cambian filtros
  useEffect(() => {
    setPage(0);
  }, [searchTerm, sortOption, itemsPerPage, selectedCategory]);

  // 🔹 Fetch de productos (acepta categoría por nombre o ID) con búsqueda
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url;

        if (selectedCategory) {
          let categoryId = selectedCategory;

          // Si la categoría es texto (no número), buscar su ID real
          if (isNaN(Number(selectedCategory))) {
            const catRes = await fetch(
              `http://localhost:4002/categories?page=0&size=100`
            );
            const catData = await catRes.json();

            const fetched =
              catData?.content && Array.isArray(catData.content)
                ? catData.content
                : Array.isArray(catData)
                ? catData
                : [];

            const match = fetched.find(
              (c) =>
                c.description.toLowerCase().trim() ===
                selectedCategory.toLowerCase().trim()
            );

            if (match) categoryId = match.id;
            else categoryId = null; // No existe → mostrar todos
          }

          if (categoryId) {
            // 🔹 Aquí agregamos searchTerm al URL de by-category
            url = `http://localhost:4002/products/by-category/${categoryId}?page=${page}&size=${sizeParam}&sort=${sortOption}&searchTerm=${encodeURIComponent(searchTerm || "")}`;
          } else {
            url = `http://localhost:4002/products?page=${page}&size=${sizeParam}&sort=${sortOption}&searchTerm=${encodeURIComponent(
              searchTerm || ""
            )}`;
          }
        } else {
          // Sin categoría seleccionada → todos los productos
          url = `http://localhost:4002/products?page=${page}&size=${sizeParam}&sort=${sortOption}&searchTerm=${encodeURIComponent(
            searchTerm || ""
          )}`;
        }

        const res = await fetch(url);
        const data = await res.json();

        let fetchedProducts = [];
        let total = 0;
        let pages = 1;

        if (Array.isArray(data)) {
          fetchedProducts = data;
          total = data.length;
          pages = 1;
        } else {
          fetchedProducts = data.content || [];
          total = data.totalElements || fetchedProducts.length;
          pages = data.totalPages || 1;
        }

        setProducts(fetchedProducts);
        setTotalItems(total);
        setTotalPages(pages);
      } catch (err) {
        console.error("Error cargando productos:", err);
      }
    };

    fetchProducts();
  }, [selectedCategory, page, sizeParam, sortOption, searchTerm]);

  return (
    <section className="relative flex min-h-screen w-full flex-col bg-[#f6f6f6]">
      <main className="container mx-auto flex-1 px-4 py-8 sm:px-6 lg:px-8 mt-16">

      {/* 🔍 Buscador */}
      <div className="absolute top-[15px] left-1/2 -translate-x-1/2 w-full max-w-2xl px-6 z-40">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-none py-2.5 pl-10 pr-10 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent shadow-sm bg-white"
          />
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-400">
            search
          </span>

          {/* ❌ Botón para limpiar búsqueda */}
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-red-600 transition-colors"
              aria-label="Borrar búsqueda"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          )}
        </div>
      </div>

        <div className="grid grid-cols-[1fr_3fr] gap-8">
          {/* 🗂 Categorías */}
          <Categories onCategorySelect={setSelectedCategory} />

          {/* 🛒 Productos */}
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
