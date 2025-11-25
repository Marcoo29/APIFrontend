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

export const fetchProductsFiltered = createAsyncThunk(
  "products/fetchProductsFiltered",
  async ({ page, size, sort, searchTerm, categoryId }) => {
    let url;

    if (categoryId) {
      url = `${URL_PRODUCTS}/by-category/${categoryId}?page=${page}&size=${size}&sort=${sort}&searchTerm=${encodeURIComponent(
        searchTerm || ""
      )}`;
    } else {
      url = `${URL_PRODUCTS}?page=${page}&size=${size}&sort=${sort}&searchTerm=${encodeURIComponent(
        searchTerm || ""
      )}`;
    }

    const { data } = await axios.get(url);
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
    // 1) Crear producto
    const { data } = await axios.post(URL_PRODUCTS, product, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const productId = data.id;

    // 2) Subir imagen si existe
    if (image) {
      const fd = new FormData();
      fd.append("productId", productId);
      fd.append("name", product.name);
      fd.append("file", image);

      await axios.post(`${URL_IMAGES}`, fd, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null,
    itemsId: {},
    itemsFilter: {},
    totalItems: 0,
    totalPages: 1,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchProductsFiltered.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsFiltered.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.content || [];
        state.totalItems = action.payload.totalElements || 0;
        state.totalPages = action.payload.totalPages || 1;
      })
      .addCase(fetchProductsFiltered.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(
          (product) => product.id === action.payload.id
        );
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action) => {
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
      });
  },
});

export default productSlice.reducer;
