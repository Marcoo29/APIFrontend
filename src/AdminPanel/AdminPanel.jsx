import { useState, useEffect } from "react";
import AddCategories from "./AddCategories";
import AddProducts from "./AddProducts";

const AdminPanel = () => {
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(null);

  // Leer usuario del localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-700 text-lg">Cargando usuario...</p>
      </div>
    );
  }

  if (user.role !== "ADMIN") {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg font-semibold">
          🚫 Acceso denegado. Solo administradores.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 rounded-2xl mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Panel de Administración
      </h2>

      {/* Contenedor de columnas */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Columna de Categorías */}
        <div className="flex-2">
          <AddCategories categories={categories} setCategories={setCategories} user={user} />
        </div>

        {/* Columna de Productos */}
        <div className="flex-1">
          <AddProducts categories={categories} user={user} />
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
