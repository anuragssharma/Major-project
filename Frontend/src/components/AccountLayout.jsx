import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const AccountLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const linkClass = ({ isActive }) =>
    `text-sm font-semibold transition-all px-3 py-1.5 rounded-md ${
      isActive
        ? 'text-white font-medium bg-emerald-600 shadow-md shadow-emerald-600/20'
        : 'text-white hover:text-white hover:bg-[#032e19]/60'
    }`;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      <header className="bg-[#054425] text-white px-4 md:px-8 py-3.5 border-b border-[#04331c] shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <NavLink to="/" className="flex items-center gap-2.5 group">
              <img 
                src="/logo-icon.png" 
                alt="eDonationHUB Icon" 
                className="h-7 w-7 object-contain bg-white rounded-full p-0.5 group-hover:scale-105 transition-transform" 
              />
              <span className="font-extrabold text-lg text-white tracking-tight">
                eDonation<span className="text-emerald-400">HUB</span>
              </span>
            </NavLink>
            <span className="hidden sm:inline-block bg-[#032e19] text-emerald-300 border border-emerald-600/30 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full">
              {user?.role} Portal
            </span>
          </div>

          <nav className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <NavLink to="/" className={linkClass}>
              Home
            </NavLink>

            {user?.role === 'DONOR' && (
              <>
                <NavLink to="/account/dashboard" className={linkClass}>
                  Dashboard
                </NavLink>
                <NavLink to="/account/donate" className={linkClass}>
                  Donate E-Waste
                </NavLink>
                <NavLink to="/account/my-donations" className={linkClass}>
                  My Donations
                </NavLink>
              </>
            )}

            {user?.role === 'NGO' && (
              <>
                <NavLink to="/account/available-donations" className={linkClass}>
                  Available Donations
                </NavLink>
                <NavLink to="/account/donate" className={linkClass}>
                  Add Donation
                </NavLink>
                <NavLink to="/account/my-requests" className={linkClass}>
                  My Requests
                </NavLink>
              </>
            )}

            {user?.role === 'ADMIN' && (
              <>
                <NavLink to="/account/ngo-requests" className={linkClass}>
                  NGO Requests
                </NavLink>
                <NavLink to="/account/manage-ngos" className={linkClass}>
                  Manage NGOs
                </NavLink>
                <NavLink to="/account/manage-donors" className={linkClass}>
                  Manage Donors
                </NavLink>
                <NavLink to="/account/donations" className={linkClass}>
                  Donations
                </NavLink>
              </>
            )}

            <button
              onClick={handleLogout}
              className="text-sm font-semibold text-rose-300 hover:text-white px-3 py-1.5 rounded-md hover:bg-rose-900/50 transition-colors ml-1"
            >
              Logout
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6">
        <Outlet />
      </main>
    </div>
  );
};