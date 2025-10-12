import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [warning, setWarning] = useState("");
  const navigate = useNavigate();

  
  return (
    <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark font-display">
      <div className="flex mt-3 flex-col md:flex-row w-full max-w-6xl bg-white dark:bg-background-dark/80 rounded-lg shadow-2xl overflow-hidden">
        {/* Imagen lateral */}
        <div className="md:w-1/2 hidden md:block">
          <img
            alt="Coche en taller mecánico"
            src="https://i.imgur.com/vmVACxa.jpeg"
            className="w-full h-full object-adjust"
          />
        </div>

        {/* Formulario de registro */}
        <div className="w-full md:w-1/2 pt-4 pb-8 px-3 md:pt-8 md:pb-12 md:px-12 flex flex-col justify-center">
          <h1 className="text-4xl text-left font-bold text-text-light dark:text-text-dark mb-4">
            Registro
          </h1>

          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="">
                <label
                  htmlFor="name"
                  className="block text-left text-text-light dark:text-text-dark text-sm font-bold mb-2"
                >
                  Nombre
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Nombre"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 dark:bg-gray-700 text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary border-none placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>
              <div className="">
                <label
                  htmlFor="surname"
                  className="block text-left text-text-light dark:text-text-dark text-sm font-bold mb-2"
                >
                  Apellido
                </label>
                <input
                  id="surname"
                  type="text"
                  placeholder="Apellido"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 dark:bg-gray-700 text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary border-none placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>
            </div>
            <div className="mb-6">
              <label
                htmlFor="username"
                className="block text-left text-text-light dark:text-text-dark text-sm font-bold mb-2"
              >
                Nombre de Usuario
              </label>
              <input
                id="username"
                type="text"
                placeholder="Tu nombre de usuario"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 dark:bg-gray-700 text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary border-none placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-left text-text-light dark:text-text-dark text-sm font-bold mb-2"
              >
                Correo Electrónico
              </label>
              <input
                id="email"
                type="email"
                placeholder="example@hotmail.com"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 dark:bg-gray-700 text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary border-none placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-left text-text-light dark:text-text-dark text-sm font-bold mb-2"
              >
                Contraseña
              </label>
              <input
                id="password"
                type="mpassworda"
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 dark:bg-gray-700 text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary border-none placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="confirm-password"
                className="block text-left text-text-light dark:text-text-dark text-sm font-bold mb-2"
              >
                Contraseña
              </label>
              <input
                id="confirm-password"
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 dark:bg-gray-700 text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary border-none placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-red-700 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-900 transition-colors duration-300"
              >
                Registrarse
              </button>
            </div>
          </form>

          <div className="text-center mt-4">
            <Link to="/login" className="text-primary hover:font-bold">
              ¿Ya tenés cuenta? <u>Iniciar sesión</u>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
