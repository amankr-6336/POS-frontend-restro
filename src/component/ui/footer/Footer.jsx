import React from 'react';
import './Footer.scss';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo and Description */}
        <div className="footer-section">
          <h2 className="logo">Restopia</h2>
          <p>Your one-stop restaurant management solution.</p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#features">Features</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div className="footer-section">
          <h3>Resources</h3>
          <ul>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#blog">Blog</a></li>
            <li><a href="#support">Support</a></li>
          </ul>
        </div>

        {/* Follow Us */}
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="#">FB</a>
            <a href="#">TW</a>
            <a href="#">IG</a>
            <a href="#">LN</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Restopia. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
