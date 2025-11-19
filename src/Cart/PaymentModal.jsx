export default function PaymentModal({
  payMethod,
  setPayMethod,
  handleSubmitOperation,
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
              value="efectivo"
              checked={payMethod === "efectivo"}
              onChange={(e) => setPayMethod(e.target.value)}
            />
            Efectivo
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="payment"
              value="tarjeta"
              checked={payMethod === "tarjeta"}
              onChange={(e) => setPayMethod(e.target.value)}
            />
            Tarjeta
          </label>
        </div>

        <div className="mt-6 flex gap-4">
          <button
            onClick={handleSubmitOperation}
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
