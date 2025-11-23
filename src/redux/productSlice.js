import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const URL_PRODUCTS = "http://localhost:4002/products";
const URL_IMAGES = "http://localhost:4002/images";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const { data } = await axios.get(`${URL_PRODUCTS}/all`); //petición asíncrona, espera respuesta de la API
    return data;
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({
    id,
    name,
    price,
    manufacturer,
    stock,
    description,
    fitFor,
    productStatus,
    token,
  }) => {
    const { data } = await axios.put(
      `${URL_PRODUCTS}/${id}/update`,
      { name, price, manufacturer, stock, description, fitFor, productStatus },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  }
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async ({ product, image, token }) => {
    //crear producto
    const { data } = await axios.post(URL_PRODUCTS, product, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const productId = data.id;

    // 2) Subir la imagen
    const fd = new FormData();
    fd.append("productId", productId);
    fd.append("name", product.name);
    fd.append("file", image);

    await axios.post(`${URL_IMAGES}`, fd, {
      headers: { Authorization: `Bearer ${token}` },
      "Content-Type": "multipart/form-data",
    });

    return data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null, //en principio se supone que sale todo bien
    itemsId: {},
    itemsFilter: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    //acá se le pega al backend
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        console.log("PAYLOAD UPDATE:", action.payload);
        state.loading = false;
        const index = state.items.findIndex(
          (product) => product.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer; //exporto las funciones que modifican el estado
