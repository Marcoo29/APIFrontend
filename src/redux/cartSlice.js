import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // [{id, name, price, qty, image}]
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart(state, action) {
      state.items = action.payload || [];
      window.dispatchEvent(new Event("cartUpdated"));
    },

    addItem(state, action) {
      const incoming = action.payload;
      const existing = state.items.find((i) => i.id === incoming.id);

      if (existing) {
        existing.qty = (existing.qty || 1) + (incoming.qty || 1);
      } else {
        state.items.push({
          ...incoming,
          qty: incoming.qty || 1,
        });
      }

      window.dispatchEvent(new Event("cartUpdated"));
    },

    removeItem(state, action) {
      const id = action.payload;
      state.items = state.items.filter((i) => i.id !== id);
      window.dispatchEvent(new Event("cartUpdated"));
    },

    increaseQty(state, action) {
      const id = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) item.qty += 1;

      window.dispatchEvent(new Event("cartUpdated"));
    },

    decreaseQty(state, action) {
      const id = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) item.qty = Math.max(1, item.qty - 1);

      window.dispatchEvent(new Event("cartUpdated"));
    },

    clearCart(state) {
      state.items = [];
      window.dispatchEvent(new Event("cartUpdated"));
    },
  },
});

export const {
  setCart,
  addItem,
  removeItem,
  increaseQty,
  decreaseQty,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;