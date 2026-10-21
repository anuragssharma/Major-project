import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import DonationImage from '../../components/DonationImage';
import { ShieldCheck, AlertCircle, Clock, Truck, CheckCircle, HeartHandshake } from 'lucide-react';

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

  // Donor-friendly status banner
  const getDonorStatus = (status, condition) => {
    switch (status) {
      case 'Submitted':
        return {
          label: 'Request Submitted',
          desc: 'Awaiting NGO pickup scheduling',
          color: 'bg-gray-100 text-gray-700 border-gray-200'
        };
      case 'Pickup Scheduled':
        return {
          label: 'Pickup Scheduled',
          desc: 'Courier/Team is scheduled for collection',
          color: 'bg-blue-50 text-blue-700 border-blue-200'
        };
      case 'Received':
        return {
          label: 'Received by NGO',
          desc: `Physical inspection verified (${condition})`,
          color: 'bg-teal-50 text-teal-700 border-teal-200'
        };
      case 'Distributed':
      case 'Sent for Recycling':
      case 'Completed':
        return {
          label: condition === 'Functional' ? 'Donated' : 'Safely Recycled',
          desc: 'Hardware cycle finalized',
          color: 'bg-emerald-50 text-emerald-800 border-emerald-200'
        };
      case 'Rejected':
        return {
          label: 'Rejected',
          desc: 'Device did not meet acceptance criteria',
          color: 'bg-rose-50 text-rose-700 border-rose-200'
        };
      default:
        return {
          label: status,
          desc: '',
          color: 'bg-gray-50 text-gray-700 border-gray-200'
        };
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Loading donation records...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Donations</h1>
        <p className="text-sm text-gray-500">Live milestone tracking of your submitted electronic hardware</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-[#054425] text-white uppercase font-semibold text-xs border-b">
              <tr>
                <th className="px-6 py-3.5">Device</th>
                <th className="px-6 py-3.5">Tracking ID</th>
                <th className="px-6 py-3.5">Verified Condition</th>
                <th className="px-6 py-3.5">Live Lifecycle Stage</th>
                <th className="px-6 py-3.5">AI Photo Audit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {donations.map((d) => {
                const stage = getDonorStatus(d.status, d.condition);

                return (
                  <tr key={d._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <DonationImage item={d} className="w-12 h-12" />
                      <div>
                        <div className="font-bold text-gray-900">{d.deviceDetails?.deviceType || d.title}</div>
                        <div className="text-xs text-gray-400">Qty: {d.deviceDetails?.quantity || 1} unit(s)</div>
                      </div>
                    </td>

                    <td className="px-6 py-4 font-mono font-bold text-gray-900">{d.donationId}</td>

                    <td className="px-6 py-4">
                      <span
                        className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                          d.condition === 'Functional'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}
                      >
                        {d.condition}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="space-y-0.5">
                        <span className={`inline-block px-2.5 py-0.5 text-xs font-bold rounded-md border ${stage.color}`}>
                          {stage.label}
                        </span>
                        <div className="text-[11px] text-gray-400">{stage.desc}</div>
                      </div>
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
                  </tr>
                );
              })}
              {donations.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-10 text-gray-400">
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