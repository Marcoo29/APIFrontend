export default function OperationDetails({ detail, fmtCurrency }) {
  return (
    <tr className="bg-gray-50">
      <td colSpan={7} className="px-4 py-3">
        {detail.loading ? (
          <div className="text-gray-600">Cargando detalle...</div>
        ) : detail.error ? (
          <div className="text-red-600">{detail.error}</div>
        ) : !detail.items?.length ? (
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
                {detail.items.map((it, idx) => {
                  const productId = it.productId ?? it.product?.id ?? "-";
                  const productName = it.productName ?? it.product?.name ?? "-";
                  const qty = it.quantity ?? it.qty ?? 0;
                  const unitPrice = it.price ?? it.unitPrice ?? it.product?.price;
                  const subtotal = unitPrice != null ? Number(unitPrice) * Number(qty) : null;

                  return (
                    <tr key={idx} className="text-sm">
                      <td className="px-3 py-2">{productId}</td>
                      <td className="px-3 py-2">{productName}</td>
                      <td className="px-3 py-2">{qty}</td>
                      <td className="px-3 py-2">{unitPrice != null ? fmtCurrency(unitPrice) : "—"}</td>
                      <td className="px-3 py-2">{subtotal != null ? fmtCurrency(subtotal) : "—"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </td>
    </tr>
  );
}