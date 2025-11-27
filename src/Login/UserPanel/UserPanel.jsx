import useUserPanel from "./useUserPanel";
import UserPanelForm from "./UserPanelForm";

const UserPanel = () => {
  const {
    loading,
    error,
    user,
    authEmail,
    name,
    lastname,
    address,
    successMsg,
    setName,
    setLastname,
    setAddress,
    handleSave,
  } = useUserPanel();

  const isAdmin = user?.role === "ADMIN";

  // Loading
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#F5F5F5]">
        <p className="text-gray-700 text-lg">Cargando datos...</p>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#F5F5F5]">
        <p className="text-red-600 text-lg font-semibold">{error}</p>
      </div>
    );
  }

  // Sin datos
  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#F5F5F5]">
        <p className="text-gray-700 text-lg">No hay datos de usuario</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] w-full flex flex-col pt-24 px-4 md:px-10 pb-24 font-display">
      {/* pb-24 ➜ agrega espacio antes del footer */}

      <div className="max-w-5xl mx-auto w-full">

        {/* ======= HEADER PERFIL ======= */}
        <div className="flex flex-col items-center mb-8">
          {/* GAP REDUCIDO (antes era mb-10) */}

          <div className="w-28 h-28 rounded-full overflow-hidden shadow-md border border-gray-300">
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>

          <h1 className="text-3xl font-bold mt-3 text-gray-800">
            {name} {lastname}
          </h1>

          <p className="text-gray-500 mt-1">{authEmail}</p>

          {isAdmin && (
            <div className="mt-3 bg-yellow-100 text-yellow-700 px-4 py-2 rounded border border-yellow-300 text-sm">
              Los administradores no pueden modificar sus datos desde este panel.
            </div>
          )}
        </div>

        {/* ======= CONTENEDOR PRINCIPAL ======= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* gap-6 → antes 8, más compacto */}

          {/* ========= CARD 1: INFORMACIÓN PERSONAL ========= */}
          <div className="md:col-span-2 bg-white shadow-md rounded-lg p-5 border border-gray-200">
            {/* p-5 → antes p-6 */}

            <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
              {/* mb-3 → antes mb-4 */}
              <span className="material-symbols-outlined text-red-600">badge</span>
              Información Personal
            </h2>

            <UserPanelForm
              authEmail={authEmail}
              name={name}
              lastname={lastname}
              address={address}
              setName={setName}
              setLastname={setLastname}
              setAddress={setAddress}
              handleSave={handleSave}
              successMsg={successMsg}
              disabled={isAdmin}
            />
          </div>

          {/* ========= CARD 2: INFORMACIÓN DE CUENTA ========= */}
          <div className="bg-white shadow-md rounded-lg p-5 border border-gray-200 h-fit">
            {/* p-5 → antes p-6, h-fit evita que se estire */}

            <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-red-600">info</span>
              Información de la cuenta
            </h2>

            <div className="space-y-3 text-sm">
              {/* space-y-3 → antes 4, separaciones más chicas */}

              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Nro de Cliente:</span>
                <span className="font-semibold">{user.id}</span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Tipo de Cliente:</span>
                <span className="font-semibold">
                  {user.role === "ADMIN" ? "Admin" : "Comprador"}
                </span>
              </div>

              <div className="flex justify-between pb-2">
                <span className="text-gray-600">Email de acceso:</span>
                <span className="font-semibold">{authEmail}</span>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserPanel;
