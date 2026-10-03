import React from 'react';

const statusColors = {
  Submitted: 'bg-blue-100 text-blue-800 border-blue-300',
  Accepted: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  Rejected: 'bg-rose-100 text-rose-800 border-rose-300',
  Distributed: 'bg-teal-100 text-teal-800 border-teal-300',
  'Sent for Recycling': 'bg-amber-100 text-amber-800 border-amber-300',
  Completed: 'bg-green-100 text-green-900 border-green-300',
  PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  APPROVED: 'bg-green-100 text-green-800 border-green-300',
  REJECTED: 'bg-red-100 text-red-800 border-red-300',
};

export const StatusBadge = ({ status }) => {
  const colorClass = statusColors[status] || 'bg-gray-100 text-gray-800 border-gray-300';
  return (
    <span className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full border ${colorClass}`}>
      {status}
    </span>
  );
};