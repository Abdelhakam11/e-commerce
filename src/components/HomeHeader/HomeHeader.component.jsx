import React from "react";
import "./HomeHeader.styles.scss";
import { Link } from "react-router-dom";

export default function HomeHeader() {
  return (
    <div className="home-header-container">
      <div className="home-header-container--contain-box">
        <h1 className="home-header-container--contain-box--main-title">
          FROM CASUAL TO COUTURE
        </h1>
        <p className="home-header-container--contain-box--sub-title">
          Elevate your style with our fashion-forward collection.
        </p>
        <Link className="home-header-container--contain-box--btn" to="/shop">SHOP NOW</Link>
      </div>
    </div>
  );
}
