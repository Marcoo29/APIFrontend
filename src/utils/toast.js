import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export const toast = Swal.mixin({
  toast: true,
  position: "bottom-end",
  showConfirmButton: false,
  timer: 2500,
  timerProgressBar: true,
  background: "#333",
  color: "#fff",
  iconColor: "#4ade80",
  showClass: { popup: "swal2-noanimation" },
  hideClass: { popup: "swal2-noanimation" },
});
