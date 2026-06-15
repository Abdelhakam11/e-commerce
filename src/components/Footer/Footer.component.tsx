import React from 'react';
import './Footer.styles.scss';
import { Link } from 'react-router-dom';
import { useCategories } from '../../hooks/useCategories';

export default function Footer() {
  const { data: categories = [] } = useCategories();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__col footer__col--brand">
          <Link to="/" className="footer__logo">Stylehive</Link>
          <p className="footer__tagline">
            From casual to couture — fashion that moves with you.
          </p>
          <div className="footer__socials">
            <a href="#instagram" className="footer__social-link" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
              </svg>
            </a>
            <a href="#twitter" className="footer__social-link" aria-label="Twitter / X">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="#facebook" className="footer__social-link" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          </div>
        </div>

        <div className="footer__col">
          <h3 className="footer__heading">Shop</h3>
          <ul className="footer__links">
            <li><Link to="/shop">All Products</Link></li>
            {categories.slice(0, 6).map((cat: string) => (
              <li key={cat}>
                <Link to={`/shop/${cat}`}>{cat}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h3 className="footer__heading">Help</h3>
          <ul className="footer__links">
            <li><a href="#about">About Us</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#shipping">Shipping Info</a></li>
            <li><a href="#returns">Returns &amp; Exchanges</a></li>
            <li><a href="#size-guide">Size Guide</a></li>
          </ul>
        </div>

        <div className="footer__col footer__col--newsletter">
          <h3 className="footer__heading">Stay in the loop</h3>
          <p className="footer__newsletter-text">
            Get early access to new arrivals, exclusive deals, and style inspiration.
          </p>
          <form
            className="footer__newsletter-form"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="your@email.com"
              className="footer__newsletter-input"
              aria-label="Email address for newsletter"
            />
            <button type="submit" className="footer__newsletter-btn">
              Subscribe
            </button>
          </form>
          <p className="footer__newsletter-note">
            No spam, unsubscribe anytime.
          </p>
        </div>
      </div>

      <div className="footer__bottom">
        <p className="footer__copy">
          &copy; {year} Stylehive. All rights reserved.
          <span className="footer__powered">
            Powered by <strong>Abdelhakam Elewa</strong>
          </span>
        </p>
        <div className="footer__payments">
          <span>Visa</span>
          <span>Mastercard</span>
          <span>PayPal</span>
          <span>Apple Pay</span>
        </div>
      </div>
    </footer>
  );
}
