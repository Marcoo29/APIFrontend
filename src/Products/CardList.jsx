import { useState, useEffect } from "react";
import Card from "./Card";
import Pagination from "./Pagination";

export default function CardList({
  backendUrl = "http://localhost:4002/products",
}) {
  const [products, setProducts] = useState([]); // inicial vacío
  const [page, setPage] = useState(0);
  const cardsPerPage = 12;

  // Placeholder mientras llega el fetch
  const placeholderProducts = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: `Producto de ejemplo ${i + 1}`,
    price: 1000 + i * 10,
    images: [{ url: "https://via.placeholder.com/150" }],
  }));

  // Fetch al backend
  useEffect(() => {
    fetch(backendUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log("Datos recibidos:", data);
        if (Array.isArray(data.content) && data.content.length > 0) {
          setProducts(data.content); // <-- usamos content
        }
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, [backendUrl]);

  // Usamos productos reales si existen, sino placeholders
  const safeProducts = products.length > 0 ? products : placeholderProducts;

  // Paginación
  const pages = [];
  for (let i = 0; i < safeProducts.length; i += cardsPerPage) {
    pages.push(safeProducts.slice(i, i + cardsPerPage));
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {pages[page]?.map((product) => (
          <Card
            key={product.id}
            id={product.id}
            title={product.name}
            price={product.price}
            image={product.images?.[0]?.url}
          />
        ))}
      </div>

      <Pagination
        page={page}
        totalPages={pages.length}
        onPageChange={setPage}
      />
    </div>
  );
}
