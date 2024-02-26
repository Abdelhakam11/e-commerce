import "./ShopProducts.styles.scss";
import ProductCard from "../ProductCard/ProductCard.component";
import { memo, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default memo(function ShopProducts({ products }) {
  const [checkedProducts,setCheckedProducts]=useState([]);
  const favouriteProducts = useSelector(
    (state) => state.favouriteReducer.favouriteProducts
  );
  const checkIsFavourite= useCallback(()=>{
    const editProducts=products.map((product) => {
      if(favouriteProducts.includes(product.id)){
        product.checked=true;
      }else{
        product.checked=false;
      }
      return product;
      });
      setCheckedProducts(editProducts);
  },[products,favouriteProducts])

  useEffect(()=>{
    checkIsFavourite()
  },[checkIsFavourite])
  return (
    <div className="shop-products-container">
      {checkedProducts.map(({ id, title, price, images,checked }) => (
        <ProductCard
          key={id}
          id={id}
          title={title}
          price={price}
          image={images[0]}
          checkedProduct={checked}
          cardStyled="shop-card"
        />
      ))}
    </div>
  );
});
