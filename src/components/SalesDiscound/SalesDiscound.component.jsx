import React from "react";
import "./SalesDiscound.styles.scss";

export default function SalesDiscound() {
  const discount = 70;
  return (
    <div className="sales-discound-container">
      <h1 className="sales-discound-container--text-container">
        <span className="sales-discound-container--text-container--primaray-title">SALE ON</span>
        <span className="sales-discound-container--text-container--subtitle">Get up to {discount}% off</span>
      </h1>
    </div>
  );
}
