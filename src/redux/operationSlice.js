import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const URL_OP = "http://localhost:4002/operations";
const URL_OPDETAIL = "http://localhost:4002/operationDetail";

export const fetchOperations = createAsyncThunk(
  "operations/fetchOperations",
  async (token) => {
    const { data } = await axios.get(URL_OP, {
      headers: { Authorization: `Bearer ${token}` }, // <-- header agregado
    });
    return data.content || [];
  }
);

export const fetchOperationDetail = createAsyncThunk(
  "operations/fetchOperationDetail",
  async ({ opId, token }) => {
    const { data } = await axios.get(`${URL_OPDETAIL}/${opId}/details`, {
      headers: { Authorization: `Bearer ${token}` }, // <-- header agregado
    });
    return { opId, items: data };
  }
);

export const fetchOperationsByEmail = createAsyncThunk(
  "operations/fetchOperationsByEmail",
  async ({ email, token }, thunkAPI) => {
    try {
      const { data } = await axios.get(`${URL_OP}/by-email/${email}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data.content; // viene paginado, content trae las ops
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const updateOperationStatus = createAsyncThunk(
  "operations/updateOperationStatus",
  async ({ id, newStatus, token }) => {
    const { data } = await axios.put(
      `${URL_OP}/${id}/update-status?newStatus=${newStatus}`,
      {}, // no body necesario
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data; // devuelve la operación actualizada
  }
);

const operationSlice = createSlice({
  name: "operations",
  initialState: {
    items: [],
    loading: false,
    error: null, //en principio se supone que sale todo bien
    itemsId: {},
    itemsFilter: {},
  },
  reducers: {
    openDetail: (state, action) => {
      const opId = action.payload;
      if (!state.itemsId[opId]) state.itemsId[opId] = {};
      state.itemsId[opId].open = true;
    },
    closeDetail: (state, action) => {
      const opId = action.payload;
      if (!state.itemsId[opId]) state.itemsId[opId] = {};
      state.itemsId[opId].open = false;
    },
  },
  extraReducers: (builder) => {
    //acá se le pega al backend
    builder
      .addCase(fetchOperations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOperations.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchOperations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchOperationDetail.pending, (state, action) => {
        state.itemsId[action.meta.arg.opId] = {
          loading: true,
          open: true,
          items: [],
          error: "",
        };
      })
      .addCase(fetchOperationDetail.fulfilled, (state, action) => {
        state.itemsId[action.payload.opId] = {
          loading: false,
          open: true,
          items: action.payload.items,
          error: "",
        };
      })
      .addCase(fetchOperationDetail.rejected, (state, action) => {
        state.itemsId[action.meta.arg.opId] = {
          loading: false,
          open: true,
          items: [],
          error: action.error.message,
        };
      })
      .addCase(fetchOperationsByEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOperationsByEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.operations = action.payload;
      })
      .addCase(fetchOperationsByEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateOperationStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOperationStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(
          (op) => op.id === action.payload.id
        );
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(updateOperationStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { openDetail, closeDetail } = operationSlice.actions;
export default operationSlice.reducer; //exporto las funciones que modifican el estado
