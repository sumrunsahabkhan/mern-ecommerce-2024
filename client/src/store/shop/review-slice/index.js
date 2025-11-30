import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const BASE_URL = process.env.BASE_URL || process.env.REACT_APP_BASE_URL || "http://44.192.84.103:5000";

const initialState = {
  isLoading: false,
  reviews: [],
};

export const addReview = createAsyncThunk("/review/add", async (formdata) => {
  const response = await axios.post(`${BASE_URL}/api/shop/review/add`, formdata);
  return response.data;
});

export const getReviews = createAsyncThunk("/order/getReviews", async (id) => {
  const response = await axios.get(`${BASE_URL}/api/shop/review/${id}`);
  return response.data;
});

const reviewSlice = createSlice({
  name: "reviewSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload.data;
      })
      .addCase(getReviews.rejected, (state) => {
        state.isLoading = false;
        state.reviews = [];
      });
  },
});

export default reviewSlice.reducer;
