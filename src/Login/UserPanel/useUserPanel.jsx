import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserByEmail, updateUser } from "../../redux/userSlice";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const useUserPanel = () => {
  const dispatch = useDispatch();

  const { id: authId, email: authEmail, token: authToken } = useSelector(
    (state) => state.auth
  );

  const { user, loading, error } = useSelector((state) => state.user);

  // 🔥 Crear toast 100% seguro — una sola vez
  const toast = useRef(
    Swal.mixin({
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      background: "#333",
      color: "#fff",
      iconColor: "#4ade80",
      allowEnterKey: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      showClass: { popup: "swal2-noanimation" },
      hideClass: { popup: "swal2-noanimation" },
      didOpen: (el) => {
        el.addEventListener("mouseenter", Swal.stopTimer);
        el.addEventListener("mouseleave", Swal.resumeTimer);
      },
      
      willClose: () => {
        Swal.close();
      }
    })
  );

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
        toast.current.fire({
          icon: "success",
          title: "Datos actualizados correctamente",
        });
      })
      .catch(() => {
        toast.current.fire({
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
