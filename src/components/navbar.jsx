import React from 'react';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-logo">eDonationHub</div>
      <ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#overview">Overview</a></li>
        <li><a href="#process">Process</a></li>
        <li><a href="#contact">Contact us</a></li>
      </ul>
    </nav>
  );
}