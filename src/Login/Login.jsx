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
        setError("Correo o contraseña incorrecta");
        return;
      }

      const data = await response.json();

      // Guardamos un objeto "user" completo para AdminPanel
      localStorage.setItem(
        "user",
        JSON.stringify({ name: data.name, role: data.role, token: data.access_token || data.token })
      );

      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Error en la conexión con el servidor");
    }
  };

  return (
    <div className="relative z-10 min-h-screen flex items-center justify-center bg-[#2c2c2c] font-display">
      <div className="relative z-10 flex w-full max-w-5xl bg-white rounded-2xl overflow-visible shadow-2xl">
        {/* LADO IZQUIERDO */}
        <div className="hidden md:flex md:w-1/2 relative">
          <img
            src="/img_login.jpg"
            alt="FleetParts Login"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2c2c2c]/90 via-[#2c2c2c]/60 to-transparent flex flex-col justify-end items-start p-10">
            <h2 className="text-4xl font-bold text-white mb-2">
              Bienvenido a FleetParts
            </h2>
            <p className="text-gray-200">
              Tu portal exclusivo de repuestos pesados.
            </p>
          </div>
        </div>

        {/* LADO DERECHO - FORMULARIO */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center bg-gray-50">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-8 border-b-4 border-red-600 w-fit pb-1">
            Iniciar sesión
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="usuario@empresa.com"
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-red-600 focus:outline-none bg-white text-gray-800 placeholder-gray-500"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="*******"
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-red-600 focus:outline-none bg-white text-gray-800 placeholder-gray-500"
              />
            </div>

            {error && (
              <p className="text-red-600 text-sm font-semibold text-center">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-md transition duration-200 shadow-md"
            >
              Iniciar sesión
            </button>
          </form>

          <div className="text-center mt-6 text-gray-700">
            ¿No tenés cuenta?{" "}
            <Link
              to="/register"
              className="text-red-600 font-semibold hover:underline"
            >
              Registrate
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
