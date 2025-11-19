import { Link } from "react-router-dom";
import BrandScroller from "./BrandScroller";
import { brandRows } from "./brandRows";

export default function BrandsSection() {
  return (
    <section className="bg-[#E10600] text-white py-12 overflow-hidden">
      <div className="w-screen flex flex-col items-center text-center">

        <div className="flex flex-col gap-8 w-screen">
          {brandRows.map((row, idx) => (
            <div key={idx} className="overflow-hidden w-screen">
              <BrandScroller brands={row} reverse={idx === 1} />
            </div>
          ))}
        </div>

        <div className="w-24 border-t-2 border-white/70 mt-10 mb-6"></div>

        <p className="text-sm md:text-base font-large max-w-2xl leading-relaxed mb-5 tracking-wide">
          UN CATÁLOGO DE <span className="font-bold">75.000 PRODUCTOS</span> Y
          MÁS DE <span className="font-bold">200 MARCAS</span> LÍDERES EN
          AUTOPARTES HACEN POSIBLE QUE NUESTROS CLIENTES ENCUENTREN LA SOLUCIÓN
          INTEGRAL A SUS NECESIDADES.
        </p>

        <Link
          to="/products"
          className="mt-1 flex items-center gap-2 border-2 border-white px-8 py-2 squared-md font-bold uppercase text-xs tracking-wide hover:bg-white hover:text-[#E10600] transition-colors duration-300"
        >
          VER TODOS LOS PRODUCTOS
        </Link>
      </div>

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
