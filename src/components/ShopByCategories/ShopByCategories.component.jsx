import React, { useEffect, useState } from "react";
import "./ShopByCategories.styles.scss";
import { getByCategory } from "../../api/api";
import ShopProducts from "../ShopProducts/ShopProducts.component";
import { useParams } from "react-router-dom";

export default function ShopByCategories() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getByCategory(category, setProducts);
  }, [category]);
  return (
    <div className="shop-by-categories-container">
      <ShopProducts products={products} />
    </div>
  );
}
