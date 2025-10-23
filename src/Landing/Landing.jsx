import BrandSection from "./BrandSection";
import ProductGrid from "./ProductGrid";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Landing() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim() !== "") {
      navigate(`/products?search=${encodeURIComponent(query.trim())}`);
    } else {
      navigate("/products");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="relative flex flex-col font-display text-white overflow-hidden bg-[#3b3b3b]">
      {/* 🎥 Video de fondo */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute top-0 left-0 w-full h-full object-cover object-center scale-[1.05] z-[0]"
      >
        <source src="/videoplayback.mp4" type="video/mp4" />
        Tu navegador no soporta la reproducción de video.
      </video>

      {/* Overlay oscuro con blur */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[6px] z-[1]" />

      {/* Líneas verticales */}
      <div className="absolute inset-0 grid grid-cols-7 z-[2] pointer-events-none">
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className={`border-l border-white/10 ${
              i === 0 ? "border-l-[#B91C1C]/70" : ""
            }`}
          />
        ))}
      </div>

      <main className="relative z-[3] flex-1">
        <section className="relative min-h-screen grid grid-cols-7 pb-20">
          {/* Columna 1 → guía roja */}
          <div className="col-span-1" />

          {/* Contenido principal */}
          <div className="col-span-6 flex flex-col justify-start pt-20 pl-8 pr-8 max-w-[1100px]">
            {/* Texto + métricas */}
            <div>
              {/* Logo y título */}
              <div className="flex items-center mb-4">
                <svg
                  className="h-14 w-14 md:h-16 md:w-16 mr-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2L2 7V17L12 22L22 17V7L12 2Z"
                    stroke="#B91C1C"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                  <path
                    d="M2 7L12 12L22 7"
                    stroke="#B91C1C"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                  <path
                    d="M12 22V12"
                    stroke="#B91C1C"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                  <path
                    d="M16 5.5L8 9.5"
                    stroke="#B91C1C"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                  <path
                    d="M20 7.5L12 11.5L4 7.5"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                </svg>
                <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight">
                  <span className="text-[#B91C1C]">FLEET</span>
                  <span className="text-white">PARTS</span>
                </h1>
              </div>

              {/* Texto institucional */}
              <p className="text-gray-300 text-lg md:text-xl max-w-3xl leading-relaxed text-justify text-left mb-10">
                <span className="font-semibold text-white">FleetParts</span> es una
                empresa argentina con más de dos décadas de trayectoria en la
                importación, distribución y comercialización de repuestos para
                vehículos pesados. Nacida del espíritu emprendedor y la pasión por
                el transporte, hoy somos referentes en soluciones para flotas,
                ofreciendo calidad, disponibilidad y respaldo técnico en cada entrega.
              </p>

              {/* Métricas */}
              <div className="grid grid-cols-4 gap-6 mt-4 mb-10 pr-8 text-white text-left justify-items-start">
                {[
                  { value: "20+", label: "AÑOS DE EXPERIENCIA" },
                  { value: "4.500+", label: "CLIENTES" },
                  { value: "200+", label: "MARCAS" },
                  { value: "75.000+", label: "ARTÍCULOS" },
                ].map((stat, index) => (
                  <div key={index} className="border-l-2 border-[#B91C1C]/80 pl-4">
                    <p className="text-4xl font-bold">{stat.value}</p>
                    <p className="text-sm tracking-widest text-gray-200">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 🔍 Buscador principal rectangular */}
            <div className="relative w-full max-w-3xl mt-[120px]"> {/* 🔼 sube fuerte hacia arriba */}
              <div className="flex items-stretch w-full">
                {/* Campo de texto + lupa */}
                <div
                  className="
                    flex items-center flex-grow
                    bg-white/10 backdrop-blur-md 
                    border border-white/20 
                    shadow-sm overflow-hidden 
                    transition-all duration-300 
                    hover:border-[#B91C1C]
                  "
                >
                  <input
                    type="text"
                    placeholder="Buscar por número de parte, descripción o tipo de vehículo..."
                    className="flex-grow py-4 px-6 bg-transparent text-white placeholder-gray-300 focus:outline-none"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <button
                    className="py-3 px-6 bg-[#B91C1C] hover:bg-[#dc2626] transition-all duration-300 flex items-center justify-center"
                    onClick={handleSearch}
                    aria-label="Buscar"
                  >
                    <span className="material-symbols-outlined text-2xl text-white">
                      search
                    </span>
                  </button>
                </div>

                {/* 🟥 Botón "Ver todos los productos" más compacto */}
                <button
                  onClick={() => navigate('/products')}
                  className="
                    ml-3 px-5 py-2
                    flex flex-col justify-center items-center 
                    bg-[#B91C1C]/90 hover:bg-[#dc2626] 
                    text-white font-semibold leading-tight tracking-wide
                    border border-white/20
                    transition-all duration-300
                    w-[130px] h-[60px]
                  "
                >
                  <span className="text-[12px] md:text-[14px]">TODOS LOS</span>
                  <span className="text-[12px] md:text-[14px]">PRODUCTOS</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Productos destacados y marcas */}
        <ProductGrid />
        <BrandSection />
      </main>
    </div>
  );
}
