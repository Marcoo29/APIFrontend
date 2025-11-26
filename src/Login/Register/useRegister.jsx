import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
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

    if (!name || !lastname || !username || !email || !password || !confirmPassword) {
      return setError("Completá todos los campos.");
    }

    if (password !== confirmPassword) {
      return setError("Las contraseñas no coinciden.");
    }

    try {
      const res = await fetch("http://localhost:4002/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          lastname,
          username,
          email,
          password,
          role: "USER",
        }),
      });

      const data = await res.json();

      if (!res.ok) return setError(data.message || "Error al registrarse");

      alert("Registro exitoso");
      navigate("/login");
    } catch {
      setError("Error de conexión");
    }
  };

  return {
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
  };
};
