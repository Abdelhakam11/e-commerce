import React, { memo } from 'react';
import './ShopProducts.styles.scss';
import ProductCard from '../ProductCard/ProductCard.component';
import type { Product } from '../../types';

export default memo(function ShopProducts({ products }: { products: Product[] }) {
  return (
    <div className="shop-products-container">
      {products.map(({ id, title, price, images }) => (
        <ProductCard
          key={id}
          id={id}
          title={title}
          price={price}
          image={images[0]}
          cardStyled="shop-card"
        />
      ))}
    </div>
  );
});
