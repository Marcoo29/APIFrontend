import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validar que todos los campos estén completos
    if (!name || !lastname || !username || !email || !password || !confirmPassword) {
      setError("Por favor, completá todos los campos.");
      return;
    }

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
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
          role: "USER", // todos los usuarios nuevos son USER
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Error al registrarse");
        return;
      }

      console.log("Usuario registrado:", data);
      alert("¡Registro exitoso!");
      navigate("/login"); // redirigir al login
    } catch (err) {
      console.error(err);
      setError("Error de conexión con el servidor");
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display min-h-screen flex items-center justify-center p-4">
      <div className="flex w-full mb-6 max-w-5xl mx-auto overflow-hidden bg-white dark:bg-background-dark/80 rounded-lg shadow-2xl">
        {/* Formulario */}
        <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-text-light dark:text-text-dark mb-6">
            CREAR CUENTA
          </h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-text-light dark:text-text-dark mb-1">
                  Nombre
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary border-none placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>
              <div>
                <label htmlFor="lastname" className="block text-sm font-bold text-text-light dark:text-text-dark mb-1">
                  Apellido
                </label>
                <input
                  id="lastname"
                  type="text"
                  placeholder="Apellido"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary border-none placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-bold text-text-light dark:text-text-dark mb-1">
                Nombre de Usuario
              </label>
              <input
                id="username"
                type="text"
                placeholder="Tu nombre de usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary border-none placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-bold text-text-light dark:text-text-dark mb-1">
                Correo Electrónico
              </label>
              <input
                id="email"
                type="email"
                placeholder="example@hotmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary border-none placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-bold text-text-light dark:text-text-dark mb-1">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary border-none placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>

            <div>
              <label htmlFor="confirm-password" className="block text-sm font-bold text-text-light dark:text-text-dark mb-1">
                Confirmar Contraseña
              </label>
              <input
                id="confirm-password"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary border-none placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>

            {error && <p className="text-red-600 text-sm text-center">{error}</p>}

            <button
              type="submit"
              className="w-full bg-red-700 text-white font-semibold py-2 px-3 rounded-md hover:bg-red-900 transition-colors duration-300 text-sm"
            >
              CREAR CUENTA
            </button>
          </form>

          <div className="text-center mt-3">
            <Link to="/login" className="text-primary hover:font-bold text-sm">
              ¿Ya tenés cuenta? <u>Iniciar sesión</u>
            </Link>
          </div>
        </div>

        {/* Imagen lateral */}
        <div className="md:w-1/2 hidden md:flex items-center justify-center">
          <div className="w-full h-[450px] flex items-center justify-center">
            <img
              alt="Coche gris en la calle"
              className="object-contain max-h-full max-w-full rounded-lg"
              src="https://i.imgur.com/njTrnld.jpeg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
