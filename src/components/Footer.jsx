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
          <div className="col-span-2">
            <nav className="mt-4 space-y-2">
              <span
                href="#"
                className="block text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-300"
              >
                Defensa de las y los consumidores. Para reclamos <a class="btn-link font-small" href="https://www.argentina.gob.ar/produccion/defensadelconsumidor/formulario" target="_blank" data-component="consumer-defense"><u>ingresá acá.</u></a>
              </span>
              
            </nav>
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

export default Footer;