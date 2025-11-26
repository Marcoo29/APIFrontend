import { useState } from "react";
import OperationDetails from "./OperationDetails";
import { useDispatch } from "react-redux";
import { updateOperationStatus } from "../redux/operationSlice";

export default function OperationRow({ op, detail, onToggle, fmtCurrency }) {
  const [updating, setUpdating] = useState(false);
  const dispatch = useDispatch();

  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const token = storedUser?.token;

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    if (!token) return;

    setUpdating(true);
    try {
      await dispatch(updateOperationStatus({ id: op.id, newStatus, token })).unwrap();
    } catch (err) {
      console.error("Error actualizando estado:", err);
    }
    setUpdating(false);
  };

  return (
    <>
      <tr className="hover:bg-gray-50 transition-colors">
        <td className="px-4 py-3 font-medium">#{op.id}</td>
        <td className="px-4 py-3">
          {op.user?.name} {op.user?.lastname}
          <div className="text-sm text-gray-500">{op.user?.email}</div>
        </td>
        <td className="px-4 py-3 font-semibold">{fmtCurrency(op.total)}</td>
        <td className="px-4 py-3">{op.payMethod}</td>
        <td className="px-4 py-3">
          <select
            value={op.operationStatus}
            onChange={handleStatusChange}
            disabled={updating}
            className={`px-2 py-1 rounded-md text-sm font-semibold ${
              op.operationStatus === "IN_PROCESS"
                ? "bg-yellow-100 text-yellow-700"
                : op.operationStatus === "SHIPPED"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            <option value="IN_PROCESS">IN PROCESS</option>
            <option value="SHIPPED">SHIPPED</option>
            <option value="CANCELLED">CANCELLED</option>
          </select>
        </td>
        <td className="px-4 py-3 text-sm text-gray-600">
          {new Date(op.date).toLocaleString("es-AR", { dateStyle: "short", timeStyle: "short" })}
        </td>
        <td className="px-4 py-3">
          <button
            onClick={onToggle}
            className="px-3 py-1.5 rounded-md text-sm font-semibold bg-red-600 text-white hover:bg-red-700"
          >
            {detail?.open ? "Ocultar" : "Ver detalle"}
          </button>
        </td>
      </tr>

      {detail?.open && <OperationDetails detail={detail} fmtCurrency={fmtCurrency} />}
    </>
  );
}
