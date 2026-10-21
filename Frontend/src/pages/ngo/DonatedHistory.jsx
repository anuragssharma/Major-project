import React, { useState, useEffect, useMemo } from 'react';
import api from '../../api/axios';
import DonationImage from '../../components/DonationImage';
import { StatusBadge } from '../../components/StatusBadge';
import {
  PackageCheck,
  Recycle,
  HeartHandshake,
  MapPin,
  User,
  Phone,
  Calendar,
  Search,
  X
} from 'lucide-react';

export default function DonatedHistory() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    api
      .get('/donations')
      .then((res) => {
        const completed = (res.data || []).filter((d) =>
          ['Distributed', 'Sent for Recycling', 'Completed'].includes(d.status)
        );
        setDonations(completed);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // Filter by Type (All / Distributed / Recycled) and Search Query
  const filtered = useMemo(() => {
    return donations.filter((item) => {
      // 1. Tab filter
      const matchesType =
        filterType === 'ALL' ||
        (filterType === 'DISTRIBUTED' &&
          (item.status === 'Distributed' || (item.status === 'Completed' && item.condition === 'Functional'))) ||
        (filterType === 'RECYCLER' &&
          (item.status === 'Sent for Recycling' || (item.status === 'Completed' && item.condition === 'Non-functional')));

      if (!matchesType) return false;

      // 2. Search query filter
      if (!searchTerm.trim()) return true;

      const query = searchTerm.toLowerCase();
      const deviceTitle = (item.deviceDetails?.deviceType || item.title || '').toLowerCase();
      const donationId = (item.donationId || '').toLowerCase();
      const donorName = (item.donor?.name || '').toLowerCase();
      const destination = (item.assignedDestination?.name || item.resolutionNotes || '').toLowerCase();
      const city = (item.city || '').toLowerCase();

      return (
        deviceTitle.includes(query) ||
        donationId.includes(query) ||
        donorName.includes(query) ||
        destination.includes(query) ||
        city.includes(query)
      );
    });
  }, [donations, filterType, searchTerm]);

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-medium text-gray-500">Loading completed ledger...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dispatched & Donated Ledger</h1>
          <p className="text-xs sm:text-sm text-gray-500">
            Showing <strong className="text-emerald-700">{filtered.length}</strong> of {donations.length} dispatched records
          </p>
        </div>

        {/* Search Bar & Filter Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search Input */}
          <div className="relative min-w-[240px]">
            <input
              type="text"
              placeholder="Search ID, device, donor, recipient..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-8 py-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition shadow-sm"
            />
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-gray-400" />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-2.5 text-gray-400 hover:text-gray-600"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setFilterType('ALL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                filterType === 'ALL'
                  ? 'bg-white text-emerald-800 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterType('DISTRIBUTED')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                filterType === 'DISTRIBUTED'
                  ? 'bg-white text-emerald-800 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Distributed
            </button>
            <button
              onClick={() => setFilterType('RECYCLER')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                filterType === 'RECYCLER'
                  ? 'bg-white text-emerald-800 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Recycled
            </button>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-gray-300">
          <PackageCheck className="h-10 w-10 text-gray-300 mx-auto mb-2" />
          <h3 className="font-bold text-gray-700 text-base">No Records Match</h3>
          <p className="text-xs text-gray-400 mt-1">
            {searchTerm
              ? `No entries found matching "${searchTerm}". Try another search term.`
              : 'Dispatched hardware items will appear here.'}
          </p>
        </div>
      ) : (
        /* Ledger Grid */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {filtered.map((item) => {
            const isRecycled =
              item.status === 'Sent for Recycling' ||
              (item.status === 'Completed' && item.condition === 'Non-functional');

            const destinationName =
              item.assignedDestination?.name ||
              item.resolutionNotes ||
              (isRecycled ? 'Authorized Recycler' : 'Partner NGO');

            return (
              <div
                key={item._id}
                className="bg-white border border-gray-200 hover:border-emerald-300 rounded-2xl p-5 shadow-sm space-y-4 transition flex flex-col justify-between"
              >
                {/* Item Details */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <DonationImage item={item} className="w-16 h-16" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-gray-500">
                          {item.donationId}
                        </span>
                        <StatusBadge status={item.status} />
                      </div>
                      <h3 className="font-extrabold text-gray-900 text-base leading-snug">
                        {item.deviceDetails?.deviceType || item.title}
                      </h3>
                      <p className="text-xs text-gray-500">
                        Condition:{' '}
                        <strong
                          className={
                            item.condition === 'Functional'
                              ? 'text-emerald-700'
                              : 'text-amber-700'
                          }
                        >
                          {item.condition}
                        </strong>{' '}
                        • Qty: {item.deviceDetails?.quantity || 1} unit(s)
                      </p>
                    </div>
                  </div>

                  <div className="text-right text-[11px] text-gray-400 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(item.updatedAt || item.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Chain of Custody */}
                <div className="bg-gray-50/80 border border-gray-200/80 rounded-xl p-3.5 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Origin: Donor */}
                    <div className="space-y-1">
                      <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                        Donated By (Origin)
                      </div>
                      <div className="flex items-center gap-1.5 font-bold text-gray-900 text-xs">
                        <User className="h-3.5 w-3.5 text-emerald-700" />
                        <span>{item.donor?.name || 'Anonymous Donor'}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                        <Phone className="h-3 w-3 text-gray-400" />
                        <span>{item.donor?.phone || 'No contact provided'}</span>
                      </div>
                      <div className="flex items-start gap-1.5 text-[11px] text-gray-500">
                        <MapPin className="h-3 w-3 text-gray-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">
                          {item.pickupAddress || item.city || 'Mumbai'}
                        </span>
                      </div>
                    </div>

                    {/* Destination: NGO / Recycler */}
                    <div className="space-y-1 sm:border-l sm:pl-3 border-gray-200">
                      <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                        {isRecycled ? 'Sent to Recycler' : 'Distributed To (NGO)'}
                      </div>
                      <div
                        className={`flex items-center gap-1.5 font-extrabold text-xs ${
                          isRecycled ? 'text-amber-800' : 'text-emerald-800'
                        }`}
                      >
                        {isRecycled ? (
                          <Recycle className="h-3.5 w-3.5 text-amber-600" />
                        ) : (
                          <HeartHandshake className="h-3.5 w-3.5 text-emerald-600" />
                        )}
                        <span className="truncate">{destinationName}</span>
                      </div>
                      <div className="text-[11px] text-gray-500">
                        Status: <strong>{isRecycled ? 'Recycled Facility' : 'Active Deployment'}</strong>
                      </div>
                      <div className="text-[11px] text-gray-400 line-clamp-1">
                        Location: {item.city || 'Mumbai'} Region
                      </div>
                    </div>
                  </div>

                  {/* Notes / Remarks */}
                  {(item.resolutionNotes || item.assignedDestination?.notes) && (
                    <div className="pt-2 border-t border-gray-200/70 text-xs text-gray-600">
                      <span className="font-semibold text-gray-700">Remarks: </span>
                      <span className="italic">
                        "{item.resolutionNotes || item.assignedDestination?.notes}"
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}