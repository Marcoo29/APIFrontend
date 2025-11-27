import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../../redux/authSlice";
import { toast } from "../../utils/toast"; // ← agregado

export const useRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  // estado local SOLO para los campos, no para el fetch
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !lastname || !username || !email || !password || !confirmPassword) {
      return setLocalError("Completá todos los campos.");
    }

    if (password !== confirmPassword) {
      return setLocalError("Las contraseñas no coinciden.");
    }

    const result = await dispatch(
      registerUser({ name, lastname, username, email, password })
    );

    if (result.meta.requestStatus === "fulfilled") {
      toast.fire({
        icon: "success",
        title: "Registro exitoso",
      });

      navigate("/login");
    }
  };

  return {
    name,
    lastname,
    username,
    email,
    password,
    confirmPassword,
    error: localError || error,
    loading,
    setName,
    setLastname,
    setUsername,
    setEmail,
    setPassword,
    setConfirmPassword,
    handleSubmit,
  };
};
