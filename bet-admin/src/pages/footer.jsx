import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <h2 className="footer-title">Bet<span>Admin</span></h2>
          <p className="footer-tagline">Control center for users, bets, and transactions.</p>
        </div>
        <div className="footer-columns">
          <div className="footer-column">
            <h3>Overview</h3>
            <ul>
              <li><a href="/dashboard">Dashboard</a></li>
              <li><a href="/bets">Bets</a></li>
              <li><a href="/deposit">Deposits</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Management</h3>
            <ul>
              <li><a href="/withdraw">Withdrawals</a></li>
              <li><a href="/profile">Users</a></li>
              <li><a href="#">Reports</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Links</h3>
            <div className="footer-social">
              <a href="#">Docs</a>
              <a href="#">Status</a>
              <a href="#">Support</a>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} BetAdmin. Internal use only.</p>
      </div>
    </footer>
  );
};

export default Footer;
