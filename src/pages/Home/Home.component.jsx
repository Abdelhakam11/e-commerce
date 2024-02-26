import React from "react";
import "./Home.styles.scss";
import HomeHeader from "../../components/HomeHeader/HomeHeader.component";
import SalesDiscound from "../../components/SalesDiscound/SalesDiscound.component";
import HomeProducts from "../../components/HomeProducts/HomeProducts.component";

export default function Home() {
  return (
    <div className="home-container">
      <HomeHeader />
      <SalesDiscound />
      <HomeProducts />
    </div>
  );
}
