import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <h2 className="footer-title">Bet<span>Zone</span></h2>
          <p className="footer-tagline">Smart bets, secure payouts, and real-time action.</p>
        </div>
        <div className="footer-columns">
          <div className="footer-column">
            <h3>Explore</h3>
            <ul>
              <li><a href="/bets">My Bets</a></li>
              <li><a href="/deposit">Deposit</a></li>
              <li><a href="/withdraw">Withdraw</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Support</h3>
            <ul>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Responsible Gaming</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Follow</h3>
            <div className="footer-social">
              <a href="#" aria-label="Facebook">Fb</a>
              <a href="#" aria-label="X">X</a>
              <a href="#" aria-label="Instagram">Ig</a>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} BetZone. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
