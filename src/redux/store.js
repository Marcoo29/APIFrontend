import { configureStore } from "@reduxjs/toolkit"; //dependencia para configurar la store
import categoryReducer from "./categorySlice.js";
import productReducer from "./productSlice.js";
import userReducer from "./userSlice.js";
import operationReducer from "./operationSlice.js";

export const store = configureStore({ //en este slice van todos los objetos
    reducer:{
        categories: categoryReducer,
        products: productReducer,
        user: userReducer,
        operations: operationReducer
    
    } //funciones que reciben el estado actual y las modifican en consecuencia. aca van todos los estados
})