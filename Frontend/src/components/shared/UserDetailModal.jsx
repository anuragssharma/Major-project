import React, { useEffect, useState } from 'react';
import { fetchUserById } from '../../services/userService';

export const UserDetailModal = ({ userId, isOpen, onClose }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && userId) {
      setLoading(true);
      fetchUserById(userId)
        .then((res) => setData(res.data))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [isOpen, userId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="bg-white border border-gray-200 rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-xl p-6">
        <div className="flex justify-between items-center pb-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Donor Profile</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 text-lg font-semibold px-2 py-1"
          >
            ✕
          </button>
        </div>

        {loading ? (
          <div className="py-12 text-center text-gray-500 text-sm">Loading user details...</div>
        ) : !data ? (
          <div className="py-12 text-center text-red-500 text-sm">Unable to load details.</div>
        ) : (
          <div className="mt-4 space-y-6">
            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100 text-sm">
              <div>
                <span className="text-xs text-gray-500 block">Full Name</span>
                <span className="font-semibold text-gray-800">{data.user.name}</span>
              </div>
              <div>
                <span className="text-xs text-gray-500 block">Email Address</span>
                <span className="font-semibold text-gray-800">{data.user.email}</span>
              </div>
              <div>
                <span className="text-xs text-gray-500 block">Phone</span>
                <span className="font-semibold text-gray-800">{data.user.phone || 'N/A'}</span>
              </div>
              <div>
                <span className="text-xs text-gray-500 block">Role</span>
                <span className="font-semibold text-gray-800">{data.user.role}</span>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-3">
                Donations Made ({data.donations?.length || 0})
              </h3>
              {data.donations?.length === 0 ? (
                <p className="text-xs text-gray-400">No donation records found.</p>
              ) : (
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {data.donations.map((item) => (
                    <div
                      key={item._id}
                      className="p-3 bg-white border border-gray-200 rounded-lg flex items-center justify-between text-xs"
                    >
                      <div>
                        <p className="font-medium text-gray-800">{item.title || 'Donation Item'}</p>
                        <p className="text-gray-400">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <span className="px-2 py-1 rounded bg-gray-100 text-gray-700 font-medium">
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end pt-4 border-t border-gray-100">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-lg transition"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetailModal;