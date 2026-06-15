import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from './redux';
import {
  addToCart,
  removeFromCart,
  incrementAmount,
  decrementAmount,
  selectAllCartItems,
  selectCartTotal,
  selectCartCount,
  selectCartLength,
} from '../redux/cartSlice';
import type { CartItem } from '../types';

export function useCart() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectAllCartItems);
  const total = useAppSelector(selectCartTotal);
  const count = useAppSelector(selectCartCount);
  const length = useAppSelector(selectCartLength);

  const handleAddToCart = useCallback(
    (item: Omit<CartItem, 'amount'>) => dispatch(addToCart(item)),
    [dispatch]
  );
  const handleRemoveFromCart = useCallback(
    (id: number) => dispatch(removeFromCart(id)),
    [dispatch]
  );
  const handleIncrement = useCallback(
    (id: number) => dispatch(incrementAmount(id)),
    [dispatch]
  );
  const handleDecrement = useCallback(
    (id: number) => dispatch(decrementAmount(id)),
    [dispatch]
  );

  return {
    items,
    total,
    count,
    length,
    addToCart: handleAddToCart,
    removeFromCart: handleRemoveFromCart,
    incrementAmount: handleIncrement,
    decrementAmount: handleDecrement,
  };
}
