import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserByEmail, updateUser } from "../../redux/userSlice";
import { toast } from "../../utils/toast"; // ← IMPORTANTE

const useUserPanel = () => {
  const dispatch = useDispatch();

  const { id: authId, email: authEmail, token: authToken } = useSelector(
    (state) => state.auth
  );

  const { user, loading, error } = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (authEmail && authToken) {
      dispatch(fetchUserByEmail({ email: authEmail, token: authToken }));
    }
  }, [authEmail, authToken, dispatch]);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setLastname(user.lastname || "");
      setAddress(user.address || "");
    }
  }, [user]);

  const handleSave = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    dispatch(
      updateUser({
        userId: authId,
        payload: { name, lastname, address },
        token: authToken,
      })
    )
      .unwrap()
      .then(() => {
        toast.fire({
          icon: "success",
          title: "Actualizado correctamente",
        });
      })
      .catch(() => {
        toast.fire({
          icon: "error",
          title: "No se pudieron guardar los datos",
        });
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
    setName,
    setLastname,
    setAddress,
    handleSave,
  };
};

export default useUserPanel;
