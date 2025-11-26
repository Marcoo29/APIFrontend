const UserPanelForm = ({
  authEmail,
  name,
  lastname,
  address,
  setName,
  setLastname,
  setAddress,
  handleSave,
  successMsg
}) => {
  return (
    <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-lg p-8 border">

      {/* EMAIL */}
      <div className="mb-4">
        <label className="font-semibold block mb-1">Email:</label>
        <p className="text-gray-700">{authEmail}</p>
      </div>

      {/* NOMBRE */}
      <div className="mb-4">
        <label className="font-semibold block mb-1">Nombre:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      {/* APELLIDO */}
      <div className="mb-4">
        <label className="font-semibold block mb-1">Apellido:</label>
        <input
          type="text"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      {/* DIRECCIÓN */}
      <div className="mb-4">
        <label className="font-semibold block mb-1">Dirección:</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          placeholder="Agregar dirección"
        />
      </div>

      {/* FEEDBACK */}
      {successMsg && (
        <div className="bg-green-100 text-green-700 border border-green-300 py-2 px-3 mb-4 rounded">
          {successMsg}
        </div>
      )}

      {/* BOTÓN */}
      <div className="text-center mt-6">
        <button
          onClick={handleSave}
          className="bg-red-500 text-white px-6 py-2 font-semibold rounded shadow hover:bg-red-600 transition"
        >
          Guardar cambios
        </button>
      </div>

    </div>
  );
};

export default UserPanelForm;
