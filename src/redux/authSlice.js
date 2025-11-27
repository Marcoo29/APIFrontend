import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_AUTH = "http://localhost:4002/api/v1/auth";
const API_USERS = "http://localhost:4002/users";

// ------------------------------------
// LOGIN USER (AXIOS VERSION)
// ------------------------------------
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
      // 1️⃣ Login
      const res = await axios.post(`${API_AUTH}/authenticate`, {
        email,
        password,
      });

      const data = res.data;
      const token = data.access_token || data.token;

      if (!token) {
        return thunkAPI.rejectWithValue({
          message: "No se devolvió un token válido.",
          status: 500,
        });
      }

      // 2️⃣ Obtener ID por email
      const idRes = await axios.get(`${API_USERS}/by-email/${email}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const userData = idRes.data;

      return {
        id: userData.id,
        name: data.name,
        email: data.email,
        role: data.role,
        token,
      };

    } catch (err) {
      // Error HTTP del backend
      if (err.response) {
        const status = err.response.status;
        let errorMessage =
          err.response.data?.message || "Error al iniciar sesión";

        // Caso específico: error de auth
        if (status === 401 || status === 403) {
          errorMessage = "Correo o contraseña incorrecta";
        }

        return thunkAPI.rejectWithValue({
          message: errorMessage,
          status,
        });
      }

      // Error de red
      return thunkAPI.rejectWithValue({
        message: "Error de conexión con el servidor.",
        status: 500,
      });
    }
  }
);

// ------------------------------------
// REGISTER USER (AXIOS VERSION)
// ------------------------------------
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ name, lastname, username, email, password }, thunkAPI) => {
    try {
      const res = await axios.post(`${API_AUTH}/register`, {
        name,
        lastname,
        username,
        email,
        password,
        role: "USER",
      });

      return res.data;

    } catch (err) {
      if (err.response) {
        return thunkAPI.rejectWithValue({
          message: err.response.data?.message || "Error al registrarse",
          status: err.response.status,
        });
      }

      return thunkAPI.rejectWithValue({
        message: "Error de conexión",
        status: 500,
      });
    }
  }
);

const initialState = {
  id: null,
  name: null,
  email: null,
  role: null,
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.token = action.payload.token;
      state.loading = false;
      state.error = null;
    },

    logout(state) {
      return initialState;
    },
  },

  extraReducers: (builder) => {
    builder
      // LOGIN -----------------
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        Object.assign(state, action.payload);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // REGISTER --------------
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, loginSuccess } = authSlice.actions;
export default authSlice.reducer;