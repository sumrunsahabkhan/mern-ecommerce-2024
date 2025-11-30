import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const BASE_URL = process.env.BASE_URL || process.env.REACT_APP_BASE_URL || "http://44.192.84.103:5000";

const initialState = {
  isLoading: false,
  productList: [],
};

export const addNewProduct = createAsyncThunk(
  "/products/addnewproduct",
  async (formData) => {
    const result = await axios.post(`${BASE_URL}/api/admin/products/add`, formData);
    return result.data;
  }
);

export const fetchAllProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async () => {
    const result = await axios.get(`${BASE_URL}/api/admin/products/get`);
    return result.data;
  }
);

export const editProduct = createAsyncThunk(
  "/products/editProduct",
  async ({ id, formData }) => {
    const result = await axios.put(`${BASE_URL}/api/admin/products/edit/${id}`, formData);
    return result.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "/products/deleteProduct",
  async (id) => {
    const result = await axios.delete(`${BASE_URL}/api/admin/products/delete/${id}`);
    return result.data;
  }
);

const AdminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export default AdminProductsSlice.reducer;
