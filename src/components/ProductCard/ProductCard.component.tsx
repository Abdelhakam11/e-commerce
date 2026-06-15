import React, { memo, useCallback } from 'react';
import './ProductCard.styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import { addFavourite, removeFavourite, selectFavouriteById } from '../../redux/favouriteSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useNavigate } from 'react-router-dom';
import AddToCartBtn from '../AddToCartBtn/AddToCartBtn.component';

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  image: string;
  cardStyled?: string;
}

export default memo(function ProductCard({ id, title, price, image, cardStyled }: ProductCardProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isFavourite = useAppSelector((state) => Boolean(selectFavouriteById(state, id)));

  function handleNavigate() {
    navigate(`/shop/product/${id}`);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleNavigate();
    }
  }

  const handleFavourite = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (isFavourite) {
        dispatch(removeFavourite(id));
      } else {
        dispatch(addFavourite({ id, title, price, image }));
      }
    },
    [dispatch, isFavourite, id, title, price, image]
  );

  return (
    <div
      className={`product-card ${cardStyled === 'home' ? 'product-card--home' : 'product-card--shop'}`}
      onClick={handleNavigate}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View ${title}, $${price}`}
    >
      <button
        type="button"
        onClick={handleFavourite}
        className="product-card__fav"
        aria-label={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
        aria-pressed={isFavourite}
      >
        <FontAwesomeIcon
          icon={(isFavourite ? ['fas', 'heart'] : ['far', 'heart']) as IconProp}
          className={`product-card__fav-icon${isFavourite ? ' product-card__fav-icon--active' : ''}`}
        />
      </button>

      <div className="product-card__image-wrap">
        <img alt={title} className="product-card__image" src={image} loading="lazy" />
      </div>

      <div className="product-card__body">
        <p className="product-card__title">{title}</p>
        <p className="product-card__price">${price}</p>
      </div>

      <AddToCartBtn id={id} title={title} price={price} image={image} />
    </div>
  );
});
