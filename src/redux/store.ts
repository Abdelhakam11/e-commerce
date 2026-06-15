import { configureStore } from '@reduxjs/toolkit';
import favouriteReducer from './favouriteSlice';
import cartReducer from './cartSlice';

export const myStore = configureStore({
  reducer: {
    favouriteReducer,
    cartReducer,
  },
});

export type RootState = ReturnType<typeof myStore.getState>;
export type AppDispatch = typeof myStore.dispatch;
