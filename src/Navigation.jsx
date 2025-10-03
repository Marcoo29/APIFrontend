
const Navigation = () => {
    
  return (
    <header className="bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <nav className="container mx-auto px-6 py-2 flex justify-between items-center">
        <a className="flex items-center gap-2" href="#">
          <svg
            className="h-8 w-8 text-primary"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            Autopartes
          </span>
        </a>

        <div className="hidden md:flex items-center space-x-8">
          <a
            className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors duration-300"
            href="#"
          >
            Inicio
          </a>
          <a className="text-primary font-semibold" href="#">
            Productos
          </a>
          <a
            className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors duration-300"
            href="#"
          >
            Contacto
          </a>
        </div>

        <div className="flex items-center space-x-4">
          <button className="bg-primary text-white px-4 py-2 rounded font-semibold hover:bg-primary/90 transition-colors duration-300">
            Ingreso / Registro
          </button>
          <button className="relative p-2 rounded-full bg-primary/20 dark:bg-primary/30 text-primary hover:bg-primary/30 dark:hover:bg-primary/40 transition-colors duration-300">
            <span className="material-symbols-outlined">shopping_cart</span>
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
              3
            </span>
          </button>
        </div>
      </nav>
    </header>
  );
};

        export default Navigation;
