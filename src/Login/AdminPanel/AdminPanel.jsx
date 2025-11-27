import { useState } from "react";
import AddCategories from "./addCategories/AddCategories";
import AddProducts from "./addProducts/AddProducts";
import ModifyProducts from "./modifyProducts/ModifyProducts";

import { useSelector } from "react-redux";

const AdminPanel = () => {
  const user = useSelector((state) => state.auth);

  const [section, setSection] = useState("categories");

  if (!user || !user.id) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#F5F5F5]">
        <p className="text-gray-700 text-lg">Debés iniciar sesión para acceder.</p>
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
    <div className="min-h-screen flex bg-[#F5F5F5] p-6">

      {/* 🟥 MENÚ LATERAL COMO TARJETA */}
      <aside className="w-72 bg-white border border-gray-200 shadow-sm rounded-lg p-6 h-fit flex flex-col gap-6 mt-10">

        <h2 className="text-xl font-bold text-gray-700 text-center border-b pb-2">
          Panel de Administrador
        </h2>

        {/* Botones del Menú */}
        <div className="flex flex-col gap-3">

          {/* Crear Categoría */}
          <button
            onClick={() => setSection("categories")}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-md font-medium text-sm border transition
              ${section === "categories"
                ? "bg-[#D32F2F] text-white border-[#D32F2F]"
                : "bg-white text-[#333] border-[#ccc] hover:bg-[#f5f5f5]"
              }
            `}
          >
            <span className="material-symbols-outlined">category</span>
            Crear Categoría
          </button>

          {/* Crear Producto */}
          <button
            onClick={() => setSection("products")}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-md font-medium text-sm border transition
              ${section === "products"
                ? "bg-[#D32F2F] text-white border-[#D32F2F]"
                : "bg-white text-[#333] border-[#ccc] hover:bg-[#f5f5f5]"
              }
            `}
          >
            <span className="material-symbols-outlined">add</span>
            Crear Producto
          </button>

          {/* Modificar Productos */}
          <button
            onClick={() => setSection("modify")}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-md font-medium text-sm border transition
              ${section === "modify"
                ? "bg-[#D32F2F] text-white border-[#D32F2F]"
                : "bg-white text-[#333] border-[#ccc] hover:bg-[#f5f5f5]"
              }
            `}
          >
            <span className="material-symbols-outlined">edit</span>
            Modificar Productos
          </button>

        </div>

      </aside>

      {/* 🔥 CONTENIDO PRINCIPAL */}
      <main className="flex-1 ml-6">
        {section === "categories" && <AddCategories user={user} />}
        {section === "products" && <AddProducts user={user} />}
        {section === "modify" && <ModifyProducts user={user} />}
      </main>

    </div>
  );
};

export default AdminPanel;
