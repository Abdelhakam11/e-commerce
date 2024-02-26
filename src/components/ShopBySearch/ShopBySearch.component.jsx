import React, { useEffect, useState } from "react";
import "./ShopBySearch.styles.scss";
import { getSearchProducts } from "../../api/api";
import ShopProducts from "../ShopProducts/ShopProducts.component";
import { useParams } from "react-router-dom";

export default function ShopBySearch() {
  const { query } = useParams();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getSearchProducts(setProducts, query);
  }, [query]);
  return (
    <div className="shop-by-search-container">
      {products.length === 0 ? (
        "no found results"
      ) : (
        <ShopProducts products={products} />
      )}
    </div>
  );
}
