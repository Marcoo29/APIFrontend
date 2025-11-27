

export default function PaymentMethodDetails({
  PAYMENT_NAMES,
  formatPrice,
  total,
  payMethod,
  setPayMethod,
  cardNumber,
  setCardNumber,
  cardName,
  setCardName,
  cardExp,
  setCardExp,
  cardCvv,
  setCardCvv,
  installments,
  setInstallments,
}) {
  return (
    <>
      <h2 className="text-xl font-semibold mt-8">Método de pago</h2>
      <div className="mt-3 space-y-2">
        {Object.keys(PAYMENT_NAMES).map((m) => (
          <label key={m} className="flex items-center gap-2">
            <input
              type="radio"
              name="pay"
              value={m}
              checked={payMethod === m}
              onChange={(e) => setPayMethod(e.target.value)}
            />
            {PAYMENT_NAMES[m]}
          </label>
        ))}
      </div>

      {payMethod === "TRANSFER" && (
        <div className="mt-4 p-4 border border-gray-300 rounded-md bg-gray-50">
          <h3 className="text-lg font-semibold text-red-600 mb-2">
            Pago por Transferencia
          </h3>

          <p className="mb-1">
            Por favor transferí el importe total al siguiente alias:
          </p>

          <p className="mt-2 font-bold text-gray-900 text-lg">
            👉 ALIAS: <span className="text-red-600">FLEET.PARTS</span>
          </p>

          <p className="mt-2 text-gray-600">
            Una vez realizada, enviá el comprobante por WhatsApp a{" "}
            <a
              href="https://wa.me/5491113345555"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-green-600 font-semibold"
            >
              +54 9 11 1334-5555
            </a>{" "}
            y finalizá la compra.
          </p>

          <p className="mt-4 text-xl font-semibold text-green-700">
            Total a transferir: {formatPrice(total)}
          </p>
        </div>
      )}

      {payMethod === "MERCADO_PAGO" && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
          <div className="flex items-center gap-3 mb-3">
            <img
              src="https://logowik.com/content/uploads/images/mercado-pago3162.logowik.com.webp"
              width="150"
              height="auto" 
              alt="Logo de Mercado Pago"
            />
            <h3 className="font-semibold text-lg text-blue-700">
              Pago con Mercado Pago
            </h3>
          </div>

          <p className="text-blue-700 mb-3">
            Serás redirigido para completar el pago mediante Mercado Pago.
          </p>

          <button
            onClick={() => alert("Simulación: Ir a Mercado Pago")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold shadow"
          >
            Ir a Mercado Pago
          </button>
        </div>
      )}

      {(payMethod === "DEBIT" || payMethod === "CREDIT") && (
        <div className="mt-4 p-4 border border-gray-300 rounded-md bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Pago con {payMethod === "DEBIT" ? "Débito" : "Crédito"}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              className="border rounded p-2"
              placeholder="Número de tarjeta"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
            <input
              className="border rounded p-2"
              placeholder="Nombre en la tarjeta"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
            />
            <input
              className="border rounded p-2"
              placeholder="Vencimiento (MM/AA)"
              value={cardExp}
              onChange={(e) => setCardExp(e.target.value)}
            />
            <input
              className="border rounded p-2"
              placeholder="CVV"
              value={cardCvv}
              onChange={(e) => setCardCvv(e.target.value)}
            />
          </div>

          {payMethod === "CREDIT" && (
            <div className="mt-3">
              <label className="font-semibold">Cuotas:</label>
              <select
                className="border rounded p-2 ml-2"
                value={installments}
                onChange={(e) => setInstallments(e.target.value)}
              >
                <option value="3">3 cuotas</option>
                <option value="6">6 cuotas</option>
              </select>
            </div>
          )}
        </div>
      )}
    </>
  );
}
