import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, createProduct, updateProduct } from "../../../redux/productSlice";

export function useProducts(user) {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(state => state.products);

  const [editingId, setEditingId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});

  useEffect(() => {
    if (!user) return;
    dispatch(fetchProducts());
  }, [user, dispatch]);

  const addProduct = (productData, image) => {
    dispatch(createProduct({ product: productData, image, token: user.token }));
  };

  const editProduct = (id, updatedData) => {
    dispatch(updateProduct({ ...updatedData, id, token: user.token }));
    setEditingId(null);
  };

  return {
    products: items,
    loadingProducts: loading,
    errorProducts: error,
    editingId,
    editedProduct,
    setEditedProduct,
    setEditingId,
    addProduct,
    editProduct,
  };
}