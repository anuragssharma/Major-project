import './Home.css';
export default function Home({ navigate }) {
  return (
    <div className="home-wrapper">
      <nav className="home-navbar">
        <div className="nav-logo">♻ eDonationHub</div>
        <div className="nav-links">
          <button onClick={() => navigate('home')} className="nav-item">Home</button>
          <button onClick={() => navigate('about')} className="nav-item">About Us</button>
          <button onClick={() => navigate('impact')} className="nav-item">Our Impact</button>
          <button onClick={() => navigate('contact')} className="nav-item">Contact Us</button>
          <button onClick={() => navigate('login')} className="nav-item">Sign In</button>
        </div>
      </nav>
      {/* Hero Content */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>Give Your E-Waste a Second Life</h1>
          <p>Safely donate electronic devices and support local NGOs.</p>
          <button onClick={() => navigate('login')} className="hero-btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
}