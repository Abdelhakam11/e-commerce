import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { CartItem } from '../types';
import type { RootState } from './store';

const cartAdapter = createEntityAdapter<CartItem>();

const cartSlice = createSlice({
  name: 'cart',
  initialState: cartAdapter.getInitialState(),
  reducers: {
    addToCart(state, action: PayloadAction<Omit<CartItem, 'amount'>>) {
      const existing = state.entities[action.payload.id];
      if (existing) {
        existing.amount++;
      } else {
        cartAdapter.addOne(state, { ...action.payload, amount: 1 });
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      cartAdapter.removeOne(state, action.payload);
    },
    incrementAmount(state, action: PayloadAction<number>) {
      const item = state.entities[action.payload];
      if (item) item.amount++;
    },
    decrementAmount(state, action: PayloadAction<number>) {
      const item = state.entities[action.payload];
      if (item) {
        if (item.amount > 1) {
          item.amount--;
        } else {
          cartAdapter.removeOne(state, action.payload);
        }
      }
    },
  },
});

export const { addToCart, removeFromCart, incrementAmount, decrementAmount } = cartSlice.actions;

const cartAdapterSelectors = cartAdapter.getSelectors<RootState>(
  (state) => state.cartReducer
);

export const selectAllCartItems = cartAdapterSelectors.selectAll;
export const selectCartById = cartAdapterSelectors.selectById;
export const selectCartTotal = (state: RootState) =>
  cartAdapterSelectors.selectAll(state).reduce(
    (sum, item) => sum + item.price * item.amount,
    0
  );
export const selectCartCount = (state: RootState) =>
  cartAdapterSelectors.selectAll(state).reduce((sum, item) => sum + item.amount, 0);
export const selectCartLength = (state: RootState) =>
  cartAdapterSelectors.selectIds(state).length;

export default cartSlice.reducer;
