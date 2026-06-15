import React, { memo } from 'react';
import './CartAlert.styles.scss';

export default memo(function CartAlert({ visible }: { visible: boolean }) {
  return (
    <div
      className={`cart-alert-container${visible ? ' cart-alert-container--visible' : ''}`}
      role="status"
      aria-live="polite"
    >
      Added to cart
    </div>
  );
});
