import OperationDetails from "./OperationDetails";

export default function OperationRow({ op, detail, onToggle, fmtCurrency }) {
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
