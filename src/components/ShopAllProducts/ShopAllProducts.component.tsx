import React, { useEffect } from 'react';
import './ShopAllProducts.styles.scss';
import ShopProducts from '../ShopProducts/ShopProducts.component';
import { useInfiniteProducts } from '../../hooks/useInfiniteProducts';
import { ProductGridSkeleton } from '../ui/Skeleton';

export default function ShopAllProducts() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteProducts();

  const products = data?.pages.flatMap((p) => p.products) ?? [];

  useEffect(() => {
    function handleScroll() {
      const nearBottom =
        window.scrollY + window.innerHeight >= document.body.scrollHeight - 200;
      if (nearBottom && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) {
    return (
      <div className="shop-all-products-container">
        <ProductGridSkeleton count={8} />
      </div>
    );
  }

  return (
    <div className="shop-all-products-container">
      <ShopProducts products={products} />
      {isFetchingNextPage && (
        <p className="shop-all-products-container--loading">Loading more products…</p>
      )}
    </div>
  );
}
