import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/authSlice";

const API_AUTH = "http://localhost:4002/api/v1/auth/authenticate";
const API_USERS = "http://localhost:4002/users/by-email";

const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      return setError("Completá todos los campos.");
    }

    try {
      setLoading(true);

      // 1) Login
      const res = await fetch(API_AUTH, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setLoading(false);
        return setError(data.message || "Correo o contraseña incorrecta");
      }

      const token = data.access_token || data.token;

      // 2) Obtener datos completos del usuario (incluye id)
      const userRes = await fetch(`${API_USERS}/${email}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const userData = await userRes.json();

      // 3) Guardar TODO en Redux
      dispatch(
        loginSuccess({
          id: userData.id,
          name: data.name,
          email: data.email,
          role: data.role,
          token,
        })
      );

      setLoading(false);
      navigate("/");

    } catch (err) {
      console.error(err);
      setLoading(false);
      setError("Error de conexión");
    }
  };

  return {
    email,
    password,
    error,
    loading,
    setEmail,
    setPassword,
    handleSubmit,
  };
};

export default useLogin;
