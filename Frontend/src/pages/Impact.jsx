import React from 'react';
import './ContentPages.css';

export default function Impact({ navigate }) {
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
        <h1>Our Impact</h1>
        <p>
          eDonationHub has made a significant impact in the field of electronic-item donation and recycling.
        </p>
        <p>
          Through our partnerships with NGOs and recycling organizations, we have helped reduce electronic waste in landfills.
        </p>
        <p>
          We are proud of the positive change we have brought to communities and the environment.
        </p>
        <button onClick={() => navigate('home')} className="content-back-btn">
          Go Back Home
        </button>
      </div>
    </div>
  );
}