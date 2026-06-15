import React, { memo, useCallback } from 'react';
import './AddToCartBtn.styles.scss';
import { addToCart } from '../../redux/cartSlice';
import { useAppDispatch } from '../../hooks/redux';

interface AddToCartBtnProps {
  id: number;
  title: string;
  price: number;
  image: string;
}

export default memo(function AddToCartBtn({ id, title, price, image }: AddToCartBtnProps) {
  const dispatch = useAppDispatch();

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      dispatch(addToCart({ id, title, price, image }));
    },
    [dispatch, id, title, price, image]
  );

  return (
    <button
      type="button"
      className="add-to-cart-btn"
      onClick={handleClick}
      aria-label="Add to cart"
    >
      Add to Cart
    </button>
  );
});
