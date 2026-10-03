import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { StatusBadge } from '../../components/StatusBadge';

export const MyRequests = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssigned = async () => {
      try {
        const res = await api.get('/donations');
        // Filter to items accepted or processed by this NGO
        setDonations(res.data.filter(d => ['Accepted', 'Distributed', 'Sent for Recycling', 'Completed'].includes(d.status)));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAssigned();
  }, []);

  if (loading) return <div className="p-8 text-center text-gray-500">Loading active NGO requests...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Processed Requests</h1>
        <p className="text-sm text-gray-500">Track all items accepted into your organization's redistribution or recycling pipeline</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-700 uppercase font-semibold text-xs border-b">
              <tr>
                <th className="px-6 py-3.5">ID</th>
                <th className="px-6 py-3.5">Device</th>
                <th className="px-6 py-3.5">Condition</th>
                <th className="px-6 py-3.5">Current Stage</th>
                <th className="px-6 py-3.5">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {donations.map((d) => (
                <tr key={d._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-mono font-bold text-gray-900">{d.donationId}</td>
                  <td className="px-6 py-4 font-semibold text-gray-800">{d.deviceDetails.deviceType} ({d.deviceDetails.quantity}x)</td>
                  <td className="px-6 py-4">{d.condition}</td>
                  <td className="px-6 py-4"><StatusBadge status={d.status} /></td>
                  <td className="px-6 py-4 text-xs italic">{d.resolutionNotes || '—'}</td>
                </tr>
              ))}
              {donations.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-gray-400">No active processed requests found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};