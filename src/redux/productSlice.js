import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const URL_PRODUCTS = "http://localhost:4002/products";
const URL_IMAGES = "http://localhost:4002/images";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const { data } = await axios.get(`${URL_PRODUCTS}/all`);
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
    categoryId,
    token,
  }) => {
    const { data } = await axios.put(
      `${URL_PRODUCTS}/${id}/update`,
      { name, price, manufacturer, stock, description, fitFor, productStatus, categoryId },
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
    const { data } = await axios.post(URL_PRODUCTS, product, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const productId = data.id;

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


export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id) => {
    const { data } = await axios.get(`${URL_PRODUCTS}/${id}`);
    return data;
  }
);

export const fetchProductImage = createAsyncThunk(
  "products/fetchProductImage",
  async (id) => {
    const { data } = await axios.get(`${URL_IMAGES}?id=${id}`);
    return { id, imageBase64: data.file || null };
  }
);

export const fetchRelatedProducts = createAsyncThunk(
  "products/fetchRelatedProducts",
  async ({ category, currentId }) => {
    const { data } = await axios.get(`${URL_PRODUCTS}?page=0&size=100`);
    const list = data.content || [];

    const filtered = list.filter(
      (p) =>
        p.category?.description === category &&
        p.id !== currentId
    );

    const withImages = await Promise.all(
      filtered.slice(0, 8).map(async (p) => {
        try {
          const r = await axios.get(`${URL_IMAGES}?id=${p.id}`);
          return { ...p, imageBase64: r.data?.file || null };
        } catch {
          return { ...p, imageBase64: null };
        }
      })
    );

    return withImages;
  }
);

export const setProductDiscount = createAsyncThunk(
  "products/setProductDiscount",
  async ({ id, discountPrice }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;

      const { data } = await axios.put(
        `${URL_PRODUCTS}/${id}/discount?discountPrice=${discountPrice}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const removeProductDiscount = createAsyncThunk(
  "products/removeProductDiscount",
  async ({ id }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;

      const { data } = await axios.put(
        `${URL_PRODUCTS}/${id}/discount?discount=0`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
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

    related: [],
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
      })

      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.itemsId = null;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.itemsId = action.payload; 
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchProductImage.fulfilled, (state, action) => {
        const { id, imageBase64 } = action.payload;

        if (state.itemsId && (state.itemsId.id === id || state.itemsId.id == id)) {
          state.itemsId.imageBase64 = imageBase64;
        }
        const idx = state.items.findIndex((p) => p.id === id);
        if (idx !== -1) state.items[idx].imageBase64 = imageBase64;
      })

      .addCase(fetchRelatedProducts.fulfilled, (state, action) => {
        state.related = action.payload;
      });

  },
});

export default productSlice.reducer;
