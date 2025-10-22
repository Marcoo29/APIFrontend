import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { role } = useAuth();

  if (!role) {
    // 🔹 Si no hay rol → no está logueado
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    // 🔹 Si el rol no tiene permiso
    return <Navigate to="/unauthorized" replace />;
  }

  // 🔹 Si tiene permiso, mostramos el componente hijo
  return children;
}
