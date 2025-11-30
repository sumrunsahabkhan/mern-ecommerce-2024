import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Base backend URL
const BASE_URL =
  process.env.BASE_URL ||
  process.env.REACT_APP_BASE_URL ||
  "http://44.192.84.103:5000"; // fallback

axios.defaults.withCredentials = true; // important for cookies/session

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
};

/* ===========================================================
    AUTH REQUESTS (Thunks)
=========================================================== */

export const registerUser = createAsyncThunk(
  "auth/register",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/auth/register`,
        formData
      );
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/auth/login`,
        formData
      );
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/logout`);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err);
    }
  }
);

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/auth/check-auth`);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err);
    }
  }
);

/* ===========================================================
    SLICE
=========================================================== */

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
  },

  extraReducers: (builder) => {
    builder

      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })

      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })

      // CHECK AUTH
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })

      // LOGOUT
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
