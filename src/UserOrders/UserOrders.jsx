import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOperationsByEmail } from "../redux/operationSlice";

export default function UserOrders() {
  const dispatch = useDispatch();

  const { email, token, name } = useSelector((state) => state.auth);

  const { operations, loading, error } = useSelector(
    (state) => state.operations
  );

  useEffect(() => {
    if (email && token) {
      dispatch(fetchOperationsByEmail({ email, token }));
    }
  }, [email, token, dispatch]);


  if (!token)
    return (
      <p className="text-center mt-10 text-red-600 font-semibold">
        No estás logueado.
      </p>
    );

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-600 font-medium">
        Cargando órdenes...
      </p>
    );

  if (error)
    return (
      <p className="text-center mt-10 text-red-600 font-semibold">
        Error: {error}
      </p>
    );

  if (!operations?.length)
    return (
      <p className="text-center mt-10 text-gray-600 font-medium">
        No tenés órdenes registradas.
      </p>
    );

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h2 className="text-3xl font-bold text-red-500 mb-8 text-center">
        Pedidos de {name}
      </h2>

      <div className="flex flex-col gap-4">
        {operations.map((op) => (
          <div
            key={op.id}
            className="bg-white shadow-sm border border-gray-200 rounded-md p-5 hover:shadow-md transition"
          >
            <div className="flex justify-between mb-2">
              <span className="text-gray-700 font-medium">ID: {op.id}</span>
              <span className="text-gray-700 font-medium">
                Total: ${op.total?.toLocaleString("es-AR")}
              </span>
            </div>

            <p className="text-gray-700">
              <span className="font-semibold">Fecha:</span>{" "}
              {new Date(op.date).toLocaleString()}
            </p>

            <p className="text-gray-700">
              <span className="font-semibold">Estado:</span>{" "}
              {op.operationStatus}
            </p>

            <p className="text-gray-700">
              <span className="font-semibold">Pago:</span> {op.payMethod}
            </p>

            {op.details?.length > 0 && (
              <details className="mt-3">
                <summary className="cursor-pointer text-red-500 font-semibold">
                  Ver detalles
                </summary>
                <div className="mt-2 space-y-1 ml-4 text-gray-600 text-sm">
                  {op.details.map((d) => (
                    <div key={d.id}>
                      <p>
                        Producto ID:{" "}
                        <span className="font-medium">{d.productId}</span>
                      </p>
                      <p>
                        Cantidad:{" "}
                        <span className="font-medium">{d.quantity}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </details>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
