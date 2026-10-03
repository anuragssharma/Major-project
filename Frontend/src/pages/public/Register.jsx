import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/axios';

export const Register = () => {
  const [role, setRole] = useState('DONOR');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    ngoName: '',
    registrationNumber: ''
  });
  const [documentFile, setDocumentFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('password', formData.password);
      data.append('phone', formData.phone);
      data.append('address', formData.address);
      data.append('role', role);

      if (role === 'NGO') {
        data.append('ngoData', JSON.stringify({
          ngoName: formData.ngoName || formData.name,
          registrationNumber: formData.registrationNumber
        }));
        if (documentFile) {
          data.append('document', documentFile);
        }
      }

      const res = await api.post('/auth/register', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setSuccess(res.data.message);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div className="py-12 px-4 flex justify-center">
      <div className="max-w-xl w-full border border-gray-200 bg-white p-8 rounded-2xl shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 text-center">Create an Account</h2>
        <p className="text-sm text-gray-500 text-center mt-1">Join the eDonationHUB sustainable electronics network</p>

        {error && (
          <div className="mt-4 p-3 bg-red-50 text-red-700 text-sm rounded-xl border border-red-200">
            {error}
          </div>
        )}
        {success && (
          <div className="mt-4 p-3 bg-emerald-50 text-emerald-800 text-sm rounded-xl border border-emerald-200">
            {success}
          </div>
        )}

        <div className="mt-6 flex gap-4">
          <button
            type="button"
            onClick={() => setRole('DONOR')}
            className={`flex-1 py-2.5 text-sm font-bold rounded-xl border transition ${
              role === 'DONOR'
                ? 'bg-emerald-50 text-emerald-700 border-emerald-500'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            Donor Account
          </button>
          <button
            type="button"
            onClick={() => setRole('NGO')}
            className={`flex-1 py-2.5 text-sm font-bold rounded-xl border transition ${
              role === 'NGO'
                ? 'bg-emerald-50 text-emerald-700 border-emerald-500'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            NGO Partner Account
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name / Official Contact</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Contact Phone</label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Physical Address</label>
            <textarea
              name="address"
              required
              rows="2"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {role === 'NGO' && (
            <div className="pt-4 border-t space-y-4">
              <h3 className="text-sm font-bold text-gray-900">NGO Verification Details</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700">Organization Legal Name</label>
                <input
                  type="text"
                  name="ngoName"
                  required
                  value={formData.ngoName}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-xl px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">NGO Registration Number</label>
                <input
                  type="text"
                  name="registrationNumber"
                  required
                  value={formData.registrationNumber}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-xl px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Registration Certificate (PDF or Image)</label>
                <input
                  type="file"
                  onChange={(e) => setDocumentFile(e.target.files[0])}
                  className="mt-1 w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-2.5 rounded-xl font-bold hover:bg-emerald-700 transition"
          >
            {role === 'NGO' ? 'Submit NGO Application' : 'Register as Donor'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already registered?{' '}
          <Link to="/login" className="text-emerald-600 font-bold hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};