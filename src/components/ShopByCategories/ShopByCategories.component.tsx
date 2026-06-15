import React from 'react';
import './ShopByCategories.styles.scss';
import ShopProducts from '../ShopProducts/ShopProducts.component';
import { useParams } from 'react-router-dom';
import { useProductsByCategory } from '../../hooks/useProductsByCategory';
import { ProductGridSkeleton } from '../ui/Skeleton';

export default function ShopByCategories() {
  const { category = '' } = useParams<{ category: string }>();
  const { data: products = [], isLoading } = useProductsByCategory(category);

  return (
    <div className="shop-by-categories-container">
      {isLoading ? <ProductGridSkeleton /> : <ShopProducts products={products} />}
    </div>
  );
}
