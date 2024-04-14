import React, { useCallback, useEffect, useRef, useState } from "react";
import "./IconsBox.styles.scss";
import { memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import Popup from "../Popup/Popup.component";
import $ from "jquery";
import CartAlert from '../CartAlert/CartAlert.component';


export default memo(function IconsBox() {
  const cartRef = useRef();
  const [isPopup, setIsPopup] = useState(false);
  const [products, setProducts] = useState([]);
  const [type, setType] = useState(null);
  const favouriteProducts = useSelector(
    (state) => state.favouriteReducer.favouriteProducts
  );
  const cartProducts = useSelector((state) => state.cartReducer.cartProducts);
  const addingToCart = useCallback(() => {
    if (cartProducts.length !== 0) {
      $(".cart-alert-container").fadeIn("slow");
      setTimeout(() => {
        $(".cart-alert-container").fadeOut("slow");
      }, 1500);

      cartRef.current.classList.add("get-item");
      setTimeout(() => {
        cartRef.current.classList.remove("get-item");
      }, 3000);
    }
  }, [cartProducts]);
  function handleClick(type) {
    if (type === "favourite") {
      setProducts(favouriteProducts);
    } else if (type === "cart") {
      setProducts(cartProducts);
    }
    setType(type);
    setIsPopup(true);
  }
  useEffect(() => {
    addingToCart();
  }, [addingToCart]);
  return (
    <>
      <div className="icons-box">
      <CartAlert />
        <span
          key={0}
          className="icons-box--icon-box"
          onClick={() => handleClick("favourite")}
        >
          <FontAwesomeIcon className="icon" icon="fa-heart fas" />
          <span className="icon-number">{favouriteProducts.length}</span>
        </span>
        <span
          key={1}
          className="icons-box--icon-box"
          onClick={() => handleClick("cart")}
          ref={cartRef}
        >
          <FontAwesomeIcon className="icon" icon="fa-cart-shopping fas" />
          <span className="icon-number">{cartProducts.length}</span>
        </span>
      </div>
      {isPopup ? (
        <Popup type={type} setIsPopup={setIsPopup} products={products} />
      ) : null}
    </>
  );
});
