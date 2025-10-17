import Card from "./Card";

export default function CardList({ products = [], layoutView = "grid" }) {
  // Si no hay productos, placeholder visual simple
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
        <div
          key={product.id}
          className={
            layoutView === "list"
              ? "flex items-center border border-gray-200 p-4 rounded-sm bg-white hover:shadow-sm transition"
              : ""
          }
        >
          {/* Si está en vista lista, mostramos imagen al costado */}
          {layoutView === "list" && (
            <img
              src={product.images?.[0]?.url || "https://via.placeholder.com/150"}
              alt={product.name}
              className="w-24 h-24 object-contain mr-6"
            />
          )}

          {/* Card reutilizada */}
          <div className={layoutView === "list" ? "flex-1" : ""}>
            <Card
              id={product.id}
              title={product.name}
              price={product.price}
              image={product.images?.[0]?.url}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
