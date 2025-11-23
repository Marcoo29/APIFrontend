import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "http://localhost:4002/users";

// Fetch user por email
export const fetchUserByEmail = createAsyncThunk(
  "users/fetchByEmail",
  async ({ email, token }) => {
    const { data } = await axios.get(`${URL}/by-email/${email}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data; // data completo del usuario
  }
);

// Update user
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ userId, payload, token }) => {
    const { data } = await axios.put(`${URL}/${userId}/update`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchUserByEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserByEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserByEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // UPDATE
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
