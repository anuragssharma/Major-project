import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { StatusBadge } from '../../components/StatusBadge';
import { ShieldCheck, AlertCircle } from 'lucide-react';

export const AdminDonations = () => {
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

  if (loading) return <div className="p-8 text-center text-gray-500">Loading global donations...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">All Platform Donations</h1>
        <p className="text-sm text-gray-500">Central administrative registry of all hardware donations across all users and NGOs</p>
      </div>

      <div className="bg-white border rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-700 text-xs uppercase font-semibold">
              <tr>
                <th className="px-6 py-3.5">ID</th>
                <th className="px-6 py-3.5">Donor</th>
                <th className="px-6 py-3.5">Device Type</th>
                <th className="px-6 py-3.5">Condition</th>
                <th className="px-6 py-3.5">AI Photo Verdict</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5">Assigned NGO</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {donations.map((d) => (
                <tr key={d._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-mono font-bold text-gray-900">{d.donationId}</td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-900">{d.donor?.name || 'N/A'}</div>
                    <div className="text-xs text-gray-400">{d.donor?.email}</div>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-800">{d.deviceDetails.deviceType} ({d.deviceDetails.quantity}x)</td>
                  <td className="px-6 py-4">{d.condition}</td>
                  <td className="px-6 py-4 text-xs">
                    {d.aiVerification?.verdict ? (
                      <span className={`inline-flex items-center gap-1 font-semibold ${
                        d.aiVerification.isAiOrAltered ? 'text-amber-600' : 'text-emerald-600'
                      }`}>
                        {d.aiVerification.isAiOrAltered ? <AlertCircle className="h-3.5 w-3.5" /> : <ShieldCheck className="h-3.5 w-3.5" />}
                        {d.aiVerification.verdict}
                      </span>
                    ) : (
                      <span className="text-gray-400">Standard</span>
                    )}
                  </td>
                  <td className="px-6 py-4"><StatusBadge status={d.status} /></td>
                  <td className="px-6 py-4 text-xs font-semibold text-gray-700">
                    {d.assignedNgo?.ngoName || 'Unassigned'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};