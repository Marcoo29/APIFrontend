
const Register = () => {
  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4">Registro</h2>
      {(
        <div
          style={{
            background: "#fff3cd",
            color: "#856404",
            border: "1.5px solid #ffeeba",
            borderRadius: 8,
            padding: "10px 16px",
            marginBottom: 16,
            textAlign: "center",
            fontWeight: 700,
            fontSize: 16,
            boxShadow: "0 2px 8px #ffeeba88",
          }}
        >
        </div>
      )}
      <form>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Correo electrónico</label>
          <input
            type="email"
            className="form-control"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-success w-100">
          Registrarse
        </button>
      </form>
      <div className="text-center mt-3">
        {/*<Link to="/login" className=" w-100">
          ¿Ya tenés una cuenta? Iniciar sesión
        </Link>*/}
      </div>
    </div>
  );
};

export default Register
