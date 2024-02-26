import React, { useCallback, useEffect, useState } from "react";
import "./HomeProducts.styles.scss";
import { getProducts } from "../../api/api";
import CardSlider from "../CardSlider/CardSlider.component";

export default function HomeProducts() {
  const [products, setProducts] = useState([]);

  const getData = useCallback((data) => {
    setProducts(data.products);
  }, []);

  useEffect(() => {
    getProducts(getData, 15);
  }, [getData]);

  return (
    <div className="home-products-container">
      <h1 className="home-products-container--title">POPULAR</h1>
      <CardSlider products={products} />
    </div>
  );
}
