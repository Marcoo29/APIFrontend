import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const Navigation = () => {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const username = user?.name || null;
  const userRole = user?.role || null;

  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/home");
  };

  // Detectamos si estamos en login/register
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <header className="absolute top-0 left-0 w-full z-40 bg-transparent text-white">
      <nav className="container mx-auto px-6 py-2 flex justify-between items-center">
        {/* BOTÓN HAMBURGUESA */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 border border-red-600 text-red-600 rounded-sm hover:bg-red-600 hover:text-white transition-colors"
          aria-label="Abrir menú"
        >
          <span className="material-symbols-outlined text-2xl">
            {menuOpen ? "close" : "menu"}
          </span>
        </button>

        {/* ICONOS DERECHA */}
        {!isAuthPage && (
          <div className="flex items-center gap-4 text-lg">
            {username && (location.pathname === "/home" || location.pathname === "/") && (
              <span className="text-red-600 text-lg font-semibold">
                Hola, {username}
              </span>
            )}

            {username ? (
              <button
                onClick={handleLogout}
                className="text-red-600 hover:underline"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="text-red-600 hover:text-red-800 transition-colors"
                title="Ingreso/Registro"
              >
                <span className="material-symbols-outlined text-2xl">
                  person
                </span>
              </Link>
            )}

            <button className="relative text-red-600 hover:text-red-800">
              <span className="material-symbols-outlined text-2xl">
                shopping_cart
              </span>
              <span className="absolute -top-1 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                3
              </span>
            </button>
          </div>
        )}
      </nav>

      {/* OVERLAY */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 bg-black/40 transition-opacity duration-200 z-[45] ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* MENÚ LATERAL */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-white dark:bg-[#1f1f1f] border-r border-gray-200 dark:border-gray-700 z-[50] transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <span className="font-bold text-gray-900 dark:text-white">Menú</span>
          <button
            onClick={() => setMenuOpen(false)}
            className="p-1 text-gray-500 hover:text-red-600"
            aria-label="Cerrar menú"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <nav className="p-2">
          <Link
            to="/home"
            onClick={() => setMenuOpen(false)}
            className="block px-4 py-3 text-gray-800 dark:text-gray-200 hover:bg-red-50 hover:text-red-700"
          >
            Inicio
          </Link>
          <Link
            to="/products"
            onClick={() => setMenuOpen(false)}
            className="block px-4 py-3 text-gray-800 dark:text-gray-200 hover:bg-red-50 hover:text-red-700"
          >
            Productos
          </Link>
          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className="block px-4 py-3 text-gray-800 dark:text-gray-200 hover:bg-red-50 hover:text-red-700"
          >
            Contacto
          </Link>

          {/* Mostrar solo si es ADMIN */}
          {userRole === "ADMIN" && (
            <Link
              to="/adminpanel"
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-3 mt-2 bg-red-50 text-red-700 font-semibold rounded hover:bg-red-100"
            >
              Panel de Administrador
            </Link>
          )}

          <div className="mt-2 border-t border-gray-200 dark:border-gray-700" />

          {username ? (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-3 text-red-600 hover:bg-red-50"
            >
              Cerrar sesión
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-3 text-gray-800 dark:text-gray-200 hover:bg-red-50 hover:text-red-700"
            >
              Ingresar / Registrarse
            </Link>
          )}
        </nav>
      </aside>
    </header>
  );
};

export default Navigation;
