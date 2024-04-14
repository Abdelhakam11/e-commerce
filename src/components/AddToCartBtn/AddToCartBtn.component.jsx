import React, { useCallback } from "react";
import "./AddToCartBtn.styles.scss";
import { memo } from "react";
import { addProductToCart } from "../../redux/cartSlice";
import { useDispatch } from "react-redux";


export default memo(function AddToCartBtn({ id }) {
  const dispatch = useDispatch();
  const addToCart = useCallback(
    (e) => {
      e.stopPropagation();
      dispatch(addProductToCart(id));
    },
    [dispatch, id]
  );

  return (
    <>
      <div className="add-to-cart-container" onClick={(e) => addToCart(e)}>
        add to cart
      </div>
    </>
  );
});
