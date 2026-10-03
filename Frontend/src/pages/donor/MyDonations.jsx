import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { StatusBadge } from '../../components/StatusBadge';
import { ShieldCheck, AlertCircle } from 'lucide-react';

export const MyDonations = () => {
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

  if (loading) return <div className="p-8 text-center text-gray-500">Loading donation records...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Donations</h1>
        <p className="text-sm text-gray-500">Complete log of all devices submitted with live tracking status</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-700 uppercase font-semibold text-xs border-b">
              <tr>
                <th className="px-6 py-3.5">Donation ID</th>
                <th className="px-6 py-3.5">Device Type</th>
                <th className="px-6 py-3.5">Condition</th>
                <th className="px-6 py-3.5">AI Photo Verdict</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5">Resolution Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {donations.map((d) => (
                <tr key={d._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-mono font-bold text-gray-900">{d.donationId}</td>
                  <td className="px-6 py-4 font-semibold text-gray-800">
                    {d.deviceDetails.deviceType} ({d.deviceDetails.quantity} unit)
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                      d.condition === 'Functional' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                    }`}>
                      {d.condition}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs">
                    {d.aiVerification?.verdict ? (
                      <span className={`inline-flex items-center gap-1 font-medium ${
                        d.aiVerification.isAiOrAltered ? 'text-amber-600' : 'text-emerald-600'
                      }`}>
                        {d.aiVerification.isAiOrAltered ? <AlertCircle className="h-3.5 w-3.5" /> : <ShieldCheck className="h-3.5 w-3.5" />}
                        {d.aiVerification.verdict}
                      </span>
                    ) : (
                      <span className="text-gray-400">Standard Upload</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={d.status} />
                  </td>
                  <td className="px-6 py-4 text-xs italic text-gray-500">
                    {d.resolutionNotes || 'Awaiting NGO processing.'}
                  </td>
                </tr>
              ))}
              {donations.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-10 text-gray-400">
                    No submitted donations found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};