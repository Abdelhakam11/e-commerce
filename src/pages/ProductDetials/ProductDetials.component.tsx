import React, { memo } from 'react';
import './ProductDetials.styles.scss';
import { useParams } from 'react-router-dom';
import CardSlider from '../../components/CardSlider/CardSlider.component';
import AddToCartBtn from '../../components/AddToCartBtn/AddToCartBtn.component';
import { useProduct } from '../../hooks/useProduct';
import { useProductsByCategory } from '../../hooks/useProductsByCategory';
import type { Product } from '../../types';

export default function ProductDetails() {
  const { id = '' } = useParams<{ id: string }>();
  const { data: product, isLoading, isError } = useProduct(id);

  if (isLoading) {
    return <div className="product-details__loading">Loading product…</div>;
  }

  if (isError || !product) {
    return <div className="product-details__error">Product not found.</div>;
  }

  return (
    <div className="product-detials-container">
      <div className="product-detials-container--product-detials">
        <CollectionPhotos productPhotos={product.images} title={product.title} />
        <DetailsCollection product={product} />
      </div>
      <SimilarProducts category={product.category} currentId={product.id} />
    </div>
  );
}

const CollectionPhotos = memo(function CollectionPhotos({
  productPhotos,
  title,
}: {
  productPhotos: string[];
  title: string;
}) {
  return (
    <div className="photos-collection">
      {productPhotos.slice(0, 4).map((src, index) => (
        <img
          key={src}
          alt={`${title} — view ${index + 1}`}
          src={src}
          className="photos-collection--photo"
          loading="lazy"
        />
      ))}
    </div>
  );
});

const DetailsCollection = memo(function DetailsCollection({ product }: { product: Product }) {
  const { id, title, brand, price, rating, stock, description, images } = product;
  return (
    <div className="detials-collection">
      {brand && <div className="detials-collection--brand-tag">{brand}</div>}
      <h1 className="detials-collection--product-title">{title}</h1>
      <span className="detials-collection--price">${price}</span>
      <div
        style={{ '--rating': rating } as React.CSSProperties}
        className="detials-collection--stars"
        aria-label={`Rating: ${rating} out of 5`}
      />
      <p className="detials-collection--description">{description}</p>
      <div className="detials-collection--stock">
        {stock > 0 ? `${stock} in stock` : 'Out of stock'}
      </div>
      <div className="detials-collection--to-cart">
        <AddToCartBtn id={id} title={title} price={price} image={images?.[0] ?? ''} />
      </div>
    </div>
  );
});

const SimilarProducts = memo(function SimilarProducts({
  category,
  currentId,
}: {
  category: string;
  currentId: number;
}) {
  const { data: allProducts = [] } = useProductsByCategory(category, 15);
  const products = allProducts.filter((p: Product) => p.id !== currentId);

  if (products.length === 0) return null;

  return (
    <div className="similar-products">
      <h2 className="similar-products--title">Similar Products</h2>
      <CardSlider products={products} />
    </div>
  );
});
