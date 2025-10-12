import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Por favor, completá todos los campos antes de continuar.");
      return;
    }

    // Si pasa la validación
    console.log("Iniciando sesión...");
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display min-h-screen flex items-center justify-center">
      <div className="flex w-full max-w-6xl mx-auto overflow-hidden bg-white dark:bg-background-dark/80 rounded-lg shadow-2xl">
        {/* Imagen lateral */}
        <div className="md:w-1/2 hidden md:block">
          <div className="w-full h-[500px] overflow-hidden">
            <img
              alt="Coche gris en la calle"
              className="w-full h-full object-adjust"
              src="https://i.imgur.com/N9Xr6BI.jpeg"
            />
          </div>
        </div>

        {/* Formulario */}
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
          <div className="mb-10 text-left">
            <h1 className="text-4xl font-bold text-text-light dark:text-text-dark">
              Inicio de sesión
            </h1>
          </div>

          <form className="w-full" onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-left text-text-light dark:text-text-dark text-sm font-bold mb-2"
              >
                Correo Electrónico
              </label>
              <input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@hotmail.com"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 dark:bg-gray-700 text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary border-none placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>

            <div className="mb-8">
              <label
                htmlFor="password"
                className="block text-left text-text-light dark:text-text-dark text-sm font-bold mb-2"
              >
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                placeholder="*******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-200 dark:bg-gray-700 text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary border-none placeholder-gray-500 dark:placeholder-gray-400"
              />
              {/* Mensaje de error */}
              {error && (
                <p className="text-red-600 text-sm mt-4 text-center font-semibold">
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-red-700 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-900 transition-colors duration-300"
            >
              Iniciar Sesión
            </button>
          </form>

          <div className="text-center mt-3">
            <Link to="/register" className="hover:font-bold">
              ¿No tenés cuenta? <u>Registrarse</u>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
