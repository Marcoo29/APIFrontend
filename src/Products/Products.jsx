import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import CardList from "./CardList";
import Categories from "./Categories";
import Pagination from "./Pagination";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductsFiltered } from "../redux/productSlice";

const Products = () => {
  const { categoryName } = useParams();

  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const initialSearch = searchParams.get("search") || "";
  const queryCategory = searchParams.get("category") || null;

  const categories = useSelector((state) => state.categories.items);

  const [selectedCategory, setSelectedCategory] = useState(
    categoryName || queryCategory || null
  );
  const dispatch = useDispatch();
  const {
    items: products,
    totalItems,
    totalPages,
    loading,
  } = useSelector((state) => state.products);
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [sortOption, setSortOption] = useState("name-asc");
  const [layoutView, setLayoutView] = useState("grid");
  const [searchTerm, setSearchTerm] = useState(initialSearch);

  const sizeParam = itemsPerPage === "all" ? totalItems || 1000 : itemsPerPage;

  useEffect(() => {
    const paramSearch =
      new URLSearchParams(location.search).get("search") || "";
    setSearchTerm(paramSearch);
  }, [location.search]);

  useEffect(() => {
    setPage(0);
  }, [searchTerm, sortOption, itemsPerPage, selectedCategory]);

  useEffect(() => {
    let categoryId = selectedCategory;

    const load = async () => {
      if (selectedCategory && isNaN(Number(selectedCategory))) {
        const found = categories.find(
          (c) =>
            c.description.toLowerCase().trim() ===
            selectedCategory.toLowerCase().trim()
        );

        categoryId = found ? found.id : null;
      }

      dispatch(
        fetchProductsFiltered({
          page,
          size: sizeParam,
          sort: sortOption,
          searchTerm,
          categoryId,
        })
      );
    };

    load();
  }, [selectedCategory, page, sizeParam, sortOption, searchTerm]);

  return (
    <section className="relative flex min-h-screen w-full flex-col bg-[#f6f6f6]">
      <main className="container mx-auto flex-1 px-4 py-8 sm:px-6 lg:px-8 mt-16">
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

            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-red-600 transition-colors"
                aria-label="Borrar búsqueda"
              >
                <span className="material-symbols-outlined text-[20px]">
                  close
                </span>
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-[1fr_3fr] gap-8">
          <Categories onCategorySelect={setSelectedCategory} />

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
