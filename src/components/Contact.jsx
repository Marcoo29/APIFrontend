const Contact = () => {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 font-sans flex flex-col">
           

            {/* Main */}
            <main className="flex-grow flex items-center justify-center px-6 py-10">
                <div className="w-full max-w-4xl bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-10">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
                        Contáctanos
                    </h1>

                    <div className="grid sm:grid-cols-2 gap-6 justify-items-center mb-10">
                        {/* Dirección */}
                        <div className="flex flex-col items-center gap-2 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-md bg-gray-50 dark:bg-gray-800/50 w-full max-w-sm">
                            <div className="p-3 rounded-xl bg-red-700/10 text-red-700 flex-shrink-0">
                                <svg fill="currentColor" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                                    <path d="M128,64a40,40,0,1,0,40,40A40,40,0,0,0,128,64Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,128Zm0-112a88.1,88.1,0,0,0-88,88c0,31.4,14.51,64.68,42,96.25a254.19,254.19,0,0,0,41.45,38.3,8,8,0,0,0,9.18,0A254.19,254.19,0,0,0,174,200.25c27.45-31.57,42-64.85,42-96.25A88.1,88.1,0,0,0,128,16Zm0,206c-16.53-13-72-60.75-72-118a72,72,0,0,1,144,0C200,161.23,144.53,209,128,222Z" />
                                </svg>
                            </div>
                            <p className="font-semibold text-gray-800 dark:text-gray-100 text-center">Dirección</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">Calle Principal 123, Ciudad, Estado</p>
                        </div>

                        {/* Teléfono */}
                        <div className="flex flex-col items-center gap-2 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-md bg-gray-50 dark:bg-gray-800/50 w-full max-w-sm">
                            <div className="p-3 rounded-xl bg-red-700/10 text-red-700 flex-shrink-0">
                                <svg fill="currentColor" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                                    <path d="M222.37,158.46l-47.11-21.11-.13-.06a16,16,0,0,0-15.17,1.4,8.12,8.12,0,0,0-.75.56L134.87,160c-15.42-7.49-31.34-23.29-38.83-38.51l20.78-24.71c.2-.25.39-.5.57-.77a16,16,0,0,0,1.32-15.06l0-.12L97.54,33.64a16,16,0,0,0-16.62-9.52A56.26,56.26,0,0,0,32,80c0,79.4,64.6,144,144,144a56.26,56.26,0,0,0,55.88-48.92A16,16,0,0,0,222.37,158.46Z" />
                                </svg>
                            </div>
                            <p className="font-semibold text-gray-800 dark:text-gray-100 text-center">Teléfono</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">+54 (11) 5555-5555</p>
                        </div>

                        {/* Correo */}
                        <div className="flex flex-col items-center gap-2 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-md bg-gray-50 dark:bg-gray-800/50 w-full max-w-sm">
                            <div className="p-3 rounded-xl bg-red-700/10 text-red-700 flex-shrink-0">
                                <svg fill="currentColor" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                                    <path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48Zm-96,85.15L52.57,64H203.43Z" />
                                </svg>
                            </div>
                            <p className="font-semibold text-gray-800 dark:text-gray-100 text-center">Correo</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">contacto@autopartsco.com</p>
                        </div>

                        {/* Horario */}
                        <div className="flex flex-col items-center gap-2 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-md bg-gray-50 dark:bg-gray-800/50 w-full max-w-sm">
                            <div className="p-3 rounded-xl bg-red-700/10 text-red-700 flex-shrink-0">
                                <svg fill="currentColor" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                                    <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z" />
                                </svg>
                            </div>
                            <p className="font-semibold text-gray-800 dark:text-gray-100 text-center">Horario</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">Lunes a Viernes: 9:00 - 18:00</p>
                        </div>
                    </div>
                    {/* Formulario de contacto */}
                    <form
                        className="mt-10 grid gap-6 sm:grid-cols-2"
                        action="https://formspree.io/f/xvgwlkjj"
                        method="POST"
                    >
                        <input
                            type="text"
                            name="name"
                            placeholder="Nombre"
                            className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Correo"
                            className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                        <textarea
                            placeholder="Mensaje"
                            name="message"
                            rows="4"
                            className="sm:col-span-2 p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                        ></textarea>

                        {/* BOTÓN CORREGIDO: Se agregó sm:col-span-2 para que ocupe el ancho completo en pantallas medianas y grandes */}
                        <button
                            type="submit"
                            className="w-full sm:col-span-2 text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors duration-300"
                        >
                            ENVIAR MENSAJE
                        </button>

                    </form>
                </div>
            </main >
        </div >
    );
}

export default Contact;
