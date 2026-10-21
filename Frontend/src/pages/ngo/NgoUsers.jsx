import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUsers, toggleUserStatus } from '../../services/userService';

export default function NgoUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [processingId, setProcessingId] = useState(null);
  const navigate = useNavigate();

  const loadUsers = () => {
    setLoading(true);
    fetchUsers()
      .then((res) => {
        const userList = res?.data || res || [];
        setUsers(Array.isArray(userList) ? userList : []);
      })
      .catch((err) => {
        console.error('Failed to load users:', err);
        setError(err.response?.data?.message || err.message);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Handle Option B: Suspend / Reactivate Status Toggle
  const handleToggleStatus = async (user) => {
    const isCurrentlyActive = user.status === 'ACTIVE';
    const targetStatus = isCurrentlyActive ? 'SUSPENDED' : 'ACTIVE';
    const actionText = isCurrentlyActive ? 'suspend' : 'reactivate';

    const confirmed = window.confirm(
      `Are you sure you want to ${actionText} "${user.name}" (${user.email})?`
    );
    if (!confirmed) return;

    try {
      setProcessingId(user._id);
      await toggleUserStatus(user._id, targetStatus);
      // Immediately reflect state change in table
      setUsers((prev) =>
        prev.map((u) => (u._id === user._id ? { ...u, status: targetStatus } : u))
      );
    } catch (err) {
      alert(err.response?.data?.message || `Failed to ${actionText} user`);
    } finally {
      setProcessingId(null);
    }
  };

  // Search & Multi-Filter Logic
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const query = searchTerm.toLowerCase();
      const matchesSearch =
        (u.name || '').toLowerCase().includes(query) ||
        (u.email || '').toLowerCase().includes(query);

      const matchesRole = roleFilter === 'ALL' || (u.role || '').toUpperCase() === roleFilter;
      const matchesStatus =
        statusFilter === 'ALL' ||
        (u.status || 'ACTIVE').toUpperCase() === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchTerm, roleFilter, statusFilter]);

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-medium text-gray-500">Loading registered users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-sm">
        Error loading users: {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Registered Users</h1>
          <p className="text-sm text-gray-500">
            Showing <span className="font-semibold text-emerald-700">{filteredUsers.length}</span> of {users.length} total users
          </p>
        </div>

        {/* Search & Dropdown Filters */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative min-w-[220px]">
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
            />
            <span className="absolute left-3 top-2.5 text-gray-400 text-xs">🔍</span>
          </div>

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
          >
            <option value="ALL">All Roles</option>
            <option value="DONOR">Donors</option>
            <option value="NGO">NGOs</option>
            {/* <option value="ADMIN">Admins</option> */}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
          >
            <option value="ALL">All Statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="SUSPENDED">Suspended</option>
            <option value="PENDING">Pending</option>
          </select>
        </div>
      </div>

      {filteredUsers.length === 0 ? (
        <div className="p-12 text-center bg-white border border-gray-200 rounded-2xl text-gray-500">
          No users match your criteria.
        </div>
      ) : (
        <div className="overflow-hidden bg-white border border-gray-200 rounded-2xl shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-[#054425] text-white uppercase text-xs tracking-wider">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Joined Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredUsers.map((u) => {
                  const isSuspended = (u.status || 'ACTIVE').toUpperCase() === 'SUSPENDED';

                  return (
                    <tr key={u._id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="px-6 py-4 font-semibold text-gray-900">
                        {u.name}
                      </td>
                      <td className="px-6 py-4 text-gray-600">{u.email}</td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {u.role || 'USER'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider border ${
                            isSuspended
                              ? 'bg-rose-50 text-rose-700 border-rose-200'
                              : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          }`}
                        >
                          {u.status || 'ACTIVE'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                        {new Date(u.createdAt || Date.now()).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="inline-flex items-center gap-2 justify-end">
                          <button
                            onClick={() => navigate(`/account/users/${u._id}`)}
                            className="px-3 py-1.5 bg-[#054425] hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-sm transition"
                          >
                            View Details
                          </button>

                          <button
                            onClick={() => handleToggleStatus(u)}
                            disabled={processingId === u._id}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition disabled:opacity-50 ${
                              isSuspended
                                ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-300'
                                : 'bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-300'
                            }`}
                          >
                            {processingId === u._id
                              ? 'Updating...'
                              : isSuspended
                              ? 'Reactivate'
                              : 'Suspend'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}