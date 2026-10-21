import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const NgoLayout = () => {
  const { user, logout } = useAuth();

  const navItems = [
    { label: 'Available Donations', path: '/account/available-donations' },
    { label: 'My Requests', path: '/account/my-requests' },
    { label: 'Manage Donors / Users', path: '/account/users' },
    { label: 'Make a Donation', path: '/account/donate' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-200 bg-white p-5 flex flex-col justify-between">
        <div>
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900">NGO Workspace</h2>
            <p className="text-xs text-gray-500">{user?.name || 'NGO Partner'}</p>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <button
          onClick={logout}
          className="w-full mt-6 py-2 px-3 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition text-center"
        >
          Sign Out
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default NgoLayout;