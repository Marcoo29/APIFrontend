import { useState, useEffect } from "react";
import AddCategories from "./AddCategories";
import AddProducts from "./AddProducts";
import ModifyProducts from "./ModifyProducts";

const AdminPanel = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]); // ✅ nuevo estado compartido
  const [user, setUser] = useState(null);

  // 🔄 Cargar productos una sola vez aquí
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      // 🔄 Cargar productos al inicio
      const url =
        parsedUser.role === "ADMIN"
          ? "http://localhost:4002/products/all"
          : "http://localhost:4002/products";

      fetch(url, {
        headers: { Authorization: `Bearer ${parsedUser.token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          const productsArray = Array.isArray(data) ? data : data.content || [];
          setProducts(productsArray);
        })
        .catch((err) => console.error("Error al cargar productos:", err));
    }
  }, []);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#F5F5F5]">
        <p className="text-gray-700 text-lg">Cargando usuario...</p>
      </div>
    );
  }

  if (user.role !== "ADMIN") {
    return (
      <div className="flex justify-center items-center h-screen bg-[#F5F5F5]">
        <p className="text-[#D32F2F] text-lg font-semibold">
          🚫 Acceso denegado. Solo administradores.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#F5F5F5] flex flex-col">
      <div className="w-full max-w-7xl mx-auto text-center px-10 mt-14 py-5">
        <h2 className="text-2xl font-bold text-[#333] border-b border-[#ddd] pb-3 mb-6">
          Panel de Administrador
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <AddCategories
            categories={categories}
            setCategories={setCategories}
            user={user}
          />

          {/* 🔧 Ahora AddProducts actualiza el estado global */}
          <AddProducts
            categories={categories}
            user={user}
            products={products}
            setProducts={setProducts}
          />
        </div>

        <div className="mt-10">
          {/* 🔧 ModifyProducts usa el mismo estado */}
          <ModifyProducts user={user} products={products} setProducts={setProducts} />
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
