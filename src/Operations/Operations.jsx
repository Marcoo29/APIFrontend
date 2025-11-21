import { useEffect, useState } from "react";
import OperationsTable from "./OperationsTable";

export default function Operations() {
  const [operations, setOperations] = useState([]);
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Obtener user desde localStorage
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const user = storedUser;

  const fmtCurrency = (n) =>
    (n ?? 0).toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
    });

  const getToken = () => {
    let t = user?.token;

    if (!t) t = localStorage.getItem("token");
    if (typeof t === "string") t = t.replace(/^"(.*)"$/, "$1").trim();

    return t || null;
  };

  // Cargar operaciones
  useEffect(() => {
    const fetchOps = async () => {
      setLoading(true);
      setError("");

      const token = getToken();
      if (!token) {
        setError("No hay sesión activa. Iniciá sesión nuevamente.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("http://localhost:4002/operations", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok)
          throw new Error((await res.text()) || "Error al obtener operaciones");

        const data = await res.json();

        const list = Array.isArray(data)
          ? data
          : Array.isArray(data.content)
          ? data.content
          : [];

        setOperations(list);
      } catch (err) {
        setError(err.message || "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchOps();
  }, []);

  // Cargar / ocultar detalles
  const toggleDetails = async (opId) => {
    const token = getToken();
    if (!token) {
      setDetails((prev) => ({
        ...prev,
        [opId]: { ...prev[opId], open: true, error: "Sesión inválida" },
      }));
      return;
    }

    const d = details[opId] || {};

    // Si ya está abierto → cerrar
    if (d.open && !d.loading) {
      setDetails((prev) => ({ ...prev, [opId]: { ...d, open: false } }));
      return;
    }

    // Si ya tiene datos → abrir
    if (d.items && d.items.length) {
      setDetails((prev) => ({ ...prev, [opId]: { ...d, open: true } }));
      return;
    }

    // Cargar por primera vez
    setDetails((prev) => ({
      ...prev,
      [opId]: { loading: true, error: "", open: true },
    }));

    try {
      const res = await fetch(
        `http://localhost:4002/operationDetail/${opId}/details`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!res.ok)
        throw new Error((await res.text()) || "Error al obtener detalles");

      const items = await res.json();

      setDetails((prev) => ({
        ...prev,
        [opId]: { loading: false, error: "", items, open: true },
      }));
    } catch (err) {
      setDetails((prev) => ({
        ...prev,
        [opId]: {
          loading: false,
          error: err.message || "Error al cargar detalle",
          items: [],
          open: true,
        },
      }));
    }
  };

  return (
    <main className="min-h-screen bg-white pt-24 px-6 md:px-16 lg:px-32">
      <h1 className="text-3xl font-bold text-red-600 mb-8 text-center">
        Historial de operaciones
      </h1>

      {loading ? (
        <p className="text-center">Cargando operaciones...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : (
        <OperationsTable
          operations={operations}
          details={details}
          toggleDetails={toggleDetails}
          fmtCurrency={fmtCurrency}
        />
      )}
    </main>
  );
}
