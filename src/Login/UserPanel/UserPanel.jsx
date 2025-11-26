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
    <div className="min-h-screen bg-[#F5F5F5] w-full flex flex-col">
      <div className="max-w-7xl mx-auto px-10 mt-14 py-5">

        <h2 className="text-center text-2xl font-bold text-[#333] border-b pb-3 mb-6">
          MIS DATOS
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
        />

      </div>
    </div>
  );
};

export default UserPanel;
