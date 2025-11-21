export default function PaymentModal({
  payMethod,
  setPayMethod,
  onSubmit,
  opLoading,
  setShowPayment,
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4 text-center">Método de pago</h2>

        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="payment"
              value="TRANSFER"
              checked={payMethod === "TRANSFER"}
              onChange={(e) => setPayMethod(e.target.value)}
            />
            Transferencia
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="payment"
              value="MERCADO_PAGO"
              checked={payMethod === "MERCADO_PAGO"}
              onChange={(e) => setPayMethod(e.target.value)}
            />
            Mercado Pago
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="payment"
              value="CREDIT"
              checked={payMethod === "CREDIT"}
              onChange={(e) => setPayMethod(e.target.value)}
            />
            Tarjeta de crédito
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="payment"
              value="DEBIT"
              checked={payMethod === "DEBIT"}
              onChange={(e) => setPayMethod(e.target.value)}
            />
            Tarjeta de débito
          </label>
        </div>

        <div className="mt-6 flex gap-4">
          <button
            onClick={onSubmit}
            className="flex-1 py-2 bg-blue-600 text-white rounded-lg"
            disabled={opLoading}
          >
            {opLoading ? "Procesando..." : "Finalizar"}
          </button>

          <button
            onClick={() => setShowPayment(false)}
            className="flex-1 py-2 bg-gray-300 rounded-lg"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
