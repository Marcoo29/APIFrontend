// Products.jsx
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

  // Actualizar búsqueda si cambia el parámetro en la URL
  useEffect(() => {
    const paramSearch =
      new URLSearchParams(location.search).get("search") || "";
    setSearchTerm(paramSearch);
  }, [location.search]);

  // Resetear página cuando cambian búsqueda, sort, itemsPerPage o categoría
  useEffect(() => {
    setPage(0);
  }, [searchTerm, sortOption, itemsPerPage, selectedCategory]);

  // Fetch de productos
  useEffect(() => {
    let url;

    if (selectedCategory) {
      url = `http://localhost:4002/products/by-category/${selectedCategory}?page=${page}&size=${sizeParam}&sort=${sortOption}`;
    } else {
      url = `http://localhost:4002/products?page=${page}&size=${sizeParam}&sort=${sortOption}&searchTerm=${encodeURIComponent(
        searchTerm || ""
      )}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        let fetchedProducts = [];
        let total = 0;
        let pages = 1;

        if (Array.isArray(data)) {
          // endpoint /by-category que devuelve solo array
          fetchedProducts = data;
          total = data.length;
          pages = 1;
        } else {
          // endpoint paginado /products
          fetchedProducts = data.content || [];
          total = data.totalItems || fetchedProducts.length;
          pages = data.totalPages || 1;
        }

        setProducts(fetchedProducts);
        setTotalItems(total);
        setTotalPages(pages);
      })
      .catch((err) => console.error("Error cargando productos:", err));
  }, [selectedCategory, page, sizeParam, sortOption, searchTerm]);

  return (
    <section className="relative flex min-h-screen w-full flex-col bg-[#f6f6f6]">
      <main className="container mx-auto flex-1 px-4 py-8 sm:px-6 lg:px-8 mt-16">
        {/* Buscador */}
        <div className="absolute top-[15px] left-1/2 -translate-x-1/2 w-full max-w-2xl px-6 z-40">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded-none py-2.5 pl-10 pr-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent shadow-sm bg-white"
            />
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-400">
              search
            </span>
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
