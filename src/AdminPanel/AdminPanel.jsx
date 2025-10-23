import { useState, useEffect } from "react";
import AddCategories from "./AddCategories";
import AddProducts from "./AddProducts";
import ModifyProducts from "./ModifyProducts"; // 🆕 Import agregado

const AdminPanel = () => {
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
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
      {/* Contenedor principal centrado */}
      <div className="w-full max-w-7xl mx-auto text-center px-10 mt-14 py-5">
        <h2 className="text-2xl font-bold text-[#333] border-b border-[#ddd] pb-3 mb-6">
          Panel de Administrador
        </h2>

        {/* 🧱 Contenedor en dos columnas sin gap superior extra */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Bloque izquierdo */}
          <AddCategories
            categories={categories}
            setCategories={setCategories}
            user={user}
          />

          {/* Bloque derecho */}
          <AddProducts categories={categories} user={user} />
        </div>

        {/* 🔽 Nuevo bloque al final */}
        <div className="mt-10">
          <ModifyProducts user={user} />
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
