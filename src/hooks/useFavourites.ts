import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from './redux';
import {
  addFavourite,
  removeFavourite,
  selectAllFavourites,
  selectFavouritesCount,
} from '../redux/favouriteSlice';
import type { FavouriteItem } from '../types';

export function useFavourites() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectAllFavourites);
  const count = useAppSelector(selectFavouritesCount);

  const handleAdd = useCallback(
    (item: FavouriteItem) => dispatch(addFavourite(item)),
    [dispatch]
  );
  const handleRemove = useCallback(
    (id: number) => dispatch(removeFavourite(id)),
    [dispatch]
  );

  return {
    items,
    count,
    addFavourite: handleAdd,
    removeFavourite: handleRemove,
  };
}
