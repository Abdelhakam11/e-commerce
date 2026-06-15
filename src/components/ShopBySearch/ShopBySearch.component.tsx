import React from 'react';
import './ShopBySearch.styles.scss';
import ShopProducts from '../ShopProducts/ShopProducts.component';
import { useParams } from 'react-router-dom';
import { useProductSearch } from '../../hooks/useProductSearch';
import { ProductGridSkeleton } from '../ui/Skeleton';

export default function ShopBySearch() {
  const { query = '' } = useParams<{ query: string }>();
  const { data: products = [], isLoading } = useProductSearch(query, { minLength: 1 });

  if (isLoading) {
    return (
      <div className="shop-by-search-container">
        <ProductGridSkeleton />
      </div>
    );
  }

  return (
    <div className="shop-by-search-container">
      {products.length === 0 ? (
        <p className="shop-by-search-container--empty">
          No results found for &ldquo;{query}&rdquo;.
        </p>
      ) : (
        <ShopProducts products={products} />
      )}
    </div>
  );
}
