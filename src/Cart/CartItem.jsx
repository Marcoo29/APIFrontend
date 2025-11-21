import React from "react";
import ProductThumb from "./ProductThumb";
import { parseArCurrency } from "../utils/CartUtils";

export default function CartItem({
  item,
  formatPrice,
  increaseQty,
  decreaseQty,
  removeItem,
  onNavigate
}) {
  return (
    <div
      onClick={() => onNavigate(`/products/${item.id}`)}
      className="flex flex-col sm:flex-row items-center justify-between bg-gray-50 p-4 rounded-md border border-gray-200 hover:border-red-400 transition-all duration-200 cursor-pointer"
    >
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <ProductThumb id={item.id} name={item.name} fallbackImage={item.image} />

        <div>
          <p className="font-semibold text-lg">{item.name}</p>

          {/* PRECIO UNITARIO CORRECTO */}
          <p className="text-gray-500">
            {formatPrice(item.price)}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 mt-3 sm:mt-0">
        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden shadow-sm">
          <button
            onClick={(e) => {
              e.stopPropagation();
              decreaseQty(item.id);
            }}
            className="px-3 py-1 text-gray-600 hover:text-red-600 transition"
          >
            –
          </button>

          <div className="px-4 text-gray-800 text-center">{item.qty}</div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              increaseQty(item.id);
            }}
            className="px-3 py-1 text-gray-600 hover:text-red-600 transition"
          >
            +
          </button>
        </div>

        {/* SUBTOTAL CORRECTO: precio parseado * qty */}
        <span className="font-semibold text-lg w-28 text-right">
          {formatPrice(parseArCurrency(item.price) * item.qty)}
        </span>

        <button
          onClick={(e) => {
            e.stopPropagation();
            removeItem(item.id);
          }}
          className="text-red-600 hover:underline text-sm font-medium"
        >
          Quitar
        </button>
      </div>
    </div>
  );
}
