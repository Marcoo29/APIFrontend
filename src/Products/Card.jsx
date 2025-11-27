import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import { addItem } from "../redux/cartSlice";

const Card = ({ id, title, price, manufacturer, layoutView = "grid" }) => {
  const [cantidad, setCantidad] = useState(1);
  const [image, setImage] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userRole = useSelector((state) => state.auth.role);

  
  useEffect(() => {
    fetch(`http://localhost:4002/images?id=${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar la imagen");
        return res.json();
      })
      .then((data) => {
        if (data?.file) {
          setImage(`data:image/jpeg;base64,${data.file}`);
        } else {
          setImage(null);
        }
      })
      .catch(() => setImage(null));
  }, [id]);


  const aumentar = (e) => {
    e.stopPropagation();
    setCantidad((prev) => Math.min(prev + 1, 99));
  };

  const disminuir = (e) => {
    e.stopPropagation();
    setCantidad((prev) => Math.max(prev - 1, 1));
  };

  const formattedPrice =
    typeof price === "number"
      ? price.toLocaleString("es-AR")
      : price?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  
  const agregarAlCarrito = (e) => {
    e.stopPropagation();
    if (userRole === "ADMIN") return;

    dispatch(
      addItem({
        id,
        name: title,
        price,
        manufacturer,
        image,
        qty: cantidad,
      })
    );

    // Toast
    Swal.fire({
      toast: true,
      position: "bottom-end",
      icon: "success",
      title: "Producto agregado al carrito",
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true,
      background: "#333",
      color: "#fff",
      iconColor: "#4ade80",
    });
  };

  const abrirDetalle = () => navigate(`/products/${id}`);

 
  if (layoutView === "list") {
    return (
      <div
        className="w-full flex bg-white border border-gray-300 rounded-none shadow-sm hover:shadow-md hover:border-red-600 transition-all duration-200 cursor-pointer"
        onClick={abrirDetalle}
      >
        <div className="w-40 h-40 flex justify-center items-center bg-gray-50 border-r border-gray-200">
          <img
            src={image || "https://via.placeholder.com/150?text=Producto"}
            alt={title}
            className="h-full w-full object-contain p-2"
          />
        </div>

        <div className="flex flex-col justify-between flex-1 p-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              {title}
            </h2>

            <p className="text-xs uppercase text-red-600 font-semibold">
              {manufacturer || "Sin fabricante"}
            </p>

            <span className="text-xl font-bold text-gray-900 mt-2 block">
              ${formattedPrice ?? "0"}
            </span>
          </div>

          <div
            className="flex gap-3 items-center mt-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center border border-gray-300 px-2 py-1 text-sm text-gray-800">
              <button onClick={disminuir} className="px-1 text-gray-500 hover:text-red-600">
                –
              </button>

              <input
                type="number"
                value={cantidad}
                readOnly
                className="w-6 text-center bg-transparent"
              />

              <button onClick={aumentar} className="px-1 text-gray-500 hover:text-red-600">
                +
              </button>
            </div>

            <button
              onClick={agregarAlCarrito}
              disabled={userRole === "ADMIN"}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold transition-colors duration-300 ${
                userRole === "ADMIN"
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-red-600 text-white hover:bg-red-700"
              }`}
            >
              Agregar
              <span className="material-symbols-outlined text-sm">add_shopping_cart</span>
            </button>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div
      className="w-full max-w-sm bg-white border border-gray-300 rounded-none shadow-sm hover:shadow-md hover:border-red-600 hover:shadow-red-200 transition-all duration-200 font-display cursor-pointer"
      onClick={abrirDetalle}
    >
      <div className="bg-gray-50 flex justify-center items-center border-b border-gray-200 aspect-square">
        <img
          src={image || "https://via.placeholder.com/300x220?text=Producto"}
          alt={title}
          className="w-full h-full object-contain"
          loading="lazy"
        />
      </div>

      <div className="px-5 py-4 flex flex-col items-center">
        <h5
          className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2 text-center hover:text-red-600 transition-colors duration-200 min-h-[48px]"
          title={title}
        >
          {title}
        </h5>

        <p className="text-xs uppercase text-red-600 font-semibold mb-2">
          {manufacturer}
        </p>

        <span className="text-2xl font-bold text-gray-900 mb-3">
          ${formattedPrice}
        </span>

        <div
          className="flex items-center justify-center gap-3 w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center border border-gray-300 px-2 py-1 text-sm text-gray-800">
            <button className="px-1 text-gray-500 hover:text-red-600" onClick={disminuir}>
              –
            </button>

            <input
              type="number"
              value={cantidad}
              readOnly
              className="w-6 text-center bg-transparent"
            />

            <button className="px-1 text-gray-500 hover:text-red-600" onClick={aumentar}>
              +
            </button>
          </div>

          <button
            onClick={agregarAlCarrito}
            disabled={userRole === "ADMIN"}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold transition-colors duration-300 ${
              userRole === "ADMIN"
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-red-600 text-white hover:bg-red-700"
            }`}
          >
            Agregar
            <span className="material-symbols-outlined text-sm">add_shopping_cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
