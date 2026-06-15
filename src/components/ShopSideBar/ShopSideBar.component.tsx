import React, { memo } from 'react';
import './ShopSideBar.styles.scss';
import { useCategories } from '../../hooks/useCategories';
import { Link, NavLink } from 'react-router-dom';

export const SideBarLink = memo(function SideBarLink({ category }: { category: string }) {
  return (
    <NavLink
      to={`/shop/${category}`}
      className={({ isActive }) => (isActive ? 'active' : undefined)}
    >
      {category}
    </NavLink>
  );
});

export default memo(function ShopSideBar() {
  const { data: categories = [] } = useCategories();

  return (
    <div className="shop-sidebar-container">
      <h1 className="shop-sidebar-container--title">PRODUCTS</h1>
      <div className="shop-sidebar-container--categories-list">
        <div className="shop-sidebar-container--categories-list--item">
          <Link to="/shop">all products</Link>
        </div>
        {categories.map((category: string) => (
          <div key={category} className="shop-sidebar-container--categories-list--item">
            <SideBarLink category={category} />
          </div>
        ))}
      </div>
    </div>
  );
});
