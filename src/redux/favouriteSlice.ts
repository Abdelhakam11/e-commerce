import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { FavouriteItem } from '../types';
import type { RootState } from './store';

const favAdapter = createEntityAdapter<FavouriteItem>();

const favouriteSlice = createSlice({
  name: 'favourites',
  initialState: favAdapter.getInitialState(),
  reducers: {
    addFavourite(state, action: PayloadAction<FavouriteItem>) {
      favAdapter.addOne(state, action.payload);
    },
    removeFavourite(state, action: PayloadAction<number>) {
      favAdapter.removeOne(state, action.payload);
    },
  },
});

export const { addFavourite, removeFavourite } = favouriteSlice.actions;

const favAdapterSelectors = favAdapter.getSelectors<RootState>(
  (state) => state.favouriteReducer
);

export const selectAllFavourites = favAdapterSelectors.selectAll;
export const selectFavouriteById = favAdapterSelectors.selectById;
export const selectFavouritesCount = (state: RootState) =>
  favAdapterSelectors.selectIds(state).length;

export default favouriteSlice.reducer;
