import React from 'react';
import './ContentPages.css';

export default function About({ navigate }) {
  return (
    <div className="content-page-wrapper">
      <nav className="content-navbar">
        <div className="content-nav-logo">♻ eDonationHub</div>
        <div className="content-nav-links">
          <button onClick={() => navigate('home')} className="content-nav-item">Home</button>
          <button onClick={() => navigate('about')} className="content-nav-item">About Us</button>
          <button onClick={() => navigate('impact')} className="content-nav-item">Our Impact</button>
          <button onClick={() => navigate('contact')} className="content-nav-item">Contact Us</button>
          <button onClick={() => navigate('login')} className="content-nav-item">Sign In</button>
        </div>
      </nav>

      <div className="content-main">
        <h1>About Us</h1>
        <p>
          eDonationHub is a web-based platform designed to make electronic-item donation simple, 
          transparent, and environmentally responsible. Our platform connects donors, NGOs, beneficiaries, 
          and recycling organizations in one structured system. Users can donate unused or old electronic 
          devices by providing item details, condition, and images.
        </p>
        <button onClick={() => navigate('home')} className="content-back-btn">
          Go Back Home
        </button>
      </div>
    </div>
  );
}