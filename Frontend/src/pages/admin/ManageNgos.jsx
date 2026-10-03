import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { StatusBadge } from '../../components/StatusBadge';
import { Trash2, Search, X } from 'lucide-react';

export const ManageNGOs = () => {
  const [ngos, setNgos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchNgos = async () => {
    try {
      const res = await api.get('/admin/ngos');
      setNgos(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNgos();
  }, []);

  const handleDeleteNgo = async (ngoId, ngoName) => {
    const confirmed = window.confirm(
      `Are you sure you want to permanently delete NGO "${ngoName}"? This will also remove their login credentials and re-open assigned donations.`
    );
    if (!confirmed) return;

    try {
      await api.delete(`/admin/ngos/${ngoId}`);
      setNgos(ngos.filter((n) => n._id !== ngoId));
      alert('NGO deleted successfully.');
    } catch (err) {
      alert(err.response?.data?.message || 'Error deleting NGO.');
    }
  };

  // Instant real-time search filter
  const filteredNgos = ngos.filter((ngo) => {
    const term = searchQuery.toLowerCase();
    const nameMatch = ngo.ngoName?.toLowerCase().includes(term);
    const regMatch = ngo.registrationNumber?.toLowerCase().includes(term);
    const contactMatch = ngo.contactPerson?.toLowerCase().includes(term);
    const emailMatch = ngo.contactEmail?.toLowerCase().includes(term);
    return nameMatch || regMatch || contactMatch || emailMatch;
  });

  if (loading) return <div className="p-8 text-center text-gray-500">Loading NGO directory...</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage NGOs</h1>
          <p className="text-sm text-gray-500">Directory of registered non-profit organizations</p>
        </div>

        {/* Real-Time Search Bar */}
        <div className="relative w-full sm:w-72">
          <Search className="h-4 w-4 text-gray-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search NGO name, reg no, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-8 py-2 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-2.5 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div className="bg-white border rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-700 text-xs uppercase font-semibold">
              <tr>
                <th className="px-6 py-3.5">Organization</th>
                <th className="px-6 py-3.5">Registration</th>
                <th className="px-6 py-3.5">Contact Person</th>
                <th className="px-6 py-3.5">Approval Status</th>
                <th className="px-6 py-3.5">Joined Date</th>
                <th className="px-6 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredNgos.map((ngo) => (
                <tr key={ngo._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900">{ngo.ngoName}</td>
                  <td className="px-6 py-4 font-mono text-xs">{ngo.registrationNumber}</td>
                  <td className="px-6 py-4">
                    <div>{ngo.contactPerson}</div>
                    <div className="text-xs text-gray-400">{ngo.contactEmail}</div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={ngo.approvalStatus} />
                  </td>
                  <td className="px-6 py-4 text-xs">{new Date(ngo.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDeleteNgo(ngo._id, ngo.ngoName)}
                      className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition"
                      title="Delete NGO Profile"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredNgos.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-gray-400">
                    {searchQuery ? `No NGOs found matching "${searchQuery}"` : 'No NGOs registered.'}
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