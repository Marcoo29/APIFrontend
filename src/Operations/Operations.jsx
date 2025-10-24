import { useEffect, useState } from "react";

export default function Operations({ user }) {
  const [operations, setOperations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [details, setDetails] = useState({});

  const getToken = () => {
    let t = user?.token;
    if (!t) {
      const rawUser = localStorage.getItem("user");
      if (rawUser) {
        try {
          const u = JSON.parse(rawUser);
          t = u?.token;
        } catch (err) {
          console.warn("Error leyendo token:", err);
        }
      }
    }
    if (!t) t = localStorage.getItem("token");
    if (typeof t === "string") t = t.replace(/^"(.*)"$/, "$1").trim();
    return t || null;
  };

  useEffect(() => {
    const fetchOperations = async () => {
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

        if (!res.ok) {
          const text = await res.text().catch(() => "");
          throw new Error(text || "Error al obtener las operaciones");
        }

        const data = await res.json();
        const content = Array.isArray(data)
          ? data
          : Array.isArray(data.content)
          ? data.content
          : [];

        setOperations(content);
      } catch (err) {
        console.error(err);
        setError(err.message || "Error al cargar operaciones");
      } finally {
        setLoading(false);
      }
    };

    fetchOperations();
  }, []);

  const toggleDetails = async (operationId) => {
    const token = getToken();
    if (!token) {
      setDetails((prev) => ({
        ...prev,
        [operationId]: { ...(prev[operationId] || {}), open: true, error: "Sesión inválida" },
      }));
      return;
    }

    if (details[operationId]?.open && !details[operationId]?.loading) {
      setDetails((prev) => ({ ...prev, [operationId]: { ...prev[operationId], open: false } }));
      return;
    }

    if (details[operationId]?.items && details[operationId].items.length) {
      setDetails((prev) => ({ ...prev, [operationId]: { ...prev[operationId], open: true } }));
      return;
    }

    setDetails((prev) => ({
      ...prev,
      [operationId]: { ...(prev[operationId] || {}), loading: true, error: "", open: true },
    }));

    try {
      const res = await fetch(
        `http://localhost:4002/operationDetail/${operationId}/details`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || "Error al obtener el detalle");
      }

      const items = await res.json();
      setDetails((prev) => ({
        ...prev,
        [operationId]: { loading: false, error: "", items: Array.isArray(items) ? items : [], open: true },
      }));
    } catch (err) {
      console.error(err);
      setDetails((prev) => ({
        ...prev,
        [operationId]: { loading: false, error: err.message || "Error al cargar detalle", items: [], open: true },
      }));
    }
  };

  const fmtCurrency = (n) =>
    (n ?? 0).toLocaleString("es-AR", { style: "currency", currency: "ARS" });

  return (
    <main className="min-h-screen bg-white text-gray-900 pt-24 px-6 md:px-16 lg:px-32">
      <h1 className="text-3xl font-bold text-red-600 mb-8 text-center">
        Historial de operaciones
      </h1>

      {loading ? (
        <p className="text-center text-gray-600">Cargando operaciones...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : operations.length === 0 ? (
        <p className="text-center text-gray-500">No hay operaciones registradas.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <thead className="bg-red-600 text-white text-sm uppercase">
              <tr>
                <th className="px-4 py-3 text-left">#ID</th>
                <th className="px-4 py-3 text-left">Usuario</th>
                <th className="px-4 py-3 text-left">Total</th>
                <th className="px-4 py-3 text-left">Pago</th>
                <th className="px-4 py-3 text-left">Estado</th>
                <th className="px-4 py-3 text-left">Fecha</th>
                <th className="px-4 py-3 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {operations.map((op) => {
                const d = details[op.id] || {};
                return (
                  <FragmentRow
                    key={op.id}
                    op={op}
                    detail={d}
                    onToggle={() => toggleDetails(op.id)}
                    fmtCurrency={fmtCurrency}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

function FragmentRow({ op, detail, onToggle, fmtCurrency }) {
  return (
    <>
      <tr className="hover:bg-gray-50 transition-colors text-gray-700">
        <td className="px-4 py-3 font-medium text-gray-800">#{op.id}</td>
        <td className="px-4 py-3">
          {op.user?.name} {op.user?.lastname}
          <div className="text-sm text-gray-500">{op.user?.email}</div>
        </td>
        <td className="px-4 py-3 font-semibold text-gray-900">
          {fmtCurrency(op.total)}
        </td>
        <td className="px-4 py-3">{op.payMethod}</td>
        <td className="px-4 py-3">
          <span
            className={`px-2 py-1 rounded-md text-xs font-semibold ${
              op.operationStatus === "IN_PROCESS"
                ? "bg-yellow-100 text-yellow-700"
                : op.operationStatus === "COMPLETED"
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {op.operationStatus}
          </span>
        </td>
        <td className="px-4 py-3 text-sm text-gray-600">
          {new Date(op.date).toLocaleString("es-AR", {
            dateStyle: "short",
            timeStyle: "short",
          })}
        </td>
        <td className="px-4 py-3">
          <button
            onClick={onToggle}
            className="px-3 py-1.5 rounded-md text-sm font-semibold bg-red-600 text-white hover:bg-red-700 transition-colors"
          >
            {detail?.open ? "Ocultar" : "Ver detalle"}
          </button>
        </td>
      </tr>

      {detail?.open && (
        <tr className="bg-gray-50">
          <td colSpan={7} className="px-4 py-3">
            {detail.loading ? (
              <div className="text-gray-600">Cargando detalle...</div>
            ) : detail.error ? (
              <div className="text-red-600">{detail.error}</div>
            ) : !detail.items || detail.items.length === 0 ? (
              <div className="text-gray-500">Sin items en esta operación.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-[640px] w-full bg-white border border-gray-200 rounded-lg">
                  <thead className="bg-gray-100 text-gray-700 text-xs uppercase">
                    <tr>
                      <th className="px-3 py-2 text-left">Producto ID</th>
                      <th className="px-3 py-2 text-left">Producto</th>
                      <th className="px-3 py-2 text-left">Cantidad</th>
                      <th className="px-3 py-2 text-left">Precio</th>
                      <th className="px-3 py-2 text-left">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {detail.items.map((it) => {
                      const productId =
                        it.productId ?? it.product?.id ?? it.product?.productId ?? "-";
                      const productName =
                        it.productName ?? it.product?.name ?? it.product?.productName ?? "-";
                      const qty = it.quantity ?? it.qty ?? 0;
                      const unitPrice =
                        it.price ?? it.unitPrice ?? it.product?.price ?? null;
                      const subtotal =
                        unitPrice != null ? Number(unitPrice) * Number(qty) : null;

                      return (
                        <tr key={`${productId}-${Math.random()}`} className="text-sm">
                          <td className="px-3 py-2">{productId}</td>
                          <td className="px-3 py-2">{productName}</td>
                          <td className="px-3 py-2">{qty}</td>
                          <td className="px-3 py-2">
                            {unitPrice != null ? fmtCurrency(unitPrice) : "—"}
                          </td>
                          <td className="px-3 py-2">
                            {subtotal != null ? fmtCurrency(subtotal) : "—"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </td>
        </tr>
      )}
    </>
  );
}
