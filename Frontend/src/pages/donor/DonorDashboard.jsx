import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import { StatusBadge } from '../../components/StatusBadge';
import { PackageCheck, Clock, CheckCircle2, PlusCircle } from 'lucide-react';

export const DonorDashboard = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await api.get('/donations');
        setDonations(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDonations();
  }, []);

  const total = donations.length;
  const pending = donations.filter(d => ['Submitted', 'Accepted'].includes(d.status)).length;
  const completed = donations.filter(d => ['Distributed', 'Sent for Recycling', 'Completed'].includes(d.status)).length;

  if (loading) return <div className="p-8 text-center text-gray-500">Loading donor metrics...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Donor Dashboard</h1>
          <p className="text-sm text-gray-500">Track and manage your submitted electronics</p>
        </div>
        <Link
          to="/account/donate"
          className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-emerald-700 shadow-sm"
        >
          <PlusCircle className="h-4 w-4" />
          Donate E-Waste
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-gray-200 flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <PackageCheck className="h-6 w-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-gray-900">{total}</div>
            <div className="text-xs text-gray-500 font-medium">Total Submitted</div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-200 flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <Clock className="h-6 w-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-gray-900">{pending}</div>
            <div className="text-xs text-gray-500 font-medium">Under Processing</div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-200 flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-gray-900">{completed}</div>
            <div className="text-xs text-gray-500 font-medium">Completed Lifecycle</div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-base font-bold text-gray-900">Recent Activity</h2>
          <Link to="/account/my-donations" className="text-xs font-semibold text-emerald-600 hover:underline">
            View All Donations →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-700 uppercase font-semibold text-xs border-b">
              <tr>
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Device</th>
                <th className="px-6 py-3">Condition</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {donations.slice(0, 5).map((d) => (
                <tr key={d._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-mono font-medium text-gray-900">{d.donationId}</td>
                  <td className="px-6 py-4 font-semibold text-gray-800">{d.deviceDetails.deviceType} ({d.deviceDetails.quantity}x)</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                      d.condition === 'Functional' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                    }`}>
                      {d.condition}
                    </span>
                  </td>
                  <td className="px-6 py-4"><StatusBadge status={d.status} /></td>
                  <td className="px-6 py-4 text-xs">{new Date(d.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
              {donations.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-gray-400">No donations yet. Click "Donate E-Waste" above to begin.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};