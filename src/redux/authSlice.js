import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_AUTH = "http://localhost:4002/api/v1/auth";
const API_USERS = "http://localhost:4002/users";

// Login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await fetch(`${API_AUTH}/authenticate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        return thunkAPI.rejectWithValue({
          message: "Correo o contraseña incorrecta",
          status: res.status,
        });
      }

      const data = await res.json();
      const token = data.access_token || data.token;

      if (!token) {
        return thunkAPI.rejectWithValue({
          message: "No se devolvió un token válido.",
          status: 500,
        });
      }

      // Obtener ID por email
      const idRes = await fetch(`${API_USERS}/by-email/${email}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!idRes.ok) {
        return thunkAPI.rejectWithValue({
          message: "No se pudo obtener el ID del usuario.",
          status: idRes.status,
        });
      }

      const userData = await idRes.json();

      return {
        id: userData.id,
        name: data.name,
        email: data.email,
        role: data.role,
        token,
      };
    } catch (err) {
      return thunkAPI.rejectWithValue({
        message: "Error de conexión con el servidor.",
        status: 500,
      });
    }
  }
);

// Register
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ name, lastname, username, email, password }, thunkAPI) => {
    try {
      const res = await fetch(`${API_AUTH}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          lastname,
          username,
          email,
          password,
          role: "USER",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        return thunkAPI.rejectWithValue({
          message: data.message || "Error al registrarse",
          status: res.status,
        });
      }

      return data;
    } catch (err) {
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
        state.error = action.payload; // { message, status }
      })

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
