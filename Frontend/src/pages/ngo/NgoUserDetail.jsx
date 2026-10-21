import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchUserById, toggleUserStatus } from '../../services/userService';
import DonationImage from '../../components/DonationImage';

export default function NgoUserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusUpdating, setStatusUpdating] = useState(false);

  useEffect(() => {
    fetchUserById(id)
      .then((res) => setData(res.data))
      .catch((err) => setError(err.response?.data?.message || err.message))
      .finally(() => setLoading(false));
  }, [id]);

  // Option B: Suspend / Reactivate Status Handler
  const handleToggleUserStatus = async () => {
    if (!data?.user) return;
    const isCurrentlyActive = (data.user.status || 'ACTIVE').toUpperCase() === 'ACTIVE';
    const targetStatus = isCurrentlyActive ? 'SUSPENDED' : 'ACTIVE';
    const actionText = isCurrentlyActive ? 'suspend' : 'reactivate';

    const confirmed = window.confirm(
      `Are you sure you want to ${actionText} donor "${data.user.name}"?`
    );
    if (!confirmed) return;

    try {
      setStatusUpdating(true);
      await toggleUserStatus(data.user._id, targetStatus);
      setData((prev) => ({
        ...prev,
        user: { ...prev.user, status: targetStatus }
      }));
    } catch (err) {
      alert(err.response?.data?.message || `Failed to ${actionText} user`);
    } finally {
      setStatusUpdating(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
      case 'Distributed':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Accepted':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Rejected':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Sent for Recycling':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const user = data?.user;
  const donations = data?.donations || [];

  // Filter donations search
  const filteredDonations = useMemo(() => {
    return donations.filter((item) => {
      const title = item.deviceDetails?.deviceName || item.deviceDetails?.deviceType || item.title || '';
      const brand = item.deviceDetails?.brand || '';
      const code = item.donationId || '';
      const status = item.status || '';

      const query = searchTerm.toLowerCase();
      return (
        title.toLowerCase().includes(query) ||
        brand.toLowerCase().includes(query) ||
        code.toLowerCase().includes(query) ||
        status.toLowerCase().includes(query)
      );
    });
  }, [donations, searchTerm]);

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-medium text-gray-500">Loading donor profile...</p>
      </div>
    );
  }

  if (error || !data || !user) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-sm">
          {error || 'Donor profile not found.'}
        </div>
        <button
          onClick={() => navigate('/account/users')}
          className="mt-4 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
        >
          ← Return to Donor Directory
        </button>
      </div>
    );
  }

  const isSuspended = (user.status || 'ACTIVE').toUpperCase() === 'SUSPENDED';

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Action Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/account/users')}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-600 hover:text-emerald-700 transition"
        >
          <span className="text-base">←</span> Back to Donor Directory
        </button>

        {/* Suspend / Reactivate Option B Button */}
        <button
          onClick={handleToggleUserStatus}
          disabled={statusUpdating}
          className={`px-4 py-2 rounded-xl text-xs font-bold border transition shadow-sm flex items-center gap-1.5 disabled:opacity-50 ${
            isSuspended
              ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-300'
              : 'bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-300'
          }`}
        >
          {statusUpdating
            ? 'Updating...'
            : isSuspended
            ? '✓ Reactivate Account'
            : '🚫 Suspend Account'}
        </button>
      </div>

      {/* Main Donor Profile Card */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden">
        <div className="h-2.5 bg-gradient-to-r from-[#054425] via-emerald-600 to-teal-500" />

        <div className="p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#054425] text-white font-black text-2xl flex items-center justify-center shadow-md uppercase">
              {user.name ? user.name.charAt(0) : 'U'}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-black text-gray-900 tracking-tight">{user.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {user.role}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5 font-mono">ID: {user._id}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="px-5 py-3 rounded-xl bg-gray-50 border border-gray-200/80 text-center flex-1 md:flex-none min-w-[120px]">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Donations</div>
              <div className="text-2xl font-black text-emerald-700 mt-0.5">{donations.length}</div>
            </div>
            <div className="px-5 py-3 rounded-xl bg-gray-50 border border-gray-200/80 text-center flex-1 md:flex-none min-w-[120px]">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</div>
              <div
                className={`text-sm font-black mt-1 uppercase tracking-wide ${
                  isSuspended ? 'text-rose-600' : 'text-emerald-700'
                }`}
              >
                {user.status || 'ACTIVE'}
              </div>
            </div>
          </div>
        </div>

        {/* User Meta Information */}
        <div className="border-t border-gray-100 bg-gray-50/50 px-6 md:px-8 py-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-xs font-semibold text-gray-400 block uppercase">Email</span>
            <span className="font-medium text-gray-800 break-all">{user.email}</span>
          </div>
          <div>
            <span className="text-xs font-semibold text-gray-400 block uppercase">Phone</span>
            <span className="font-medium text-gray-800">{user.phone || 'Not provided'}</span>
          </div>
          <div>
            <span className="text-xs font-semibold text-gray-400 block uppercase">Address</span>
            <span className="font-medium text-gray-800">{user.address || 'Not provided'}</span>
          </div>
        </div>
      </div>

      {/* Donation History with Search */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-gray-900 tracking-tight">
              Donation Records ({filteredDonations.length})
            </h2>
            <span className="text-xs text-gray-500">Filter donation items below</span>
          </div>

          <div className="relative min-w-[240px]">
            <input
              type="text"
              placeholder="Search donations by device, code, status..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-4 py-1.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
            />
            <span className="absolute left-2.5 top-2 text-gray-400 text-xs">🔍</span>
          </div>
        </div>

        {filteredDonations.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center text-gray-500">
            {donations.length === 0
              ? 'No donation items submitted by this donor yet.'
              : 'No donations match your search filter.'}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredDonations.map((item) => {
              const details = item.deviceDetails || {};
              const title = details.deviceName || details.deviceType || item.title || 'E-Waste Item';
              const isAiChecked = item.aiVerification?.verified;

              return (
                <div
                  key={item._id}
                  className="bg-white rounded-xl border border-gray-200/80 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    {/* Unified Image Component with Automatic Fallback */}
                    <DonationImage item={item} className="w-16 h-16" />

                    {/* Specifications */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-gray-900 text-base">{title}</h3>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusBadge(item.status)}`}>
                          {item.status}
                        </span>
                        {isAiChecked && (
                          <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                            ✓ AI Verified
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-gray-500 line-clamp-1">
                        {details.brand && details.brand !== 'Unspecified' ? `${details.brand} • ` : ''}
                        {details.model && details.model !== 'Standard' ? `${details.model} • ` : ''}
                        Condition: <span className="font-medium text-gray-700">{item.condition || 'Standard'}</span>
                        {details.quantity ? ` • Qty: ${details.quantity}` : ''}
                      </p>

                      <div className="flex items-center gap-3 text-xs text-gray-400 pt-0.5">
                        <span>Submitted: {new Date(item.createdAt).toLocaleDateString()}</span>
                        {item.pickupDate && <span>• Pickup: {item.pickupDate}</span>}
                      </div>
                    </div>
                  </div>

                  {/* Tracking ID & City */}
                  <div className="flex md:flex-col items-center md:items-end justify-between border-t md:border-t-0 pt-3 md:pt-0 border-gray-100 text-xs text-gray-500">
                    <span className="font-mono bg-gray-100 px-2 py-1 rounded text-[11px] text-gray-600 font-semibold">
                      {item.donationId || item._id?.slice(-8)}
                    </span>
                    <span className="mt-1 text-gray-400">
                      {item.city || 'Mumbai'} {item.pincode ? `(${item.pincode})` : ''}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}