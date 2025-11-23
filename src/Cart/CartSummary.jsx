import React from "react";
import { formatPrice } from "../utils/ParseCurrency";

export default function CartSummary({ cart, formatPrice, total, error, handleConfirm, onNavigate }) {
  return (
    <aside className="bg-white rounded-md shadow-md p-6 border border-gray-200 h-fit">
      <h2 className="text-2xl font-semibold mb-6 text-center text-red-600">
        Resumen del pedido
      </h2>

      {cart.map((item) => (
        <div key={item.id} className="flex justify-between border-b border-gray-200 pb-1 text-gray-700">
          <span>{item.name} × {item.qty}</span>
          {formatPrice(item.price) * item.qty}


        </div>
      ))}

      <div className="border-t border-gray-300 mt-6 pt-4 flex justify-between text-lg font-bold">
        <span>Total</span>
        <span className="text-red-600">{formatPrice(total)}</span>
      </div>

      {error && <p className="mt-3 text-sm text-red-600 text-center">{error}</p>}

      <button
        onClick={handleConfirm}
        className="mt-6 w-full bg-red-600 hover:bg-red-500 text-white py-3 rounded-md font-semibold"
      >
        Confirmar pedido
      </button>

      <button
        onClick={() => onNavigate("/products")}
        className="mt-3 w-full text-red-500 text-sm font-medium"
      >
        ← Seguir comprando
      </button>
    </aside>
  );
}
