const UserPanelForm = ({
  authEmail,
  name,
  lastname,
  address,
  setName,
  setLastname,
  setAddress,
  handleSave,
  successMsg,
  disabled   // ⬅ VIENE DESDE UserPanel
}) => {
  // Clase para inputs bloqueados (gris + no clickable)
  const disabledClass = disabled ? "bg-gray-100 cursor-not-allowed text-gray-500" : "";

  return (
    <div className="w-full">

      <div className="grid grid-cols-1 gap-4">
        
        {/* Nombre */}
        <div>
          <label className="font-semibold mb-1 block">Nombre:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={disabled}
            className={`w-full border px-3 py-2 rounded ${disabledClass}`}
          />
        </div>

        {/* Apellido */}
        <div>
          <label className="font-semibold mb-1 block">Apellido:</label>
          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            disabled={disabled}
            className={`w-full border px-3 py-2 rounded ${disabledClass}`}
          />
        </div>

        {/* Dirección */}
        <div>
          <label className="font-semibold mb-1 block">Dirección fiscal:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            disabled={disabled}
            className={`w-full border px-3 py-2 rounded ${disabledClass}`}
            placeholder="Agregar dirección"
          />
        </div>

        {/* Tipo persona */}
        <div>
          <label className="font-semibold mb-1 block">Tipo de persona:</label>
          <select
            disabled={disabled}
            className={`w-full border px-3 py-2 rounded ${disabledClass}`}
          >
            <option>Física</option>
            <option>Jurídica</option>
          </select>
        </div>

        {/* IVA */}
        <div>
          <label className="font-semibold mb-1 block">Condición de IVA:</label>
          <select
            disabled={disabled}
            className={`w-full border px-3 py-2 rounded ${disabledClass}`}
          >
            <option>Seleccionar</option>
            <option>Responsable Inscripto</option>
            <option>Monotributo</option>
            <option>Exento</option>
            <option>Consumidor Final</option>
          </select>
        </div>

        {/* Tipo Documento */}
        <div>
          <label className="font-semibold mb-1 block">Tipo Documento:</label>
          <select
            disabled={disabled}
            className={`w-full border px-3 py-2 rounded ${disabledClass}`}
          >
            <option>DNI</option>
            <option>CUIT</option>
          </select>
        </div>

        {/* Número documento */}
        <div>
          <label className="font-semibold mb-1 block">N° Documento:</label>
          <input
            disabled={disabled}
            className={`w-full border px-3 py-2 rounded ${disabledClass}`}
            placeholder="Ingrese número"
          />
        </div>

        {/* Localidad */}
        <div>
          <label className="font-semibold mb-1 block">Localidad:</label>
          <input
            disabled={disabled}
            className={`w-full border px-3 py-2 rounded ${disabledClass}`}
            placeholder="Ej: CABA"
          />
        </div>

        {/* Domicilio */}
        <div>
          <label className="font-semibold mb-1 block">Domicilio:</label>
          <input
            disabled={disabled}
            className={`w-full border px-3 py-2 rounded ${disabledClass}`}
            placeholder="Domicilio de entrega de tus pedidos"
          />
        </div>

        {/* Whatsapp */}
        <div>
          <label className="font-semibold mb-1 block">Whatsapp:</label>
          <input
            disabled={disabled}
            className={`w-full border px-3 py-2 rounded ${disabledClass}`}
            placeholder="Numero de contacto"
          />
        </div>

        {/* Transporte */}
        <div>
          <label className="font-semibold mb-1 block">Transporte de preferencia:</label>
          <input
            disabled={disabled}
            className={`w-full border px-3 py-2 rounded ${disabledClass}`}
            placeholder="Nombre del transporte"
          />
        </div>

        {/* Observaciones */}
        <div>
          <label className="font-semibold mb-1 block">Observaciones:</label>
          <textarea
            disabled={disabled}
            className={`w-full border px-3 py-2 rounded ${disabledClass}`}
            rows="3"
            placeholder="Comentarios generales"
          />
        </div>

      </div>

      {successMsg && (
        <div className="bg-green-100 text-green-700 border border-green-300 py-2 px-3 mt-4 rounded">
          {successMsg}
        </div>
      )}

      <div className="text-center mt-6">
        <button
          type="button"
          onClick={(e) => handleSave(e)}
          disabled={disabled}
          className={`px-6 py-2 font-semibold rounded shadow transition
            ${
              disabled
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-red-500 text-white hover:bg-red-600"
            }`}
        >
          Guardar cambios
        </button>
      </div>

    </div>
  );
};

export default UserPanelForm;