// Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-background-light dark:bg-background-dark font-display text-gray-800 dark:text-gray-300">
      <div className="container mx-auto px-6 py-2">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="col-span-1 md:col-span-1 flex justify-center items-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Autopartes
            </h2>
          </div>

          {/* Navegación */}
          <div className="col-span-1">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Navegación
            </h3>
            <nav className="mt-4 space-y-2">
              <a
                href="#"
                className="block text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-300"
              >
                Inicio
              </a>
              <a
                href="#"
                className="block text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-300"
              >
                Productos
              </a>
              <a
                href="#"
                className="block text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-300"
              >
                Contacto
              </a>
              <a
                href="#"
                className="block text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-300"
              >
                Acerca de nosotros
              </a>
            </nav>
          </div>

          {/* Legal */}
          <div className="col-span-1">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Legal
            </h3>
            <nav className="mt-4 space-y-2">
              <a
                href="#"
                className="block text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="block text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-300"
              >
                Terms of Service
              </a>
            </nav>
          </div>

          {/* Redes sociales */}
          <div className="col-span-1">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Follow Us
            </h3>
            <div className="flex mt-4 space-x-4">
              {/* Facebook */}
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-300"
              >
                <svg
                  aria-hidden="true"
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 
                    1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 
                    0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 
                    21.128 22 16.991 22 12z"
                  />
                </svg>
              </a>

              {/* Twitter */}
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-300"
              >
                <svg
                  aria-hidden="true"
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M8.29 20.251c7.547 0 11.675-6.253 
                  11.675-11.675 0-.178 0-.355-.012-.53A8.348 
                  8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 
                  4.118 4.118 0 001.804-2.27 8.224 8.224 
                  0 01-2.605.996 4.107 4.107 0 00-6.993 
                  3.743A11.65 11.65 0 012.8 9.71v.052a4.105 
                  4.105 0 003.292 4.022 4.095 4.095 0 
                  01-1.853.07 4.108 4.108 0 003.834 
                  2.85A8.233 8.233 0 012 18.407a11.616 
                  11.616 0 006.29 1.84"
                  />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-300"
              >
                <svg
                  aria-hidden="true"
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 
                    1.064.049 1.791.218 2.427.465a4.902 
                    4.902 0 011.772 1.153 4.902 4.902 
                    0 011.153 1.772c.247.636.416 1.363.465 
                    2.427.048 1.024.06 1.378.06 3.808s-.012 
                    2.784-.06 3.808c-.049 1.064-.218 
                    1.791-.465 2.427a4.902 4.902 0 
                    01-1.153 1.772 4.902 4.902 0 
                    01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.013-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 
                    4.902 0 01-1.772-1.153 4.902 4.902 
                    0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427C2.013 
                    14.784 2 14.43 2 12s.013-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 
                    4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 
                    2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zM12 
                    6.848c-2.837 0-5.152 2.315-5.152 
                    5.152s2.315 5.152 5.152 5.152 
                    5.152-2.315 5.152-5.152S14.837 
                    6.848 12 6.848zm0 8.304a3.152 
                    3.152 0 110-6.304 3.152 3.152 
                    0 010 6.304z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-200 dark:border-gray-800 pt-8">
          <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
            © 2025. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
