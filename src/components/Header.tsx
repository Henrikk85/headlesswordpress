import React from 'react';
import './Header.css';

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartItemCount, onCartClick }) => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <h1>Autopedant</h1>
            <span className="tagline">Car Care Products</span>
          </div>
          <nav className="nav">
            <button className="cart-button" onClick={onCartClick}>
              🛒 Cart ({cartItemCount})
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
