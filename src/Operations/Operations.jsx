import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OperationsTable from "./OperationsTable";
import {
  fetchOperationDetail,
  fetchOperations,
  openDetail,
  closeDetail,
  updateOperationStatus,
} from "../redux/operationSlice";

export default function Operations() {
  const dispatch = useDispatch();

  const { items: operations, itemsId: details, loading, error } = useSelector(
    (state) => state.operations
  );
  const token = useSelector((state) => state.auth.token);

  const fmtCurrency = (n) =>
    (n ?? 0).toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
    });

  useEffect(() => {
    if (token) {
      dispatch(fetchOperations(token));
    }
  }, [dispatch, token]);

  const toggleDetails = (opId) => {
    const d = details[opId];

    if (d?.open) {
      dispatch(closeDetail(opId));
    } else if (!d?.items?.length) {
      if (!token) return;
      dispatch(fetchOperationDetail({ opId, token }));
    } else {
      dispatch(openDetail(opId));
    }
  };

  const editOperationStatus = (opId, newStatus) => {
    if (!token) return;
    dispatch(updateOperationStatus({ id: opId, newStatus, token }));
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
          editOperationStatus={editOperationStatus}
        />
      )}
    </main>
  );
}
