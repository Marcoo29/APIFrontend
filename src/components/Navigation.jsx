import { Link, useLocation, useNavigate } from "react-router-dom";

const Navigation = () => {
  const username = localStorage.getItem("name"); // revisa si hay usuario logueado
  const location = useLocation();
  const navigate = useNavigate();

  const isLoginPage = location.pathname === "/login" || location.pathname === "/register";

  const handleLogout = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("token"); //  TOKEN
    navigate("/home"); // redirige a la landing page
  };

  return (
    <header className="bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <nav className="container mx-auto px-6 py-1 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img className="h-8 w-8 text-primary" src="https://i.imgur.com/k7iy3rd.jpeg" />
          <Link to="/home" className="text-2xl font-bold text-gray-900 dark:text-white">
            Autopartes
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          {!isLoginPage && (
            <>
              <Link
                to="/home"
                className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors duration-300"
              >
                Inicio
              </Link>
              <Link
                to="/products"
                className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors duration-300"
              >
                Productos
              </Link>
              <Link
                to="/contact"
                className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors duration-300"
              >
                Contacto
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center space-x-4">
          {!isLoginPage && (
            <>
              {username ? (
                <>
                  <span className="text-gray-700 dark:text-gray-300 font-semibold">
                    Hola, {username}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-red-600 dark:text-red-400 hover:underline"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors duration-300"
                >
                  Ingreso/Registro
                </Link>
              )}

              <button className="relative p-2 rounded-full bg-primary/20 dark:bg-primary/30 text-primary hover:bg-primary/30 dark:hover:bg-primary/40 transition-colors duration-300">
                <span className="material-symbols-outlined">shopping_cart</span>
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red text-xs font-bold text-red">
                  3
                </span>
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
