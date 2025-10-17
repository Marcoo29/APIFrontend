import React from "react";

const brandRows = [
  [
    "/Brands/acc.png",
    "/Brands/armorall.png",
    "/Brands/ausili.png",
    "/Brands/baiml.png",
    "/Brands/bremen.png",
    "/Brands/clever.png",
    "/Brands/cylgem.png",
    "/Brands/deicas.png",
    "/Brands/dni.png",
  ],
  [
    "/Brands/driven.png",
    "/Brands/ferrazzi.png",
    "/Brands/fricrot.png",
    "/Brands/gacri.png",
    "/Brands/hescher.png",
    "/Brands/huntchingson.png",
    "/Brands/kobla.png",
    "/Brands/loctite.png",
    "/Brands/locx.png",
  ],
  [
    "/Brands/mahle.png",
    "/Brands/mateo.png",
    "/Brands/moog.png",
    "/Brands/ntn.png",
    "/Brands/orlanrober.png",
    "/Brands/pitts.png",
    "/Brands/ralux.png",
    "/Brands/tacsa.png",
    "/Brands/triler.png",
    "/Brands/valeo.png",
    "/Brands/wagner.png",
  ],
];

const BrandRow = ({ brands, reverse }) => (
  <div
    className={`flex items-center justify-around gap-12 w-max ${
      reverse ? "animate-scrollReverse" : "animate-scroll"
    }`}
  >
    {[...brands, ...brands].map((logo, i) => (
      <img
        key={i}
        src={logo}
        alt={`Marca ${i}`}
        className="w-36 h-auto object-contain brightness-0 invert hover:invert-0 hover:brightness-0 transition-transform duration-300 hover:scale-110"
      />
    ))}
  </div>
);

export default function BrandsSection() {
  return (
    <section className="bg-[#E10600] text-white py-12 overflow-hidden">
      <div className="w-screen flex flex-col items-center text-center">
        {/* Carruseles */}
        <div className="flex flex-col gap-8 w-screen">
          {brandRows.map((row, idx) => (
            <div key={idx} className="overflow-hidden w-screen">
              <BrandRow brands={row} reverse={idx === 1} />
            </div>
          ))}
        </div>

        {/* Línea divisoria */}
        <div className="w-24 border-t-2 border-white/70 mt-10 mb-6"></div>

        {/* Texto */}
        <p className="text-sm md:text-base font-medium max-w-2xl leading-relaxed mb-6 tracking-wide">
          UN CATÁLOGO DE{" "}
          <span className="font-bold">75.000 PRODUCTOS</span> Y MÁS DE{" "}
          <span className="font-bold">200 MARCAS</span> LÍDERES EN AUTOPARTES
          HACEN POSIBLE QUE NUESTROS CLIENTES ENCUENTREN LA SOLUCIÓN INTEGRAL A
          SUS NECESIDADES.
        </p>

        {/* Botón */}
        <button className="mt-1 flex items-center gap-2 border-2 border-white px-5 py-2 rounded-md font-bold uppercase text-xs tracking-wide hover:bg-white hover:text-[#E10600] transition-colors duration-300">
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
          Ver todas las marcas
        </button>
      </div>

      {/* Animaciones */}
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scrollReverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-scroll {
          animation: scroll 35s linear infinite;
        }
        .animate-scrollReverse {
          animation: scrollReverse 35s linear infinite;
        }
      `}</style>
    </section>
  );
}
