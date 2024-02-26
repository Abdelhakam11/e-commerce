import { memo, useEffect, useState } from "react";
import { getCategories } from "../../api/api";
import "./ShopSideBar.styles.scss";
import { Link, NavLink } from "react-router-dom";

export const SideBarLink = memo(function ({ category }) {
  return (
    <NavLink to={`/shop/${category}`} activeclassname="active">
      {category}
    </NavLink>
  );
});

export default memo(function ShopSideBar() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories(setCategories);
  }, []);
  return (
    <div className="shop-sidebar-container">
      <h1 className="shop-sidebar-container--title">PRODUCTS</h1>
      <div className="shop-sidebar-container--categories-list">
        <div className="shop-sidebar-container--categories-list--item">
          <Link to="/shop">all products</Link>
        </div>
        {categories.map((category, index) => (
          <div
            key={index}
            className="shop-sidebar-container--categories-list--item"
          >
            <SideBarLink category={category} />
          </div>
        ))}
      </div>
    </div>
  );
});
