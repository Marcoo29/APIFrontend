import { Link } from "react-router-dom";

const RegisterForm = ({
  name,
  lastname,
  username,
  email,
  password,
  confirmPassword,
  error,
  setName,
  setLastname,
  setUsername,
  setEmail,
  setPassword,
  setConfirmPassword,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* Nombre + Apellido */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-2">Nombre</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border rounded-md"
            placeholder="Juan"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Apellido</label>
          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            className="w-full px-4 py-3 border rounded-md"
            placeholder="Perez"
          />
        </div>
      </div>

      {/* Username */}
      <div>
        <label className="block text-sm font-semibold mb-2">Usuario</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-3 border rounded-md"
          placeholder="Nombre de usuario"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-semibold mb-2">Correo electrónico</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 border rounded-md"
          placeholder="usuario@empresa.com.ar"
        />
      </div>

      {/* Password */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-2">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border rounded-md"
            placeholder="••••••••"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Confirmar contraseña</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-3 border rounded-md"
            placeholder="••••••••"
          />
        </div>
      </div>

      {error && <p className="text-red-600 text-center">{error}</p>}

      {/* Submit */}
      <button className="w-full bg-red-600 text-white py-3 rounded-md font-semibold">
        Crear cuenta
      </button>

      {/* Link login */}
      <div className="text-center mt-6">
        ¿Ya tenés cuenta?{" "}
        <Link to="/login" className="text-red-600 font-bold">
          Iniciar sesión
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;
