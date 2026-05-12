import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-hero-image">
        <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1600" alt="Mountain Landscape" />
        <div className="footer-image-overlay">
          <h2>EXPLORE THE UNKNOWN</h2>
        </div>
      </div>

      <div className="footer-container">
        <div className="footer-column">
          <h3>Company</h3>
          <ul>
            <li>Story</li>
            <li>Sustainability</li>
            <li>Craftsmanship</li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Social</h3>
          <ul>
            <li>Instagram</li>
            <li>YouTube</li>
            <li>Pinterest</li>
          </ul>
        </div>
        <div className="footer-column newsletter">
          <h3>Newsletter</h3>
          <div className="input-group">
            <input type="email" placeholder="EMAIL" />
            <button>SUBSCRIBE</button>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026, Palm Angels</p>
      </div>
    </footer>
  );
}
