import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const BASE_URL = process.env.BASE_URL || process.env.REACT_APP_BASE_URL || "http://44.192.84.103:5000";

const initialState = {
  isLoading: false,
  searchResults: [],
};

export const searchProducts = createAsyncThunk(
  "/shop/search",
  async (keyword) => {
    const response = await axios.get(`${BASE_URL}/api/shop/search/${keyword}`);
    return response.data;
  }
);

const searchSlice = createSlice({
  name: "searchSlice",
  initialState,
  reducers: {
    resetSearchResults: (state) => {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResults = action.payload.data;
      })
      .addCase(searchProducts.rejected, (state) => {
        state.isLoading = false;
        state.searchResults = [];
      });
  },
});

export const { resetSearchResults } = searchSlice.actions;

export default searchSlice.reducer;
