import { formatPrice, parseArCurrency } from "../utils/CartUtils";

export default function CartSummary({ cart, total, error, onConfirm, navigate }) {
  return (
    <aside className="bg-white rounded-md shadow-md p-6 border border-gray-200 h-fit">
      <h2 className="text-2xl font-semibold mb-6 text-center text-red-600">
        Resumen del pedido
      </h2>

      {cart.map((item) => (
        <div
          key={item.id}
          className="flex justify-between border-b border-gray-200 pb-1 text-gray-700"
        >
          <span className="truncate w-2/3">
            {item.name} × {item.qty}
          </span>
          <span>{formatPrice(parseArCurrency(item.price) * item.qty)}</span>
        </div>
      ))}

      <div className="border-t border-gray-300 mt-6 pt-4 flex justify-between text-lg font-bold">
        <span>Total</span>
        <span className="text-red-600">{formatPrice(total)}</span>
      </div>

      {error && (
        <p className="mt-3 text-sm text-red-600 text-center">{error}</p>
      )}

      <button
        onClick={onConfirm}
        className="mt-6 w-full bg-red-600 hover:bg-red-500 text-white py-3 rounded-md font-semibold transition-colors"
      >
        Confirmar pedido
      </button>

      <button
        onClick={() => navigate("/products")}
        className="mt-3 w-full text-red-500 hover:text-red-500 text-sm font-medium transition-colors"
      >
        ← Seguir comprando
      </button>
    </aside>
  );
}
