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
    
    // 1. Limpiar errores de intentos anteriores
    setLocalError(""); // Limpiar error local
    // Nota: El error de Redux se limpia automáticamente con .pending en authSlice

    if (!name || !lastname || !username || !email || !password || !confirmPassword) {
      return setLocalError("Completá todos los campos.");
    }

    if (password !== confirmPassword) {
      return setLocalError("Las contraseñas no coinciden.");
    }

    // 2. Ejecutar el registro
    const result = await dispatch(
      registerUser({ name, lastname, username, email, password })
    );

    // 3. Manejar el resultado
    if (result.meta.requestStatus === "fulfilled") {
      toast.fire({
        icon: "success",
        title: "Registro exitoso",
      });

      navigate("/login");
    } else if (result.meta.requestStatus === "rejected") {
        // Manejar el error de Redux para que se muestre en el componente
        // El error del backend ("El correo ya está registrado") ya está en el estado 'error' de Redux.
        
        // OPCIONAL: Si quieres mostrar un mensaje genérico para el usuario
        // si el error es de tipo duplicado de backend.
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
    // Mostrar el error local O el mensaje del error de Redux
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

export default useRegister; // Agregado: Exportación por defecto si es necesaria.