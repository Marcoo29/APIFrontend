// Convierte "137.000" → 137000
export function parseArCurrency(value) {
  if (typeof value === "number") return value;
  if (!value) return 0;

  let s = String(value).trim();

  // Quita símbolos no numéricos
  s = s.replace(/[^\d.,-]/g, "");

  const hasComma = s.includes(",");
  const hasDot = s.includes(".");

  // Si tiene ambos, el punto es separador de miles
  if (hasComma && hasDot) {
    s = s.replace(/\./g, "").replace(",", ".");
  } else if (hasComma) {
    s = s.replace(",", ".");
  } else if (hasDot) {
    // Caso "137.000" → miles → quitar
    const parts = s.split(".");
    if (parts.length === 2 && parts[1].length === 3) {
      s = parts.join("");
    }
  }

  const n = Number(s);
  return Number.isFinite(n) ? n : 0;
}

export function formatPrice(value) {
  return parseArCurrency(value).toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
  });
}
