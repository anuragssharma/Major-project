import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/axios';

export const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Enforce numeric-only input and max 10 digits in real-time for phone
    if (name === 'phone') {
      const numericOnly = value.replace(/\D/g, '').slice(0, 10);
      setFormData((prev) => ({ ...prev, [name]: numericOnly }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Explicit validation check for password
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    // Explicit validation check for contact phone length
    if (formData.phone.length !== 10) {
      setError('Contact phone number must be exactly 10 digits.');
      return;
    }

    setLoading(true);

    try {
      const res = await api.post('/auth/register', {
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        role: 'DONOR'
      });

      setSuccess(res.data?.message || 'Registration successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 px-4 flex justify-center">
      <div className="max-w-md w-full border border-gray-200 bg-white p-8 rounded-2xl shadow-sm">
        <div className="text-center">
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">Create Donor Account</h2>
          <p className="text-xs text-gray-500 mt-1">
            Join eDonationHUB to donate unused electronics and support sustainable recycling
          </p>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200 font-medium">
            {error}
          </div>
        )}
        {success && (
          <div className="mt-4 p-3 bg-emerald-50 text-emerald-800 text-xs rounded-xl border border-emerald-200 font-medium">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-xs">
          <div>
            <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              minLength={2}
              maxLength={50}
              placeholder="e.g. John Doe"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="e.g. donor@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              minLength={6}
              placeholder="At least 6 characters"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
              Contact Number
            </label>
            <input
              type="tel"
              name="phone"
              required
              minLength={10}
              maxLength={10}
              pattern="[0-9]{10}"
              title="Please enter a valid 10-digit mobile number"
              placeholder="10-digit mobile number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition font-mono"
            />
            {/* <span className="text-[10px] text-gray-400 mt-0.5 block">
              {formData.phone.length}/10 digits entered
            </span> */}
          </div>

          <div>
            <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
              Pickup Address
            </label>
            <textarea
              name="address"
              required
              rows="2"
              placeholder="Building, Street, Landmark, Area, City..."
              value={formData.address}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#054425] hover:bg-emerald-700 text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition shadow-sm disabled:opacity-50 mt-2"
          >
            {loading ? 'Creating Account...' : 'Register as Donor'}
          </button>
        </form>

        <p className="text-center text-xs text-gray-500 mt-5">
          Already have an account?{' '}
          <Link to="/login" className="text-emerald-700 font-bold hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};