import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchProductById,
  fetchProductImage,
  fetchRelatedProducts,
} from "../../redux/productSlice";

import { addItem } from "../../redux/cartSlice";

import SearchBar from "./SearchBar";
import BreadcrumbNav from "./BreadcrumbNav";
import ProductMainInfo from "./ProductMainInfo";
import RelatedProducts from "./RelatedProducts";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { itemsId: product, related, loading } = useSelector(
    (state) => state.products
  );

  const userRole = useSelector((state) => state.auth.role);

  const [cantidad, setCantidad] = useState(1);
  const [mensaje, setMensaje] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const aumentar = () => setCantidad((n) => Math.min(n + 1, 99));
  const disminuir = () => setCantidad((n) => Math.max(n - 1, 1));

  useEffect(() => {
    dispatch(fetchProductById(id)).then((res) => {
      if (res.payload) {
        dispatch(fetchProductImage(id));
        dispatch(
          fetchRelatedProducts({
            category: res.payload.category?.description,
            currentId: res.payload.id,
          })
        );
      }
    });
  }, [id]);

  const agregarAlCarrito = () => {
    if (!product || userRole === "ADMIN") return;

    dispatch(
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        manufacturer: product.manufacturer,
        image: product.imageBase64 || null,
        qty: cantidad,
      })
    );

    setMensaje("Producto agregado al carrito");
    setTimeout(() => setMensaje(""), 2000);
  };

  if (loading || !product)
    return <p className="text-center mt-10">Cargando producto…</p>;

  return (
    <div className="min-h-screen flex flex-col bg-[#f6f6f6] font-display text-gray-900 relative">
      <main className="flex-grow container mx-auto px-4 lg:px-8 py-12 mt-10 max-w-6xl relative">

        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          navigate={navigate}
        />

        <BreadcrumbNav product={product} navigate={navigate} />

        <ProductMainInfo
          product={product}
          cantidad={cantidad}
          aumentar={aumentar}
          disminuir={disminuir}
          agregarAlCarrito={agregarAlCarrito}
          userRole={userRole}
          mensaje={mensaje}
        />

        <RelatedProducts related={related} navigate={navigate} />
      </main>
    </div>
  );
}
