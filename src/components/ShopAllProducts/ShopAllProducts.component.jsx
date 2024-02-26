import React, { useCallback, useEffect, useRef, useState } from "react";
import "./ShopAllProducts.styles.scss";
import { getProducts } from "../../api/api";
import ShopProducts from "../ShopProducts/ShopProducts.component";

export default function ShopAllProducts() {
  const [products, setProducts] = useState([]);
  const limit = useRef(20);
  const totalProducts = useRef(0);

  const getData = useCallback((data) => {
    setProducts(data.products);
    totalProducts.current = data.total;
  }, []);
  const fetchMoreProducts = useCallback(() => {
    const isAtBottom =
      window.scrollY + window.innerHeight >= document.body.scrollHeight;
    if (limit.current !== 0 && limit.current === totalProducts.current) {
      window.removeEventListener("scroll", fetchMoreProducts);
    } else if (isAtBottom) {
      limit.current += 20;
      getProducts(getData, limit.current);
    }
  }, [getData]);

  useEffect(() => {
    getProducts(getData, limit.current);
  }, [getData]);
  useEffect(() => {
    window.addEventListener("scroll", fetchMoreProducts);
    return () => {
      window.removeEventListener("scroll", fetchMoreProducts);
    };
  }, [fetchMoreProducts]);
  return (
    <div className="shop-all-products-container">
      {products.length}
      <ShopProducts products={products} />
    </div>
  );
}
