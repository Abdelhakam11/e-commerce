import { configureStore } from "@reduxjs/toolkit";
import favouriteReducer from "./favouriteSlice.js";
import cartReducer from "./cartSlice.js";

export const myStore = configureStore({
  reducer: {
    favouriteReducer,
    cartReducer,
  },
});
