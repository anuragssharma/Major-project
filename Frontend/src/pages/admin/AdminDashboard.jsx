import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { StatusBadge } from '../../components/StatusBadge';
import { Users, Building2, AlertCircle, Cpu } from 'lucide-react';

export const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [pendingNgos, setPendingNgos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rejectionModal, setRejectionModal] = useState({ open: false, ngoId: '', reason: '' });

  const loadData = async () => {
    try {
      const [statsRes, reqsRes] = await Promise.all([
        api.get('/admin/stats'),
        api.get('/ngos/requests')
      ]);
      setStats(statsRes.data);
      setPendingNgos(reqsRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleApprove = async (ngoId) => {
    try {
      await api.patch(`/ngos/${ngoId}/approve`);
      loadData();
    } catch (err) {
      alert('Error approving NGO');
    }
  };

  const handleReject = async () => {
    try {
      await api.patch(`/ngos/${rejectionModal.ngoId}/reject`, {
        rejectionReason: rejectionModal.reason
      });
      setRejectionModal({ open: false, ngoId: '', reason: '' });
      loadData();
    } catch (err) {
      alert('Error rejecting NGO');
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Loading Admin metrics...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">NGO Verification Requests</h1>
        <p className="text-sm text-gray-500">Review pending non-profit registrations and approve platform access</p>
      </div>

      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border flex items-center gap-4">
            <Users className="h-8 w-8 text-blue-600" />
            <div>
              <div className="text-2xl font-black text-gray-900">{stats.totalUsers}</div>
              <div className="text-xs text-gray-500">Registered Accounts</div>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border flex items-center gap-4">
            <Building2 className="h-8 w-8 text-teal-600" />
            <div>
              <div className="text-2xl font-black text-gray-900">{stats.totalNgos}</div>
              <div className="text-xs text-gray-500">NGO Partners</div>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border flex items-center gap-4">
            <AlertCircle className="h-8 w-8 text-amber-500" />
            <div>
              <div className="text-2xl font-black text-amber-600">{stats.pendingNgos}</div>
              <div className="text-xs text-gray-500">Pending Approvals</div>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border flex items-center gap-4">
            <Cpu className="h-8 w-8 text-emerald-600" />
            <div>
              <div className="text-2xl font-black text-gray-900">{stats.totalDonations}</div>
              <div className="text-xs text-gray-500">Total Donated Items</div>
            </div>
          </div>
        </div>
      )}

      {/* Pending NGO Approvals Table */}
      <div className="bg-white border rounded-2xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b">
          <h2 className="text-base font-bold text-gray-900">Pending Authorization Queue</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-700 text-xs uppercase font-semibold">
              <tr>
                <th className="px-6 py-3.5">NGO Name</th>
                <th className="px-6 py-3.5">Registration Number</th>
                <th className="px-6 py-3.5">Official Contact</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {pendingNgos.map((ngo) => (
                <tr key={ngo._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-bold text-gray-900">{ngo.ngoName}</td>
                  <td className="px-6 py-4 font-mono text-xs">{ngo.registrationNumber}</td>
                  <td className="px-6 py-4">
                    <div>{ngo.contactPerson}</div>
                    <div className="text-xs text-gray-400">{ngo.contactEmail} | {ngo.contactPhone}</div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={ngo.approvalStatus} />
                  </td>
                  <td className="px-6 py-4 space-x-2">
                    <button
                      onClick={() => handleApprove(ngo._id)}
                      className="bg-emerald-600 text-white text-xs px-3 py-1.5 rounded-lg font-bold hover:bg-emerald-700"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => setRejectionModal({ open: true, ngoId: ngo._id, reason: '' })}
                      className="bg-red-600 text-white text-xs px-3 py-1.5 rounded-lg font-bold hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
              {pendingNgos.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-gray-400">No NGOs awaiting approval.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Rejection Modal */}
      {rejectionModal.open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl">
            <h3 className="text-lg font-bold text-gray-900">Reject NGO Registration</h3>
            <p className="text-xs text-gray-500">Provide the non-profit administrator with specific cause for registration denial.</p>
            <textarea
              rows="3"
              className="w-full border rounded-xl p-2.5 text-sm"
              placeholder="e.g. Unverified registration number or incomplete certificate."
              value={rejectionModal.reason}
              onChange={(e) => setRejectionModal({ ...rejectionModal, reason: e.target.value })}
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setRejectionModal({ open: false, ngoId: '', reason: '' })}
                className="px-4 py-2 border rounded-xl text-sm text-gray-700 font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                className="px-4 py-2 bg-red-600 text-white rounded-xl text-sm font-bold hover:bg-red-700"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};