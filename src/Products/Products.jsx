import { useEffect, useState } from "react";
import CardList from "./CardList";
import Categories from "./Categories";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4002/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => {
        console.error("Error fetching products:", err);
        // placeholder si falla el fetch
        const placeholderProducts = Array.from({ length: 12 }, (_, i) => ({
          id: i + 1,
          name: `Producto de ejemplo ${i + 1}`,
          price: 1000 + i * 10,
          images: [{ url: "https://via.placeholder.com/150" }],
        }));
        setProducts(placeholderProducts);
      });
  }, []);

  return (
    <section className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark" id="home">
      {/* HEADER */}
      <header className="sticky top-0 z-10 w-full border-b border-primary/20 bg-background-light/80 dark:border-primary/30 dark:bg-background-dark/80 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8">
            <a className="flex items-center gap-3 text-xl font-bold text-[#221010] dark:text-[#f8f5f5]" href="#"></a>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="container mx-auto flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <Categories />

        <div className="grid grid-cols-[0.7fr_3fr] gap-6">
          <div>asd</div>
          <CardList products={products} />
        </div>
      </main>
    </section>
  );
};

export default Products;
