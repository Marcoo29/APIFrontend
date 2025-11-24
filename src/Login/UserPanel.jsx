import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserByEmail, updateUser } from "../redux/userSlice";

const UserPanel = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user);

  const [successMsg, setSuccessMsg] = useState("");

  const storedUser = localStorage.getItem("user");
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;
  const email = parsedUser?.email || null;
  const token = parsedUser?.token || null;

  // Estados locales para el formulario
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (email && token) {
      dispatch(fetchUserByEmail({ email, token }));
    }
  }, [email, token, dispatch]);

  // Cuando cambia el usuario en Redux, actualizamos los estados locales
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setLastname(user.lastname || "");
      setAddress(user.address || "");
    }
  }, [user]);

  const handleSave = () => {
    if (!user) return;
    const payload = {
      name,
      lastname,
      address,
    };
    dispatch(updateUser({ userId: user.id, payload, token }))
      .unwrap()
      .then(() => {
        setSuccessMsg("Datos actualizados correctamente");
        setTimeout(() => setSuccessMsg(""), 3000);
      })
      .catch(() => {});
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#F5F5F5]">
        <p className="text-gray-700 text-lg">Cargando datos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#F5F5F5]">
        <p className="text-red-600 text-lg font-semibold">{error}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#F5F5F5]">
        <p className="text-gray-700 text-lg">No hay datos de usuario</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#F5F5F5] flex flex-col">
      <div className="w-full max-w-7xl mx-auto text-center px-10 mt-14 py-5">
        <h2 className="text-2xl font-bold text-[#333] border-b border-[#ddd] pb-3 mb-6">
          MIS DATOS
        </h2>
        
        {successMsg && (
          <div className="max-w-lg mx-auto mb-5 bg-green-100 border border-green-300 text-green-700 py-3 px-4 rounded-lg">
            {successMsg}
          </div>
        )}

        <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-left">
          <div className="mb-4">
            <label className="font-semibold block mb-1">Email:</label>
            <p className="text-gray-700">{user.email}</p>
          </div>

          <div className="mb-4">
            <label className="font-semibold block mb-1">Nombre:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mb-4">
            <label className="font-semibold block mb-1">Apellido:</label>
            <input
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mb-4">
            <label className="font-semibold block mb-1">Dirección:</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Agregar dirección"
            />
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={handleSave}
              disabled={loading}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded shadow transition"
            >
              {loading ? "Guardando..." : "Guardar cambios"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPanel;
