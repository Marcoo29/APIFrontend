const Contact = () => {
  return (
    <div className="min-h-screen bg-[#f1f1f1] dark:bg-[#1b1b1b] font-display flex flex-col text-gray-800 dark:text-gray-200">
      <main className="flex-grow flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-5xl bg-white dark:bg-[#222] border border-gray-200 dark:border-red-900/30 shadow-xl rounded-none p-10">
          {/* Título */}
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center tracking-wide border-b-2 border-red-600 pb-2">
            Contáctanos
          </h1>

          {/* Texto descriptivo */}
          <p className="text-center text-gray-600 dark:text-gray-400 mb-10 max-w-5xl mx-auto leading-relaxed">
            Contamos con más de 20 años de experiencia en el rubro de repuestos
            para vehículos pesados. Nuestro equipo está para asesorarte en cada
            consulta y brindarte soluciones rápidas, confiables y adaptadas a tus
            necesidades.
          </p>

          {/* Información de contacto */}
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 justify-items-center mb-12">
            {[
              {
                title: "Dirección",
                desc: "Av. Callao 1250, Recoleta - CABA",
                icon: (
                  <path d="M128,64a40,40,0,1,0,40,40A40,40,0,0,0,128,64Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,128Zm0-112a88.1,88.1,0,0,0-88,88c0,31.4,14.51,64.68,42,96.25a254.19,254.19,0,0,0,41.45,38.3,8,8,0,0,0,9.18,0A254.19,254.19,0,0,0,174,200.25c27.45-31.57,42-64.85,42-96.25A88.1,88.1,0,0,0,128,16Zm0,206c-16.53-13-72-60.75-72-118a72,72,0,0,1,144,0C200,161.23,144.53,209,128,222Z" />
                ),
              },
              {
                title: "Teléfono",
                desc: "+54 9 (11) 1334-5555",
                icon: (
                  <path d="M222.37,158.46l-47.11-21.11-.13-.06a16,16,0,0,0-15.17,1.4,8.12,8.12,0,0,0-.75.56L134.87,160c-15.42-7.49-31.34-23.29-38.83-38.51l20.78-24.71c.2-.25.39-.5.57-.77a16,16,0,0,0,1.32-15.06l0-.12L97.54,33.64a16,16,0,0,0-16.62-9.52A56.26,56.26,0,0,0,32,80c0,79.4,64.6,144,144,144a56.26,56.26,0,0,0,55.88-48.92A16,16,0,0,0,222.37,158.46Z" />
                ),
              },
              {
                title: "Correo",
                desc: "contacto@fleetparts.com.ar",
                icon: (
                  <path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48Zm-96,85.15L52.57,64H203.43Z" />
                ),
              },
              {
                title: "Horario",
                desc: "Lunes a Viernes: 9:00 - 18:00",
                icon: (
                  <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z" />
                ),
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex flex-col items-center gap-3 p-6 rounded-none border border-red-500/30 bg-gray-50 dark:bg-[#2a2a2a] hover:border-red-600 transition-all duration-200 shadow-sm w-full max-w-xs"
              >
                <div className="p-3 bg-red-600/10 text-red-600">
                  <svg
                    fill="currentColor"
                    viewBox="0 0 256 256"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                  >
                    {item.icon}
                  </svg>
                </div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {item.title}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Formulario */}
          <form
            className="mt-8 grid gap-6 sm:grid-cols-2"
            action="https://formspree.io/f/xvgwlkjj"
            method="POST"
          >
            <input
              type="text"
              name="name"
              placeholder="Nombre"
              className="p-3 border border-gray-300 dark:border-red-700/40 bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 rounded-none"
            />
            <input
              type="email"
              name="email"
              placeholder="Correo"
              className="p-3 border border-gray-300 dark:border-red-700/40 bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 rounded-none"
            />
            <textarea
              placeholder="Mensaje"
              name="message"
              rows="4"
              className="sm:col-span-2 p-3 border border-gray-300 dark:border-red-700/40 bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 rounded-none"
            ></textarea>

            <button
              type="submit"
              className="sm:col-span-2 bg-red-600 text-white hover:bg-red-700 transition-colors duration-300 font-semibold px-6 py-3 text-sm tracking-wide rounded-none"
            >
              ENVIAR MENSAJE
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Contact;
