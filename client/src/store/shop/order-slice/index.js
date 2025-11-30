import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const BASE_URL = process.env.BASE_URL || process.env.REACT_APP_BASE_URL || "http://44.192.84.103:5000";

const initialState = {
  approvalURL: null,
  isLoading: false,
  orderId: null,
  orderList: [],
  orderDetails: null,
};

export const createOrder = createAsyncThunk("/order/create", async (orderData) => {
  const response = await axios.post(`${BASE_URL}/api/shop/order/create`, orderData);
  return response.data;
});

export const captureOrder = createAsyncThunk("/order/capture", async ({ paymentId, payerId, orderId }) => {
  const response = await axios.post(`${BASE_URL}/api/shop/order/capture`, { paymentId, payerId, orderId });
  return response.data;
});

export const listOrders = createAsyncThunk("/order/list", async (userId) => {
  const response = await axios.get(`${BASE_URL}/api/shop/order/list/${userId}`);
  return response.data;
});

export const getOrderDetails = createAsyncThunk("/order/details", async (id) => {
  const response = await axios.get(`${BASE_URL}/api/shop/order/details/${id}`);
  return response.data;
});

const shoppingOrderSlice = createSlice({
  name: "shoppingOrderSlice",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.approvalURL = action.payload.approvalURL;
        state.orderId = action.payload.orderId;
        sessionStorage.setItem(
          "currentOrderId",
          JSON.stringify(action.payload.orderId)
        );
      })
      .addCase(createOrder.rejected, (state) => {
        state.isLoading = false;
        state.approvalURL = null;
        state.orderId = null;
      })
      .addCase(listOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(listOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(listOrders.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetails.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  },
});

export const { resetOrderDetails } = shoppingOrderSlice.actions;

export default shoppingOrderSlice.reducer;
