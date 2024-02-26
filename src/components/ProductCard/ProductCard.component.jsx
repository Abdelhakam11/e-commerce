import React, { useCallback, useState } from "react";
import "./ProductCard.styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo } from "react";
import { addProduct, removeProduct } from "../../redux/favouriteSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default memo(function ProductCard({
  id,
  title,
  price,
  image,
  cardStyled,
  checkedProduct = false,
}) {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(checkedProduct);
  const navigate = useNavigate();

  function handleClicked() {
    navigate(`/shop/product/${id}`);
  }
  const handleChecked = useCallback(
    (e) => {
      e.stopPropagation();
      if (!checked) {
        dispatch(addProduct(id));
      } else {
        dispatch(removeProduct(id));
      }
      setChecked(!checked);
    },
    [dispatch, checked, id]
  );

  return (
    <div
      className={
        "product-card-container " +
        (cardStyled === "home" ? "home-card" : "shop-card")
      }
      onClick={handleClicked}
    >
      <div
        onClick={(e) => handleChecked(e)}
        className="product-card-container--fav-icon"
      >
        <FontAwesomeIcon
          className="icon"
          icon={`fa-heart ${checked ? "fas" : "far"}`}
        />
      </div>
      <img alt="title" className="product-card-container--image" src={image} />
      <div className="product-card-container--details">
        <span className="product-card-container--details--title">{title}</span>
        <span className="product-card-container--details--price">{price}$</span>
      </div>
    </div>
  );
});
