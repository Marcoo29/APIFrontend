import OperationRow from "./OperationRow";

export default function OperationsTable({ operations, details, toggleDetails, fmtCurrency }) {
  if (!operations.length)
    return <p className="text-center text-gray-500">No hay operaciones registradas.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 rounded-xl shadow-sm">
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
          {operations.map((op) => (
            <OperationRow
              key={op.id}
              op={op}
              detail={details[op.id]}
              onToggle={() => toggleDetails(op.id)}
              fmtCurrency={fmtCurrency}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
