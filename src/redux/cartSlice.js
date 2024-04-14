import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cartProducts",
  initialState: {
    cartProducts: [],
  },
  reducers: {
    addProductToCart(state, action) {
      if (action.payload !== undefined) {
        if (state.cartProducts.length === 0) {
          state.cartProducts = [
            ...state.cartProducts,
            { productId: action.payload, amount: 1 },
          ];
        } else {
          const existedProduct = state.cartProducts.find(
            ({ productId }) => productId === action.payload
          );
          if (existedProduct === undefined) {
            state.cartProducts = [
              ...state.cartProducts,
              { productId: action.payload, amount: 1 },
            ];
          } else {
            existedProduct.amount++;
            state.cartProducts = [...state.cartProducts];
          }
        }
      }
    },
    removeProductFromCart(state, action) {
      state.cartProducts = state.cartProducts.filter(
        (productId) => productId !== action.payload
      );
    },
  },
});
export const { addProductToCart, removeProductFromCart } = cartSlice.actions;
export default cartSlice.reducer;
