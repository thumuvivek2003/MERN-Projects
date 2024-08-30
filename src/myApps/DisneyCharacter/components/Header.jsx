import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <h1>Disney Characters</h1>
      <input type="text" placeholder="Search characters..." className="search-bar" />
      <div className="menu">
        <span>Menu</span>
      </div>
    </header>
  );
}

export default Header;
