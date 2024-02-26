import Slider from "react-slick";
import "./CardSlider.styles.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "../ProductCard/ProductCard.component";

export default function CardSlider({ products }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 5000,
    initialSlide: 0,
  };

  return (
    <>
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
    </>
  );
}
