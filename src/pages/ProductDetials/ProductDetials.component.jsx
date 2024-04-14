import React, { memo, useEffect, useState } from "react";
import "./ProductDetials.styles.scss";
import { useParams } from "react-router-dom";
import { getByCategory, getSingleProduct } from "../../api/api";
import CardSlider from "../../components/CardSlider/CardSlider.component";
import  AddToCartBtn  from "../../components/AddToCartBtn/AddToCartBtn.component";


export default function ProductDetials() {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    getSingleProduct(setProduct, id);
  }, [id]);
  return (
    <div className="product-detials-container">
      <div className="product-detials-container--product-detials">
        <CollectionPhotos productPhotos={product.images} />
        <DetialsCollection
          id={id}
          title={product.title}
          brand={product.brand}
          price={product.price}
          rating={product.rating}
          stock={product.stock}
          description={product.description}
        />
      </div>
      <SimilarProducts category={product.category} />
    </div>
  );
}

const CollectionPhotos = memo(function ({ productPhotos = [] }) {
  return (
    <div className="photos-collection">
      {productPhotos.slice(0, 4).map((productPhoto, index) => (
        <img
          alt="product"
          key={index}
          src={productPhoto}
          className="photos-collection--photo"
        />
      ))}
    </div>
  );
});

const DetialsCollection = memo(function (props) {
  const { id, title, price, rating, stock, description, brand } = props;

  return (
    <div className="detials-collection">
      <h1 className="detials-collection--product-title">{title}
      <span className="detials-collection--product-title--brand"> {brand}</span>
      </h1>
      <span className="detials-collection--price">{price}$</span>
      <div className="detials-collection--description">
        description: {description}
      </div>
      <div
        style={{ "--rating": rating }}
        className="detials-collection--stars"
      ></div>
      <div className="detials-collection--stock">in stock: {stock}</div>
      <div className="detials-collection--to-cart">
        <AddToCartBtn id={id} />
      </div>
    </div>
  );
});

const SimilarProducts = memo(function ({ category }) {
  const [products, setProduct] = useState([]);
  useEffect(() => {
    getByCategory(category, setProduct, 15);
  }, [category]);

  return (
    <div className="similar-products">
      <h1 className="similar-products--title">Similar Products</h1>
      <CardSlider products={products} />
    </div>
  );
});
