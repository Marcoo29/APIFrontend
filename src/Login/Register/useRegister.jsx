import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../../redux/authSlice";
import { toast } from "../../utils/toast";

export const useRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLocalError("");

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
    } else if (result.meta.requestStatus === "rejected") {
        if (error && error.message.includes("El correo ya está registrado")) {
            setLocalError("ERROR, el usuario ya existe");
        } else if (error && error.message.includes("El nombre de usuario ya está en uso")) {
             setLocalError("ERROR, el nombre de usuario ya está en uso");
        }
    }
  };

  return {
    name,
    lastname,
    username,
    email,
    password,
    confirmPassword,
    error: localError || error?.message, 
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

export default useRegister;