export default function Landing() {
  return (
    <section className="relative w-full h-screen">
      {/* Fondo */}
      <div className="absolute inset-0">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDA4uwZ4PybLPI8W9YDE5B99sqVkteQTkrag-JuLm_P84uzMZ2eWT1xLG1yP6aTyWXW-M8p4TrHlFLSh8-rYjCU4HEMsVl0T31Q7O3yTZutaKLlX7D7X2vWpfa9pGyLtv-p1_aGtgDSzlELXh8KTb1v-PIO49rFpj1es0-sFHyS19cAa7Qek6wKx8uQ13VI0H4yxVBCyMDHFLNGAtLWUTiybRRj3avG0EVnn4EdeXzebqY4sSzw17cuRXdJzTFKOp1xqRhRlMGZGiA"
          alt="Fondo auto"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
      </div>

      {/* Contenido */}
      <div className="relative z-20 flex flex-col justify-between h-full p-8">
        {/* Hero */}
        <div className="text-center mt-20">
          <h1
            className="text-6xl md:text-8xl font-extrabold uppercase text-white"
            style={{ textShadow: "3px 3px 10px rgba(0,0,0,0.7)" }}
          >
            AUTOPARTES
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
            Mejorá y repará tu auto con nuestra exclusiva selección de repuestos de alta calidad.
          </p>
          <button className="mt-8 rounded-lg bg-gray-400 px-12 py-4 font-bold text-white shadow-lg transition-all duration-300 hover:bg-red-600 hover:shadow-2xl">
            Explorar Catálogo
          </button>
        </div>

        <div className="flex justify-center items-center gap-12 pb-8">
          <img src="https://upload.wikimedia.org/wikipedia/commons/f/f8/Fiat_logo.svg" className="w-20 h-20 object-contain hover:scale-105 filter grayscale hover:grayscale-0 duration-300" />
          <img src="https://cdn.freebiesupply.com/logos/thumbs/2x/renault-logo.png" className="w-20 h-20 object-contain hover:scale-105 filter grayscale hover:grayscale-0 duration-300" />
          <img src="https://pngimg.com/uploads/chevrolet/%D1%81hevrolet_PNG108.png" className="w-20 h-20 object-contain hover:scale-105 filter grayscale hover:grayscale-0 duration-300" />
          <img src="https://logos-world.net/wp-content/uploads/2021/04/Volkswagen-Logo.png" className="w-20 h-20 object-contain hover:scale-105 filter grayscale hover:grayscale-0 duration-300" />
          <img src="https://logos-world.net/wp-content/uploads/2021/05/Ford-Logo.png" className="w-20 h-20 object-contain hover:scale-105 filter grayscale hover:grayscale-0 duration-300" />
          <img src="https://upload.wikimedia.org/wikipedia/en/thumb/b/b2/Peugeot-logo.svg/250px-Peugeot-logo.svg.png" className="w-20 h-20 object-contain hover:scale-105 filter grayscale hover:grayscale-0 duration-300" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/3/38/Honda.svg" className="w-20 h-20 object-contain hover:scale-105 filter grayscale hover:grayscale-0 duration-300" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/e/ee/Toyota_logo_%28Red%29.svg" className="w-20 h-20 object-contain hover:scale-105 filter grayscale hover:grayscale-0 duration-300" />
        </div>
      </div>
    </section>
  );
}
