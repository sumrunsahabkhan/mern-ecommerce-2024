import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = process.env.BASE_URL || process.env.REACT_APP_BASE_URL || "http://44.192.84.103:5000";

const initialState = {
  cartItems: [],
  isLoading: false,
};

export const addToCart = createAsyncThunk(
  "/cart/add",
  async ({ userId, productId, quantity }) => {
    const response = await axios.post(
      `${BASE_URL}/api/shop/cart/add`,
      {
        userId,
        productId,
        quantity,
      }
    );

    return response.data;
  }
);

export const getCart = createAsyncThunk(
  "/cart/get",
  async (userId) => {
    const response = await axios.get(
      `${BASE_URL}/api/shop/cart/get/${userId}`
    );

    return response.data;
  }
);

export const updateCart = createAsyncThunk(
  "/cart/update",
  async ({ userId, productId, quantity }) => {
    const response = await axios.put(
      `${BASE_URL}/api/shop/cart/update-cart`,
      {
        userId,
        productId,
        quantity,
      }
    );

    return response.data;
  }
);

export const removeFromCart = createAsyncThunk(
  "/cart/remove",
  async ({ userId, productId }) => {
    const response = await axios.delete(
      `${BASE_URL}/api/shop/cart/${userId}/${productId}`
    );

    return response.data;
  }
);

// add aliases expected by components
export { removeFromCart as deleteCartItem, updateCart as updateCartQuantity };

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(addToCart.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(getCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(getCart.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(updateCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(updateCart.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(removeFromCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(removeFromCart.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      });
  },
});

export default shoppingCartSlice.reducer;
