import React, { useEffect, useState } from "react";
import "./Navbar.styles.scss";
import { getCategories } from "../../api/api";
import { NavLink } from "react-router-dom";
import SearchBox from "../SearchBox/SearchBox.component";
import IconsBox from "../IconsBox/IconsBox.component";

export default function Navbar() {
  const message = "Free shipping on orders above Rs.1999/- for members";
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories(setCategories);
  }, []);

  return (
    <div className="navbar">
      <div className="navbar--detials">
        <p>{message}</p>
      </div>
      <div className="navbar--container">
        <div className="navbar--container--icon-box">
          <NavLink to="/">
            <h1 className="navbar--container--icon-box--icon">Stylehive</h1>
          </NavLink>
        </div>
        <div className="navbar--container--items">
          <div className="navbar--container--items--categories-container">
            {categories.slice(0, 5).map((category, index) => (
              <div
                key={index}
                className="navbar--container--items--categories-container--category"
              >
                <NavLink to={`/shop/${category}`} activeclassname="active">
                  {category}
                </NavLink>
              </div>
            ))}
          </div>
          <div className="navbar--container--items--boxes">
            <div className="navbar--container--items--boxes--search-box">
              <SearchBox />
            </div>
            <IconsBox />
          </div>
        </div>
      </div>
    </div>
  );
}
