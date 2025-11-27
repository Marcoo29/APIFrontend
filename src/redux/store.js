import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import categoryReducer from "./categorySlice.js";
import productReducer from "./productSlice.js";
import userReducer from "./userSlice.js";
import operationReducer from "./operationSlice.js";
import authReducer from "./authSlice.js";
import cartReducer from "./cartSlice.js";

const rootReducer = combineReducers({
  categories: categoryReducer,
  products: productReducer,
  user: userReducer,
  operations: operationReducer,
  auth: authReducer,
  cart: cartReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "cart"], 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (gDM) =>
    gDM({
      serializableCheck: false,
    }),
});

// 5. Persistor
export const persistor = persistStore(store);