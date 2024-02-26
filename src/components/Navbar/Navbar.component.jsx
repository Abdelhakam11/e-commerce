import React, { useEffect, useState } from "react";
import "./Navbar.styles.scss";
import { getCategories } from "../../api/api";
import { NavLink } from "react-router-dom";
import SearchBox from "../SearchBox/SearchBox.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";

export default function Navbar() {
  const favouriteProducts = useSelector((state) => state.favouriteReducer.favouriteProducts);
  const message = "Free shipping on orders above Rs.1999/- for members";
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories(setCategories);
  }, []);

  return (
    <div className="navbar">
      <div className="navbar--detials">
        <p>{message}</p>
        <div className="navbar--detials--items-container">detials</div>
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
          <div className="navbar--container--items--search-box">
            <SearchBox />
            <span>
              <FontAwesomeIcon className="icon" icon="fa-heart far" />
              <span>{favouriteProducts.length}</span>
            </span>
            <span>
              <FontAwesomeIcon className="icon" icon="fa-bag-shopping fas" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
