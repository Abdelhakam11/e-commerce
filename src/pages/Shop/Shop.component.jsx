import React from "react";
import "./Shop.styles.scss";
import { Outlet } from "react-router-dom";
import SalesDiscound from "../../components/SalesDiscound/SalesDiscound.component";
import ShopSideBar from "../../components/ShopSideBar/ShopSideBar.component";

export default function Shop() {
  return (
    <div className="shop-container">
      <div className="shop-container--sidebar">
        <ShopSideBar />
      </div>
      <div className="shop-container--details">
        <SalesDiscound />
        <Outlet></Outlet>
      </div>
    </div>
  );
}
