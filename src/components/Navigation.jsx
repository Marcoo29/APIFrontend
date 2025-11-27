import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

const Navigation = () => {
  const dispatch = useDispatch();

  // Redux auth
  const { id, name, role, token } = useSelector((state) => state.auth);
  const isLogged = !!token;

  // Redux cart
  const cart = useSelector((state) => state.cart.items);

  const location = useLocation();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  const [cartCount, setCartCount] = useState(0);

  // 🔥 Carrito desde Redux, no desde localStorage
  useEffect(() => {
    const total = cart.reduce((acc, item) => acc + item.qty, 0);
    setCartCount(total);
  }, [cart]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/home");
  };

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  // Cerrar menú usuario al click fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="absolute top-0 left-0 w-full z-40 bg-transparent text-white">
      <nav className="w-full px-4 py-2 flex justify-between items-center fixed top-0 left-0 right-0 z-50">

        {/* Menú Hamburguesa */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 border border-red-600 text-red-600 rounded-sm hover:bg-red-600 hover:text-white transition-colors"
        >
          <span className="material-symbols-outlined text-2xl">
            {menuOpen ? "close" : "menu"}
          </span>
        </button>

        {!isAuthPage && (
          <div className="flex items-center gap-4 text-lg relative">

            {/* Hola usuario */}
            {name &&
              (location.pathname === "/home" || location.pathname === "/") && (
                <span className="text-red-600 text-lg font-semibold">
                  Hola, {name}
                </span>
              )}

            {/* ICONO USUARIO */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => {
                  if (!isLogged) {
                    navigate("/login");
                    return;
                  }
                  setUserMenuOpen(!userMenuOpen);
                }}
                className={`p-1 hover:text-red-700 transition ${
                  isLogged ? "text-red-600" : "text-gray-400"
                }`}
              >
                <span className="material-symbols-outlined text-3xl">
                  person
                </span>
              </button>

              {/* MENÚ DEL USUARIO */}
              {isLogged && userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border shadow-md text-gray-800 text-base">
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

                    {role === "ADMIN" ? (
                      <>
                        <li>
                          <Link
                            to="/operations"
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

            {/* CARRITO */}
            <Link
              to="/cart"
              className="relative text-red-600 hover:text-red-800"
            >
              <span className="material-symbols-outlined text-2xl">
                shopping_cart
              </span>

              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        )}
      </nav>

      {/* Overlay */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 bg-black/40 transition-opacity duration-200 z-[45] ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Aside */}
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
 
          {name ? (
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
