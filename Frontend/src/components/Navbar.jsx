import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const getAccountStartUrl = () => {
    if (!user) return '/login';
    if (user.role === 'DONOR') return '/account/dashboard';
    if (user.role === 'NGO') return '/account/available-donations';
    if (user.role === 'ADMIN') return '/account/ngo-requests';
    return '/';
  };

  const navLinkClass = ({ isActive }) =>
    `text-sm font-semibold transition-colors ${
      isActive ? 'text-emerald-600 font-bold' : 'text-gray-600 hover:text-emerald-600'
    }`;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Brand Logo Image */}
          <Link to="/" className="flex items-center">
            <img 
              src="/logo.png" 
              alt="eDonationHUB" 
              className="h-9 w-auto object-contain hover:opacity-90 transition-opacity" 
            />
          </Link>

          {/* Navigation Links */}
          <nav className="flex items-center gap-6">
            <NavLink to="/" className={navLinkClass}>Home</NavLink>
            <NavLink to="/impact" className={navLinkClass}>Impact</NavLink>
            <NavLink to="/about" className={navLinkClass}>About</NavLink>
            <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>

            {/* Authentication Buttons */}
            {!user ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-emerald-600 font-semibold text-sm px-3 py-1.5"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm transition"
                >
                  Register
                </Link>
              </div>
            ) : (
              <button
                onClick={() => navigate(getAccountStartUrl())}
                className="flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100 font-bold text-sm px-4 py-2 rounded-lg transition"
              >
                <img src="/logo-icon.png" alt="Portal" className="h-4 w-4 object-contain" />
                <span>Account</span>
                <span className="bg-emerald-600 text-white text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full">
                  {user.role}
                </span>
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};