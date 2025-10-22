import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("USER");
  const [adminCode, setAdminCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !name ||
      !lastname ||
      !username ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      setError("Por favor, completá todos los campos.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    // 🧩 Validar si es admin
    if (role === "ADMIN" && adminCode !== "ingreso_admin") {
      setError("Código de administrador incorrecto.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4002/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          lastname,
          username,
          email,
          password,
          role, // 👈 Envía el rol correcto
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Error al registrarse");
        return;
      }

      alert("¡Registro exitoso!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("Error de conexión con el servidor");
    }
  };

  return (
    <div className="relative z-10 min-h-screen flex items-center justify-center bg-[#2c2c2c] font-display">
      <div className="flex w-full max-w-5xl bg-white rounded-2xl overflow-hidden shadow-2xl">
        {/* LADO IZQUIERDO - Formulario */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center bg-gray-50">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-8 border-b-4 border-red-600 w-fit pb-1">
            Crear cuenta
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Nombre
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej: Juan"
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-red-600 focus:outline-none bg-white text-gray-800 placeholder-gray-500"
                />
              </div>

              <div>
                <label
                  htmlFor="lastname"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Apellido
                </label>
                <input
                  id="lastname"
                  type="text"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  placeholder="Ej: Pérez"
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-red-600 focus:outline-none bg-white text-gray-800 placeholder-gray-500"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="username"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Nombre de usuario
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Tu usuario"
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-red-600 focus:outline-none bg-white text-gray-800 placeholder-gray-500"
              />
            </div>

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

            {/* 🔹 Selección de Rol */}
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Rol
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-red-600 focus:outline-none bg-white text-gray-800"
              >
                <option value="USER">Usuario final</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>

            {/* 🔐 Campo para código admin */}
            {role === "ADMIN" && (
              <div>
                <label
                  htmlFor="adminCode"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Código de administrador
                </label>
                <input
                  id="adminCode"
                  type="password"
                  value={adminCode}
                  onChange={(e) => setAdminCode(e.target.value)}
                  placeholder="Ingresá el código secreto"
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-red-600 focus:outline-none bg-white text-gray-800 placeholder-gray-500"
                />
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-red-600 focus:outline-none bg-white text-gray-800 placeholder-gray-500"
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Confirmar contraseña
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-red-600 focus:outline-none bg-white text-gray-800 placeholder-gray-500"
                />
              </div>
            </div>

            {/* ERROR */}
            {error && (
              <p className="text-red-600 text-sm font-semibold text-center">
                {error}
              </p>
            )}

            {/* BOTÓN */}
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-md transition duration-200 shadow-md"
            >
              Crear cuenta
            </button>
          </form>

          {/* LOGIN */}
          <div className="text-center mt-6 text-gray-700">
            ¿Ya tenés cuenta?{" "}
            <Link
              to="/login"
              className="text-red-600 font-semibold hover:underline"
            >
              Iniciar sesión
            </Link>
          </div>
        </div>

        {/* LADO DERECHO - Imagen */}
        <div className="hidden md:flex md:w-1/2 relative">
          <img
            src="/img_register.jpg"
            alt="FleetParts Registro"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2c2c2c]/90 via-[#2c2c2c]/60 to-transparent flex flex-col justify-end items-start p-10">
            <h2 className="text-4xl font-bold text-white mb-2">
              Unite a FleetParts
            </h2>
            <p className="text-gray-200">
              Registrate y accedé al portal exclusivo de repuestos pesados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
