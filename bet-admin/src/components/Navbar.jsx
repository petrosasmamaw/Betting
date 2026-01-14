import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../Slices/authSlice';

const NavButton = ({ onClick, children }) => (
  <button className="nav-button" onClick={onClick}>{children}</button>
);

export default function Navbar({ user, onNavigate }) {
  const dispatch = useDispatch();

  const doLogout = async () => {
    await dispatch(logout());
    onNavigate('login');
  };

  return (
    <nav className="navbar">
      <div className="brand">SportBet Admin</div>
      <div className="nav-links">
        {user ? (
          <>
            <NavButton onClick={() => onNavigate('home')}>Home</NavButton>
            <NavButton onClick={() => onNavigate('users')}>Users</NavButton>
            <NavButton onClick={() => onNavigate('bets')}>Bets</NavButton>
            <NavButton onClick={() => onNavigate('deposits')}>Deposits</NavButton>
            <NavButton onClick={() => onNavigate('withdrawals')}>Withdrawals</NavButton>
            <NavButton onClick={() => onNavigate('balances')}>Balances</NavButton>
            <NavButton onClick={doLogout}>Logout</NavButton>
          </>
        ) : (
          <>
            <NavButton onClick={() => onNavigate('login')}>Login</NavButton>
            <NavButton onClick={() => onNavigate('register')}>Register</NavButton>
          </>
        )}
      </div>
    </nav>
  );
}
