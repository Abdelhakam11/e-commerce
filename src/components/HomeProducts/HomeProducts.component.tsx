import React from 'react';
import './HomeProducts.styles.scss';
import CardSlider from '../CardSlider/CardSlider.component';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../../api/api';
import { queryKeys } from '../../lib/queryKeys';
import { SliderSkeleton } from '../ui/Skeleton';

export default function HomeProducts() {
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.products(15, 0),
    queryFn: () => getProducts(15, 0),
    staleTime: 5 * 60 * 1000,
  });

  const products = data?.products ?? [];

  return (
    <div className="home-products-container">
      <h1 className="home-products-container--title">POPULAR</h1>
      {isLoading ? <SliderSkeleton /> : <CardSlider products={products} />}
    </div>
  );
}
