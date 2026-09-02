import React from 'react';
import './ContentPages.css';

export default function Contact({ navigate }) {
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
        <h1>Contact Us</h1>
        <p>If you have any questions, feedback, or inquiries, please feel free to reach out to us.</p>
        <p>You can contact us at:</p>
        <p><strong>Email:</strong> info@edonationhub.org</p>
        <p><strong>Phone:</strong> +91 8591697342</p>
        <button onClick={() => navigate('home')} className="content-back-btn">
          Go Back Home
        </button>
      </div>
    </div>
  );
}