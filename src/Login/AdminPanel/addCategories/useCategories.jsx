import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {fetchCategories, createCategory, updateCategory} from "../../../redux/categorySlice";

export function useCategories(user) {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(state => state.categories);

  const [editingId, setEditingId] = useState(null);
  const [editedName, setEditedName] = useState("");

  useEffect(() => {
    if (!user) return;
    dispatch(fetchCategories());
  }, [user, dispatch]);

  

  const addCategory = async (name) => {
    if (!name.trim()) return;
    dispatch(createCategory({ name, token: user.token }));
  };

  const editCategory = async (id) => {
    if (!editedName.trim()) return;
    dispatch(updateCategory({ id, description: editedName, token: user.token }));
    setEditingId(null);
  };

  return {
    categories: items,
    loadingCategory: loading,
    error,
    editingId,
    editedName,
    setEditedName,
    setEditingId,
    addCategory,
    editCategory
  };
}
