import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const username = localStorage.getItem("name");
  const location = useLocation();
  const navigate = useNavigate();

  const isLoginPage =
    location.pathname === "/login" || location.pathname === "/register";

  const handleLogout = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("token");
    navigate("/home");
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Botón hamburguesa */}
        <div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col justify-center items-center w-10 h-10 space-y-1 border-2 border-red-500 hover:bg-red-500/10 transition-all duration-200 focus:outline-none"
          >
            <span
              className={`block w-6 h-0.5 bg-red-500 transition-transform duration-300 ${
                menuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-red-500 transition-opacity duration-300 ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-red-500 transition-transform duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            />
          </button>
        </div>

        {/* Iconos lado derecho */}
        <div className="flex items-center gap-6">
          {username ? (
            <button
              onClick={handleLogout}
              className="text-red-500 hover:text-red-600 transition-colors"
              title="Cerrar sesión"
            >
              <span className="material-symbols-outlined text-2xl">
                account_circle
              </span>
            </button>
          ) : (
            <Link
              to="/login"
              className="text-red-500 hover:text-red-600 transition-colors"
              title="Ingreso / Registro"
            >
              <span className="material-symbols-outlined text-2xl">
                person
              </span>
            </Link>
          )}

          <button
            className="relative text-red-500 hover:text-red-600 transition-colors"
            title="Carrito"
          >
            <span className="material-symbols-outlined text-2xl">
              shopping_cart
            </span>
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
              3
            </span>
          </button>
        </div>
      </nav>

      {/* Overlay + Panel lateral */}
      {menuOpen && !isLoginPage && (
        <>
          {/* Fondo clickeable */}
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setMenuOpen(false)}
          />

          {/* Panel lateral */}
          <div className="fixed top-0 left-0 h-screen w-2/3 max-w-xs bg-[#1a1a1a]/95 z-50 flex flex-col justify-start px-6 pt-8 pb-4">
            {/* Botón cerrar */}
            <button
              onClick={() => setMenuOpen(false)}
              className="self-end text-red-500 hover:text-red-600 transition mb-8"
              title="Cerrar menú"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>

            {/* Enlaces con rectángulo fijo al hover */}
            <div className="flex flex-col space-y-3">
              {[
                { name: "Inicio", path: "/home" },
                { name: "Productos", path: "/products" },
                { name: "Contacto", path: "/contact" },
              ].map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className="text-white text-lg font-medium px-3 py-2 hover:bg-red-600 transition-colors duration-200"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Navigation;
