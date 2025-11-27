import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { createOperation } from "../redux/operationSlice";
import { clearCart } from "../redux/cartSlice";

import PaymentMethodDetails from "./PaymentMethodDetails"; 


function parseArCurrency(value) {
  if (typeof value === "number") return value;
  if (!value) return 0;
  let s = String(value).trim();
  s = s.replace(/[^\d.,-]/g, "");
  const hasComma = s.includes(",");
  const hasDot = s.includes(".");
  if (hasComma && hasDot) s = s.replace(/\./g, "").replace(",", ".");
  else if (hasComma) s = s.replace(",", ".");
  else if (hasDot) s = s.replace(/\./g, "");
  const n = Number(s);
  return Number.isFinite(n) ? n : 0;
}

function formatPrice(value) {
  return parseArCurrency(value).toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
  });
}

const PAYMENT_NAMES = {
  TRANSFER: "Transferencia",
  MERCADO_PAGO: "Mercado Pago",
  CREDIT: "Tarjeta de crédito",
  DEBIT: "Tarjeta de débito",
};


export default function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart.items);
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.id);

  const loading = useSelector((state) => state.operations.loading);
  const errorApi = useSelector((state) => state.operations.error);

  const [payMethod, setPayMethod] = useState("");
  const [localError, setLocalError] = useState(null);

  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExp, setCardExp] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [installments, setInstallments] = useState("3");

  const total = cart.reduce(
    (acc, i) => acc + parseArCurrency(i.price) * (i.qty || 1),
    0
  );

  const handleSubmit = async () => {
    if (!payMethod) return setLocalError("Elegí un método de pago.");
    if (!userId) return setLocalError("Tenés que iniciar sesión.");
    if (!token) return setLocalError("Sesión inválida.");

    if (payMethod === "DEBIT" || payMethod === "CREDIT") {
      if (!cardNumber || !cardName || !cardExp || !cardCvv) {
        return setLocalError("Completá todos los campos de la tarjeta.");
      }
    }

    setLocalError(null);

    try {
      await dispatch(
        createOperation({
          userId,
          payMethod,
          cart,
          token,
        })
      ).unwrap();

      dispatch(clearCart());
      navigate("/order-success");
    } catch (err) {
      setLocalError(err.message);
    }
  };

  return (
    <main className="min-h-screen bg-white pt-24 px-6 md:px-16 lg:px-32">
      <h1 className="text-3xl font-bold text-center mb-6">Confirmar compra</h1>

      {!cart.length ? (
        <p className="text-center text-gray-600">Tu carrito está vacío.</p>
      ) : (
        <div className="max-w-3xl mx-auto bg-white shadow-md border border-gray-200 p-6 rounded-md">
          <h2 className="text-xl font-semibold mb-4">Productos</h2>

          {/* Resumen del Carrito */}
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between py-2 border-b">
              <span>
                {item.name} × {item.qty}
              </span>
              <span>{formatPrice(item.price * item.qty)}</span>
            </div>
          ))}

          <div className="text-right mt-4 text-2xl font-bold text-red-600">
            Total: {formatPrice(total)}
          </div>

          <PaymentMethodDetails
            PAYMENT_NAMES={PAYMENT_NAMES}
            formatPrice={formatPrice}
            total={total}
            payMethod={payMethod}
            setPayMethod={setPayMethod}
            cardNumber={cardNumber}
            setCardNumber={setCardNumber}
            cardName={cardName}
            setCardName={setCardName}
            cardExp={cardExp}
            setCardExp={setCardExp}
            cardCvv={cardCvv}
            setCardCvv={setCardCvv}
            installments={installments}
            setInstallments={setInstallments}
          />

          {localError && (
            <p className="mt-4 text-red-600 text-center">{localError}</p>
          )}
          {errorApi && (
            <p className="mt-2 text-red-600 text-center">{errorApi}</p>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`mt-6 w-full py-3 rounded-md text-white font-semibold ${
              loading ? "bg-gray-400" : "bg-red-600 hover:bg-red-500"
            }`}
          >
            {loading ? "Procesando..." : "Finalizar compra"}
          </button>

          <button
            onClick={() => navigate("/cart")}
            className="mt-4 w-full text-red-600 text-sm"
          >
            ← Volver al carrito
          </button>
        </div>
      )}
    </main>
  );
}