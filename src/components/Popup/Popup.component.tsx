import React, { memo, useEffect } from 'react';
import './Popup.styles.scss';
import { useAppDispatch } from '../../hooks/redux';
import { removeFromCart, incrementAmount, decrementAmount } from '../../redux/cartSlice';
import { removeFavourite } from '../../redux/favouriteSlice';
import type { CartItem, FavouriteItem } from '../../types';

function CartItemRow({ item }: { item: CartItem }) {
  const dispatch = useAppDispatch();
  return (
    <div className="drawer-item">
      <img src={item.image} alt={item.title} className="drawer-item__img" />
      <div className="drawer-item__info">
        <p className="drawer-item__title">{item.title}</p>
        <p className="drawer-item__price">${(item.price * item.amount).toFixed(2)}</p>
        <div className="drawer-item__qty">
          <button
            type="button"
            onClick={() => dispatch(decrementAmount(item.id))}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span>{item.amount}</span>
          <button
            type="button"
            onClick={() => dispatch(incrementAmount(item.id))}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>
      <button
        type="button"
        className="drawer-item__remove"
        onClick={() => dispatch(removeFromCart(item.id))}
        aria-label={`Remove ${item.title}`}
      >
        ✕
      </button>
    </div>
  );
}

function FavItemRow({ item }: { item: FavouriteItem }) {
  const dispatch = useAppDispatch();
  return (
    <div className="drawer-item">
      <img src={item.image} alt={item.title} className="drawer-item__img" />
      <div className="drawer-item__info">
        <p className="drawer-item__title">{item.title}</p>
        <p className="drawer-item__price">${item.price.toFixed(2)}</p>
      </div>
      <button
        type="button"
        className="drawer-item__remove"
        onClick={() => dispatch(removeFavourite(item.id))}
        aria-label={`Remove ${item.title} from favourites`}
      >
        ✕
      </button>
    </div>
  );
}

interface PopupProps {
  type: 'cart' | 'favourite';
  products: CartItem[] | FavouriteItem[];
  setIsPopup: (open: boolean) => void;
}

export default memo(function Popup({ products, setIsPopup, type }: PopupProps) {
  const isCart = type === 'cart';
  const title = isCart ? 'Your Cart' : 'Favourites';
  const cartItems = products as CartItem[];
  const total = isCart
    ? cartItems.reduce((sum, item) => sum + item.price * item.amount, 0)
    : 0;

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setIsPopup(false);
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [setIsPopup]);

  return (
    <div
      className="drawer-overlay"
      role="dialog"
      aria-modal={true}
      aria-label={title}
      onClick={() => setIsPopup(false)}
    >
      <div className="drawer" onClick={(e) => e.stopPropagation()}>
        <div className="drawer__header">
          <h2 className="drawer__title">
            {title}
            {products.length > 0 && (
              <span className="drawer__badge">{products.length}</span>
            )}
          </h2>
          <button
            type="button"
            className="drawer__close"
            onClick={() => setIsPopup(false)}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="drawer__body">
          {products.length === 0 ? (
            <div className="drawer__empty">
              <p>Your {title.toLowerCase()} is empty.</p>
            </div>
          ) : isCart ? (
            cartItems.map((item) => <CartItemRow key={item.id} item={item} />)
          ) : (
            (products as FavouriteItem[]).map((item) => (
              <FavItemRow key={item.id} item={item} />
            ))
          )}
        </div>

        {isCart && products.length > 0 && (
          <div className="drawer__footer">
            <div className="drawer__total">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button type="button" className="drawer__checkout">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
});
