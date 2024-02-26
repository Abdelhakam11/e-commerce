import { configureStore } from "@reduxjs/toolkit";
import favouriteReducer from './favouriteSlice.js';

export const myStore=configureStore({
    reducer:{
        favouriteReducer
    }
})