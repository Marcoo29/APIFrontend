import { useNavigate } from "react-router-dom";

export default function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen pt-24 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-green-600">
        ¡Compra registrada!
      </h1>

      <p className="mt-4 text-gray-700">
        Gracias por tu compra. Pronto nos pondremos en contacto.
      </p>

      <button
        onClick={() => navigate("/products")}
        className="mt-6 bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-md"
      >
        Volver a productos
      </button>
    </main>
  );
}
