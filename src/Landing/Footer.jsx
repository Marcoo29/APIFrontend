import { useNavigate } from "react-router-dom";
const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="bg-[#1a1a1a] text-gray-300 font-display border-t-2 border-red-600">
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          <div className="flex flex-col items-start">
            <h2 className="text-3xl font-bold text-white tracking-wide mb-2">
              FleetParts
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Especialistas en repuestos pesados. Calidad, confianza y envío inmediato a todo el país.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-3 border-b border-red-600 pb-1 inline-block">
              Navegación
            </h3>
            <nav className="mt-3 flex flex-col space-y-2">
              <a
                onClick={() => navigate("/home")}
                className="hover:bg-red-600 hover:text-white px-3 py-1 transition-colors duration-200"
              >
                Inicio
              </a>
              <a
                onClick={() => navigate("/products")}
                className="hover:bg-red-600 hover:text-white px-3 py-1 transition-colors duration-200"
              >
                Productos
              </a>
              <a
                onClick={() => navigate("/contact")}
                className="hover:bg-red-600 hover:text-white px-3 py-1 transition-colors duration-200"
              >
                Contacto
              </a>
              <a
                onClick={() => navigate("/about")}
                className="hover:bg-red-600 hover:text-white px-3 py-1 transition-colors duration-200"
              >
                Acerca de nosotros
              </a>
            </nav>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-3 border-b border-red-600 pb-1 inline-block">
              Legal
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Defensa al consumidor. Para más información{" "}
              <a
                href="https://www.argentina.gob.ar/produccion/defensadelconsumidor/formulario"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-500 hover:text-red-400 underline"
              >
                click aquí.
              </a>
              .
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            © 2025 FleetParts. Todos los derechos reservados.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="#"
              className="text-gray-400 hover:text-red-500 transition-colors"
              title="Instagram"
            >
              <span className="material-symbols-outlined">camera_alt</span>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-red-500 transition-colors"
              title="Facebook"
            >
              <span className="material-symbols-outlined">public</span>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-red-500 transition-colors"
              title="WhatsApp"
            >
              <span className="material-symbols-outlined">chat</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
