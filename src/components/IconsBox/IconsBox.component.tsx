import React, { memo, useEffect, useRef, useState } from 'react';
import './IconsBox.styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useAppSelector } from '../../hooks/redux';
import {
  selectAllCartItems,
  selectCartCount,
  selectCartLength,
} from '../../redux/cartSlice';
import { selectAllFavourites, selectFavouritesCount } from '../../redux/favouriteSlice';
import Popup from '../Popup/Popup.component';
import CartAlert from '../CartAlert/CartAlert.component';

export default memo(function IconsBox() {
  const cartRef = useRef<HTMLButtonElement>(null);
  const prevCartLength = useRef(0);
  const [isPopup, setIsPopup] = useState(false);
  const [popupType, setPopupType] = useState<'cart' | 'favourite'>('cart');
  const [cartAlertVisible, setCartAlertVisible] = useState(false);

  const favouriteProducts = useAppSelector(selectAllFavourites);
  const cartProducts = useAppSelector(selectAllCartItems);
  const cartCount = useAppSelector(selectCartCount);
  const cartLength = useAppSelector(selectCartLength);
  const favCount = useAppSelector(selectFavouritesCount);

  useEffect(() => {
    if (cartLength > prevCartLength.current) {
      setCartAlertVisible(true);
      const hideAlert = setTimeout(() => setCartAlertVisible(false), 1800);
      cartRef.current?.classList.add('get-item');
      const removeAnim = setTimeout(() => {
        cartRef.current?.classList.remove('get-item');
      }, 3000);
      return () => {
        clearTimeout(hideAlert);
        clearTimeout(removeAnim);
      };
    }
    prevCartLength.current = cartLength;
  }, [cartLength]);

  function openPopup(type: 'cart' | 'favourite') {
    setPopupType(type);
    setIsPopup(true);
  }

  return (
    <>
      <CartAlert visible={cartAlertVisible} />
      <div className="icons-box">
        <button
          type="button"
          className="icons-box__btn"
          onClick={() => openPopup('favourite')}
          aria-label={`Favourites, ${favCount} items`}
        >
          <FontAwesomeIcon className="icons-box__icon" icon={['fas', 'heart'] as IconProp} />
          {favCount > 0 && (
            <span className="icons-box__badge" aria-hidden="true">
              {favCount}
            </span>
          )}
        </button>

        <button
          type="button"
          className="icons-box__btn"
          onClick={() => openPopup('cart')}
          ref={cartRef}
          aria-label={`Cart, ${cartCount} items`}
        >
          <FontAwesomeIcon className="icons-box__icon" icon={['fas', 'cart-shopping'] as IconProp} />
          {cartCount > 0 && (
            <span className="icons-box__badge" aria-hidden="true">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      {isPopup && (
        <Popup
          type={popupType}
          setIsPopup={setIsPopup}
          products={popupType === 'favourite' ? favouriteProducts : cartProducts}
        />
      )}
    </>
  );
});
