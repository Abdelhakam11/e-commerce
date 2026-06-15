import React, { useEffect, useRef, useState } from 'react';
import './Navbar.styles.scss';
import { useCategories } from '../../hooks/useCategories';
import { Link, NavLink } from 'react-router-dom';
import SearchBox from '../SearchBox/SearchBox.component';
import IconsBox from '../IconsBox/IconsBox.component';

function CategoriesMenu({ categories }: { categories: string[] }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', onClickOutside);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  function close() {
    setOpen(false);
  }

  return (
    <div className="cat-menu" ref={containerRef}>
      <button
        type="button"
        className={`cat-menu__btn${open ? ' cat-menu__btn--open' : ''}`}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="true"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
        All Categories
        <svg className="cat-menu__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div className="cat-menu__dropdown" role="menu">
          <Link to="/shop" className="cat-menu__all-link" onClick={close} role="menuitem">
            ✦ All Products
          </Link>
          <div className="cat-menu__grid">
            {categories.map((cat: string) => (
              <NavLink
                key={cat}
                to={`/shop/${cat}`}
                onClick={close}
                role="menuitem"
                className={({ isActive }) => isActive ? 'active' : undefined}
              >
                {cat}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const { data: categories = [] } = useCategories();

  return (
    <div className="navbar">
      <div className="navbar__banner">
        Free shipping on orders above Rs.1999/- for members
      </div>

      <nav className="navbar__main" aria-label="Primary navigation">
        <Link to="/" className="navbar__logo">
          Stylehive
        </Link>

        <CategoriesMenu categories={categories} />

        <div className="navbar__links">
          {categories.slice(0, 5).map((category: string) => (
            <NavLink
              key={category}
              to={`/shop/${category}`}
              className={({ isActive }) => (isActive ? 'active' : undefined)}
            >
              {category}
            </NavLink>
          ))}
        </div>

        <div className="navbar__actions">
          <SearchBox />
          <IconsBox />
        </div>
      </nav>
    </div>
  );
}
