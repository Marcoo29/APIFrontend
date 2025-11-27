import { useNavigate } from "react-router-dom";
import Card from "./Card";

export default function CardList({ products = [], layoutView = "grid" }) {
  const navigate = useNavigate();

  if (products.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500 font-display">
        No se encontraron productos.
      </div>
    );
  }

  return (
    <div
      className={
        layoutView === "grid"
          ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          : "flex flex-col gap-4"
      }
    >
      {products.map((product) => (
        <Card
          key={product.id}
          id={product.id}
          title={product.name}
          price={product.price}
          manufacturer={product.manufacturer}
          layoutView={layoutView}   // 🔥 le pasamos la vista
        />
      ))}
    </div>
  );
}
