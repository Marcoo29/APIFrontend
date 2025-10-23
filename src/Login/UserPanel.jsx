import { useEffect, useState } from "react";

const UserPanel = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(null);

  const storedUser = localStorage.getItem("user");
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;
  const email = parsedUser?.email || null;
  const token = parsedUser?.token || null;

  // Campos editables
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      if (!email || !token) {
        setError("No se encontró email o token en localStorage");
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(
          `http://localhost:4002/users/by-email/${encodeURIComponent(email)}`,
          {
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!res.ok) {
          throw new Error(`Error al obtener usuario: ${res.status}`);
        }
        const data = await res.json();
        setUser(data);
        setName(data.name || "");
        setLastname(data.lastname || "");
        setAddress(data.address || "");
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar la información del usuario");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [email, token]);

  const handleSave = async () => {
    if (!user?.id) return;
    setSaving(true);
    setSuccess(null);
    try {
      const res = await fetch(
        `http://localhost:4002/users/${user.id}/update`,
        {
          method: "PUT",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, lastname, address }),
        }
      );
      if (!res.ok) throw new Error(`Error al actualizar usuario: ${res.status}`);
      const updatedUser = await res.json();
      setUser(updatedUser);

      // 🔹 Actualizar localStorage para que Navbar vea el cambio al refrescar
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...parsedUser,
          name: updatedUser.name,
          lastname: updatedUser.lastname,
          address: updatedUser.address,
        })
      );

      setSuccess("Datos actualizados correctamente ✅");
    } catch (err) {
      console.error(err);
      setError("No se pudo actualizar la información del usuario");
    } finally {
      setSaving(false);
    }
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
        <p className="text-[#D32F2F] text-lg font-semibold">{error}</p>
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

        <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-left">
          {/* Username no editable */}
          <div className="mb-4">
            <label className="font-semibold block mb-1">Email:</label>
            <p className="text-gray-700">{user.email}</p>
          </div>

          {/* Nombre editable */}
          <div className="mb-4">
            <label className="font-semibold block mb-1">Nombre:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Apellido editable */}
          <div className="mb-4">
            <label className="font-semibold block mb-1">Apellido:</label>
            <input
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Dirección editable */}
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

          {/* Botón de guardar */}
          <div className="mt-6 text-center">
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded shadow transition"
            >
              {saving ? "Guardando..." : "Guardar cambios"}
            </button>
            {success && <p className="mt-3 text-green-600">{success}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPanel;
