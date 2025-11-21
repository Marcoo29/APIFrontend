import { configureStore } from "@reduxjs/toolkit"; //dependencia para configurar la store
import categoryReducer from "./categorySlice.js";
import productReducer from "./productSlice.js";

export const store = configureStore({ //en este slice van todos los objetos
    reducer:{
        categories: categoryReducer,
        products: productReducer
    
    } //funciones que reciben el estado actual y las modifican en consecuencia. aca van todos los estados
})