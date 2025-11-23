import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchUserId = async (email, token) => {
    try {
      const res = await fetch(`http://localhost:4002/users/by-email/${email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) return null;

      const data = await res.json();
      return data.id; // 🔥 este es tu userId REAL
    } catch {
      return null;
    }
  };

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
      const token = data.access_token || data.token;

      if (!token) {
        setError("El servidor no devolvió un token.");
        return;
      }

      // Guardar datos base del usuario
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: data.email,
          name: data.name,
          role: data.role,
          token,
        })
      );

      // 🔥 Obtener userId REAL desde backend
      const userId = await fetchUserId(data.email, token);

      if (userId) {
        localStorage.setItem("userId", userId);
      } else {
        alert("No se pudo obtener el ID del usuario.");
      }

      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Error en la conexión con el servidor");
    }
  };

  return (
    <div className="relative z-10 min-h-screen flex items-center justify-center bg-[#2c2c2c] font-display">
      <div className="relative z-10 flex w-full max-w-5xl bg-white rounded-2xl overflow-visible shadow-2xl">
        <div className="hidden md:flex md:w-1/2 relative">
          <img
            src="/img_login.jpg"
            alt="FleetParts Login"
            className="object-cover w-full h-full"
          />
        </div>

        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center bg-gray-50">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-8 border-b-4 border-red-600 w-fit pb-1">
            Iniciar sesión
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Correo Electrónico
              </label>
              <input
                type="email"
                placeholder="Correo Electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-red-600"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-red-600"
              />
            </div>

            {error && <p className="text-red-600 text-center">{error}</p>}

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-md"
            >
              Iniciar sesión
            </button>
          </form>

          <div className="text-center mt-6 text-gray-700">
            ¿No tenés cuenta?{" "}
            <Link to="/register" className="text-red-600 font-semibold">
              Registrate
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
