import React from 'react';
import './Skeleton.scss';

interface SkeletonProps {
  className?: string;
  style?: React.CSSProperties;
}

export function Skeleton({ className = '', style }: SkeletonProps) {
  return <span className={`skeleton ${className}`} style={style} aria-hidden="true" />;
}

export function ProductCardSkeleton() {
  return (
    <div className="product-card-skeleton" aria-hidden="true">
      <Skeleton style={{ height: '24rem', borderRadius: '12px 12px 0 0', width: '100%' }} />
      <div style={{ padding: '1.2rem 1.6rem' }}>
        <Skeleton style={{ height: '1.6rem', width: '75%', marginBottom: '0.6rem' }} />
        <Skeleton style={{ height: '2rem', width: '35%' }} />
      </div>
      <Skeleton
        style={{ height: '4.4rem', margin: '0 1.6rem 1.6rem', borderRadius: '6px' }}
      />
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="shop-products-container">
      {Array.from({ length: count }, (_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function SliderSkeleton() {
  return (
    <div className="slider-skeleton">
      {Array.from({ length: 4 }, (_, i) => (
        <div key={i} className="product-card-skeleton">
          <Skeleton
            style={{ height: '24rem', borderRadius: '12px 12px 0 0', width: '100%' }}
          />
          <div style={{ padding: '1.2rem 1.6rem' }}>
            <Skeleton style={{ height: '1.6rem', width: '75%', marginBottom: '0.6rem' }} />
            <Skeleton style={{ height: '2rem', width: '35%' }} />
          </div>
          <Skeleton
            style={{ height: '4.4rem', margin: '0 1.6rem 1.6rem', borderRadius: '6px' }}
          />
        </div>
      ))}
    </div>
  );
}
