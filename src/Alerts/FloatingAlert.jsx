import { useEffect } from "react";

export default function FloatingAlert({ message, type = "success", onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose?.();
    }, 3000); // desaparece después de 3 segundos

    return () => clearTimeout(timer);
  }, [onClose]);

  const colors = {
    success: "bg-green-500",
    error: "bg-red-500",
    warning: "bg-yellow-500",
    info: "bg-blue-500",
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 px-5 py-3 text-white font-medium rounded-lg shadow-lg ${colors[type]}`}
    >
      {message}
    </div>
  );
}