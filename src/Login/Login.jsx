import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Por favor, completá todos los campos antes de continuar.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:4002/api/v1/auth/authenticate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
      // Si el backend responde con un error (403, 401, etc)
      setError("Correo o contraseña incorrecta"); // <-- tu mensaje personalizado
      return;
    }

      const data = await response.json();
      console.log("Datos recibidos del backend:", data);

      if (response.ok) {
        // Guardamos el token y el nombre en localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("name", data.name); // o el campo que venga del backend

        alert("¡Ingreso exitoso!");
        navigate("/"); // redirige a landing page
      } else {
        setError(data.message || "Error al iniciar sesión");
      }
    } catch (err) {
      console.error(err);
      setError("Error en la conexión con el servidor");
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark border-r border-gray-300  font-display min-h-screen flex items-center justify-center">
      <div className="flex w-full max-w-6xl mx-auto overflow-hidden bg-white dark:bg-background-dark/80 rounded-lg shadow-2xl">
        {/* Imagen lateral */}
        <div className="md:w-1/2 hidden md:block">
          <div className="w-full h-[500px] overflow-hidden">
            <img
              alt="Coche gris en la calle"
              className="w-full h-full object-cover"
              src="https://i.imgur.com/njTrnld.jpeg"
            />
          </div>
        </div>

        {/* Formulario */}
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
          <div className="mb-10 text-left">
            <h1 className="text-4xl font-bold text-text-light dark:text-text-dark">
              INICIAR SESIÓN
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
