import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

const Navigation = () => {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const username = user?.name || null;
  const userRole = user?.role || null;

  const location = useLocation();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/home");
  };

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  // Cerrar menú si se hace click fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
          <div className="flex items-center gap-4 text-lg relative">
            {username && (location.pathname === "/home" || location.pathname === "/") && (
              <span className="text-red-600 text-lg font-semibold">
                Hola, {username}
              </span>
            )}

            {/* 🔻 Icono persona */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => {
                  // 👇 si no hay usuario, redirige directo al login
                  if (!user) {
                    navigate("/login");
                    return;
                  }
                  setUserMenuOpen(!userMenuOpen);
                }}
                className={`p-1 hover:text-red-700 transition ${
                  username ? "text-red-600" : "text-gray-400"
                }`}
              >
                <span className="material-symbols-outlined text-3xl">person</span>
              </button>

              {/* 🔽 Menú desplegable SOLO si hay usuario */}
              {user && userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-md text-gray-800 z-50 text-sm">
                  <ul className="flex flex-col divide-y divide-gray-100">
                    <li>
                      <Link
                        to="/profile"
                        className="block px-4 py-1.5 hover:bg-red-50 hover:text-red-700"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Mi Perfil
                      </Link>
                    </li>

                    {userRole === "ADMIN" ? (
                      <>
                        <li>
                          <Link
                            to="/orders-admin"
                            className="block px-4 py-1.5 hover:bg-red-50 hover:text-red-700"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            Ver Pedidos Totales
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/adminpanel"
                            className="block px-4 py-1.5 hover:bg-red-50 hover:text-red-700"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            Panel de Admin
                          </Link>
                        </li>
                      </>
                    ) : (
                      <li>
                        <Link
                          to="/orders"
                          className="block px-4 py-1.5 hover:bg-red-50 hover:text-red-700"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          Ver Pedidos
                        </Link>
                      </li>
                    )}

                    <li>
                      <button
                        onClick={() => {
                          handleLogout();
                          setUserMenuOpen(false);
                        }}
                        className="block w-full text-left px-4 py-1.5 text-red-600 hover:bg-red-50"
                      >
                        Cerrar Sesión
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* 🛒 Icono carrito */}
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
