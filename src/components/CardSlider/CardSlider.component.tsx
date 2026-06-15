import React from 'react';
import Slider, { Settings } from 'react-slick';
import './CardSlider.styles.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProductCard from '../ProductCard/ProductCard.component';
import type { Product } from '../../types';

const settings: Settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4500,
  pauseOnHover: true,
  responsive: [
    { breakpoint: 1280, settings: { slidesToShow: 3, slidesToScroll: 1 } },
    { breakpoint: 900, settings: { slidesToShow: 2, slidesToScroll: 1 } },
    { breakpoint: 560, settings: { slidesToShow: 1, slidesToScroll: 1 } },
  ],
};

export default function CardSlider({ products }: { products: Product[] }) {
  if (!products || products.length === 0) return null;

  return (
    <div className="card-slider">
      <Slider {...settings}>
        {products.map(({ id, title, price, images }) => (
          <ProductCard
            key={id}
            id={id}
            title={title}
            price={price}
            image={images[0]}
            cardStyled="home"
          />
        ))}
      </Slider>
    </div>
  );
}
