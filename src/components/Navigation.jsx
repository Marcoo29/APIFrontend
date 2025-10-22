import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

const Navigation = () => {
  const username = localStorage.getItem("name");
  const role = localStorage.getItem("role");
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/home");
  };

  // 🔸 Cierra el menú desplegable al hacer click afuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Detectamos si estamos en login/register
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  // 🔹 Colores del ícono según rol
  const userColor =
    role === "ADMIN"
      ? "text-yellow-400 hover:text-yellow-500"
      : role === "USER"
      ? "text-red-600 hover:text-red-700"
      : "text-red-600 hover:text-red-700";

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
          <div className="flex items-center gap-4 relative">
            {username ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className={`flex items-center justify-center text-3xl transition-colors ${userColor}`}
                  title="Cuenta de usuario"
                >
                  <span className="material-symbols-outlined text-2xl">
                    person
                  </span>
                </button>

                {/* DESPLEGABLE DE USUARIO */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white text-gray-800 shadow-lg border border-gray-200 rounded-md z-50">
                    <ul className="flex flex-col text-sm font-medium">
                      <li className="px-4 py-2 border-b text-gray-600">
                        Hola, <span className="font-semibold">{username}</span>
                      </li>

                      <li
                        onClick={() => {
                          navigate("/profile");
                          setUserMenuOpen(false);
                        }}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        Datos Personales
                      </li>

                      {role === "USER" ? (
                        <>
                          <li
                            onClick={() => {
                              navigate("/orders");
                              setUserMenuOpen(false);
                            }}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          >
                            Ver Pedidos
                          </li>
                        </>
                      ) : (
                        <>
                          <li
                            onClick={() => {
                              navigate("/orders-general");
                              setUserMenuOpen(false);
                            }}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          >
                            Ver Pedidos General
                          </li>
                          <li
                            onClick={() => {
                              navigate("/admin");
                              setUserMenuOpen(false);
                            }}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          >
                            Panel de Admin.
                          </li>
                        </>
                      )}

                      <li
                        onClick={() => {
                          handleLogout();
                          setUserMenuOpen(false);
                        }}
                        className="px-4 py-2 text-red-600 hover:bg-gray-100 cursor-pointer"
                      >
                        Cerrar Sesión
                      </li>
                    </ul>
                  </div>
                )}
              </div>
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

            {/* 🛒 Carrito */}
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
