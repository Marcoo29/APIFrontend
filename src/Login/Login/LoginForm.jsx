import { Link } from "react-router-dom";

const LoginForm = ({
  email,
  password,
  error,
  loading,
  setEmail,
  setPassword,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      <input
        type="email"
        placeholder="Correo Electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-3 rounded-md border border-gray-300"
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-3 rounded-md border border-gray-300"
      />

      {error && <p className="text-red-600 text-center">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-md"
      >
        {loading ? "Ingresando..." : "Iniciar sesión"}
      </button>

      <div className="text-center mt-6">
        ¿No tenés cuenta?
        <Link to="/register" className="text-red-600 font-semibold ms-1">
          Registrate
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
