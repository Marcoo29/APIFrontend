import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserByEmail, updateUser } from "../../redux/userSlice";

const useUserPanel = () => {
  const dispatch = useDispatch();

  // authSlice → datos mínimos
  const { id: authId, email: authEmail, token: authToken } = useSelector(
    (state) => state.auth
  );

  // userSlice → datos completos
  const { user, loading, error } = useSelector((state) => state.user);

  // states del form
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [address, setAddress] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // cargar datos del user completo
  useEffect(() => {
    if (authEmail && authToken) {
      dispatch(fetchUserByEmail({ email: authEmail, token: authToken }));
    }
  }, [authEmail, authToken, dispatch]);

  // sincronizar inputs
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setLastname(user.lastname || "");
      setAddress(user.address || "");
    }
  }, [user]);

  const handleSave = () => {
    dispatch(
      updateUser({
        userId: authId,
        payload: { name, lastname, address },
        token: authToken,
      })
    )
      .unwrap()
      .then(() => {
        setSuccessMsg("Datos actualizados correctamente");
        setTimeout(() => setSuccessMsg(""), 3000);
      });
  };

  return {
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
  };
};

export default useUserPanel;
