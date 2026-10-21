import React from 'react';

export const UserTable = ({ users = [], onViewDetails, onInspectModal }) => {
  if (!users.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-8 text-center text-gray-500">
        No users found.
      </div>
    );
  }

  return (
    <div className="overflow-hidden bg-white border border-gray-200 rounded-xl shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 border-b border-gray-200 text-xs font-semibold uppercase tracking-wider text-gray-500">
            <tr>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Contact</th>
              <th className="px-6 py-4">Joined Date</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50/80 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{user.name}</div>
                  <div className="text-xs text-gray-400">ID: {user._id}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>{user.email}</div>
                  <div className="text-xs text-gray-400">{user.phone || 'No phone'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(user.createdAt || Date.now()).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {user.status || 'Active'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                  {onInspectModal && (
                    <button
                      onClick={() => onInspectModal(user)}
                      className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                    >
                      Quick View
                    </button>
                  )}
                  {onViewDetails && (
                    <button
                      onClick={() => onViewDetails(user._id)}
                      className="px-3 py-1.5 text-xs font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition"
                    >
                      Full Profile
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;