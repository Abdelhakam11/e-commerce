import { createSlice } from "@reduxjs/toolkit";

const favouriteSlice = createSlice({
  name: "favouriteProducts",
  initialState: {
    favouriteProducts: [],
  },
  reducers: {
    addProduct(state, action) {
      const filterProducts = state.favouriteProducts.filter(
        (productId) => productId !== action.payload
      );
      state.favouriteProducts = [...filterProducts, action.payload];
    },
    removeProduct(state, action) {
      state.favouriteProducts = state.favouriteProducts.filter(
        (productId) => productId !== action.payload
      );
    },
  },
});
export const { addProduct, removeProduct } = favouriteSlice.actions;
export default favouriteSlice.reducer;
