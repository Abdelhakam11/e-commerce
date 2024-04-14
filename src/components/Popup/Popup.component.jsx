import React from "react";
import "./Popup.styles.scss";
import { memo } from "react";

export default memo(function Popup({ products, setIsPopup, type }) {
  console.log(products);
  return (
    <div className="popup-container">
      <div className="popup-container--content">
        <span onClick={() => setIsPopup(false)}>x</span>
      </div>
    </div>
  );
});
