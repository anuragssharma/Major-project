import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const user = await login(email, password);
      if (user.role === 'DONOR') navigate('/account/dashboard');
      else if (user.role === 'NGO') navigate('/account/available-donations');
      else if (user.role === 'ADMIN') navigate('/account/ngo-requests');
      else navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check credentials.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full border border-gray-200 bg-white p-8 rounded-3xl shadow-sm">
        
        {/* Real Brand Logo */}
        <div className="flex justify-center mb-4">
          <img src="/logo.png" alt="eDonationHUB" className="h-10 w-auto object-contain" />
        </div>

        <p className="text-sm text-gray-500 text-center">Access your role-based account workspace</p>

        {error && (
          <div className="mt-4 p-3 bg-red-50 text-red-700 text-sm rounded-xl border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-emerald-500 focus:outline-none text-sm"
              placeholder="name@example.com"
            />
          </div>
          <div>
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <button
                type="button"
                onClick={() => alert("Please contact support at ops@edonationhub.com to reset credentials.")}
                className="text-xs text-emerald-600 hover:underline"
              >
                Forgot password?
              </button>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-emerald-500 focus:outline-none text-sm"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-2.5 rounded-xl font-semibold hover:bg-emerald-700 transition"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-emerald-600 font-bold hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};