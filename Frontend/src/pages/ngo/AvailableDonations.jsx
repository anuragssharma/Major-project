import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { StatusBadge } from '../../components/StatusBadge';
import {
  ShieldCheck,
  AlertCircle,
  MapPin,
  Calendar,
  Clock,
  Phone,
  User,
  Cpu,
  Package,
  Eye,
  X
} from 'lucide-react';

export const AvailableDonations = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resolutionNotes, setResolutionNotes] = useState({});
  const [filterCondition, setFilterCondition] = useState('ALL');
  const [selectedModalDonation, setSelectedModalDonation] = useState(null);

  // Fetch all donations from backend
  const fetchDonations = async () => {
    try {
      const res = await api.get('/donations');
      setDonations(res.data);
    } catch (err) {
      console.error('Failed to load donations:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  // Handle stage update
  const handleUpdateStatus = async (id, status) => {
    try {
      await api.patch(`/donations/${id}/status`, {
        status,
        resolutionNotes: resolutionNotes[id] || ''
      });
      fetchDonations();
      if (selectedModalDonation && selectedModalDonation._id === id) {
        setSelectedModalDonation(null);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Error updating status');
    }
  };

  const filteredDonations = donations.filter((d) => {
    if (filterCondition === 'ALL') return true;
    return d.condition === filterCondition;
  });

  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-gray-500 font-medium">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-3"></div>
        <span>Loading donation catalogue...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header & Filtering Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Available Hardware Catalog</h1>
          <p className="text-xs sm:text-sm text-gray-500">
            Browse submitted electronics, inspect photo forensics, and claim devices for redistribution or recycling.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 font-semibold uppercase">Condition:</span>
          <button
            onClick={() => setFilterCondition('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              filterCondition === 'ALL'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white border text-gray-700 hover:bg-gray-50'
            }`}
          >
            All ({donations.length})
          </button>
          <button
            onClick={() => setFilterCondition('Functional')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              filterCondition === 'Functional'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white border text-gray-700 hover:bg-gray-50'
            }`}
          >
            Functional
          </button>
          <button
            onClick={() => setFilterCondition('Non-functional')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              filterCondition === 'Non-functional'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white border text-gray-700 hover:bg-gray-50'
            }`}
          >
            Non-functional
          </button>
        </div>
      </div>

      {/* Product Cards Grid (Flipkart/Myntra Style) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filteredDonations.map((d) => {
          // Resolve image URL fallback
          const primaryImage =
            d.images && d.images.length > 0
              ? `http://localhost:5000${d.images[0]}`
              : null;

          return (
            <div
              key={d._id}
              className="group bg-white border border-gray-200 hover:border-emerald-400 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              {/* Card Image Container (Compact aspect ratio) */}
              <div className="relative h-44 bg-gray-100 flex items-center justify-center overflow-hidden border-b border-gray-100">
                {primaryImage ? (
                  <img
                    src={primaryImage}
                    alt={d.deviceDetails.deviceType}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/logo-icon.png';
                    }}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-gray-400 p-4">
                    <Cpu className="h-10 w-10 text-gray-300 mb-1" />
                    <span className="text-[11px] font-semibold">No Image Provided</span>
                  </div>
                )}

                {/* Top Left Badge: Condition Tag */}
                <div className="absolute top-2.5 left-2.5">
                  <span
                    className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md shadow-sm border ${
                      d.condition === 'Functional'
                        ? 'bg-emerald-500 text-white border-emerald-400'
                        : 'bg-amber-600 text-white border-amber-500'
                    }`}
                  >
                    {d.condition}
                  </span>
                </div>

                {/* Top Right Quick View Button */}
                <button
                  onClick={() => setSelectedModalDonation(d)}
                  className="absolute top-2.5 right-2.5 bg-white/90 hover:bg-white text-gray-700 p-1.5 rounded-full shadow-sm transition"
                  title="View full item details"
                >
                  <Eye className="h-3.5 w-3.5" />
                </button>

                {/* Bottom Overlay: AI Inspection Verdict */}
                <div className="absolute bottom-2 left-2.5 right-2.5">
                  <span
                    className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-md shadow-sm ${
                      d.aiVerification?.isAiOrAltered
                        ? 'bg-rose-950/80 text-rose-200 border border-rose-500/50'
                        : 'bg-black/75 text-emerald-300 border border-emerald-500/40'
                    }`}
                  >
                    {d.aiVerification?.isAiOrAltered ? (
                      <AlertCircle className="h-3 w-3 shrink-0 text-rose-400" />
                    ) : (
                      <ShieldCheck className="h-3 w-3 shrink-0 text-emerald-400" />
                    )}
                    <span className="truncate">
                      {d.aiVerification?.verdict || 'Visual Checked'}
                    </span>
                  </span>
                </div>
              </div>

              {/* Card Body: Information Details */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                {/* Title & Tracking ID */}
                <div>
                  <div className="flex items-center justify-between text-[11px] text-gray-400 mb-1">
                    <span className="font-mono font-semibold">{d.donationId}</span>
                    <StatusBadge status={d.status} />
                  </div>
                  <h3 className="font-extrabold text-gray-900 text-sm line-clamp-1 leading-snug">
                    {d.deviceDetails.deviceType}
                  </h3>
                  <div className="text-xs text-gray-500 mt-0.5">
                    Qty: <strong className="text-gray-800">{d.deviceDetails.quantity} unit(s)</strong>
                  </div>
                </div>

                {/* Description Snippet */}
                <p className="text-xs text-gray-600 line-clamp-2 italic leading-relaxed">
                  "{d.deviceDetails.description || 'No additional accessories specified.'}"
                </p>

                {/* Scheduled Slot Chip */}
                <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-2 text-xs text-emerald-950 space-y-0.5">
                  <div className="flex items-center gap-1.5 font-bold">
                    <Calendar className="h-3 w-3 text-emerald-700" />
                    <span>{d.pickupDate || new Date(d.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-800">
                    <Clock className="h-3 w-3 text-emerald-600" />
                    <span>{d.pickupTimeSlot || '10:00 AM - 01:00 PM'}</span>
                  </div>
                </div>

                {/* Location & Donor Contact */}
                <div className="pt-2 border-t border-gray-100 text-xs text-gray-600 space-y-1">
                  <div className="flex items-start gap-1">
                    <MapPin className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="truncate font-medium text-gray-800">
                      {d.pickupAddress}, {d.city} - {d.pincode}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-gray-400 pl-4.5">
                    <span className="flex items-center gap-1 truncate max-w-[130px]">
                      <User className="h-2.5 w-2.5" /> {d.donor?.name || 'Anonymous'}
                    </span>
                    <span className="font-mono">{d.donor?.phone || ''}</span>
                  </div>
                </div>

                {/* Resolution Notes Input */}
                <div>
                  <input
                    type="text"
                    placeholder="Dispatch notes..."
                    defaultValue={d.resolutionNotes}
                    onChange={(e) =>
                      setResolutionNotes({ ...resolutionNotes, [d._id]: e.target.value })
                    }
                    className="w-full border border-gray-200 rounded-lg px-2.5 py-1 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                {/* Action Controls */}
                <div className="pt-1">
                  {d.status === 'Submitted' && (
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleUpdateStatus(d._id, 'Accepted')}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2 rounded-xl transition shadow-sm"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(d._id, 'Rejected')}
                        className="w-full bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs py-2 rounded-xl border border-rose-200 transition"
                      >
                        Reject
                      </button>
                    </div>
                  )}

                  {d.status === 'Accepted' && (
                    <>
                      {d.condition === 'Functional' ? (
                        <button
                          onClick={() => handleUpdateStatus(d._id, 'Distributed')}
                          className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs py-2 rounded-xl transition shadow-sm"
                        >
                          Mark Distributed
                        </button>
                      ) : (
                        <button
                          onClick={() => handleUpdateStatus(d._id, 'Sent for Recycling')}
                          className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs py-2 rounded-xl transition shadow-sm"
                        >
                          Send to Recycler
                        </button>
                      )}
                    </>
                  )}

                  {(d.status === 'Distributed' || d.status === 'Sent for Recycling') && (
                    <button
                      onClick={() => handleUpdateStatus(d._id, 'Completed')}
                      className="w-full bg-green-700 hover:bg-green-800 text-white font-bold text-xs py-2 rounded-xl transition shadow-sm"
                    >
                      Finalize & Close
                    </button>
                  )}

                  {d.status === 'Completed' && (
                    <div className="text-center text-[11px] font-bold text-green-700 py-1 bg-green-50 rounded-lg border border-green-200">
                      Lifecycle Completed
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredDonations.length === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-gray-300">
          <Package className="h-10 w-10 text-gray-300 mx-auto mb-2" />
          <h3 className="font-bold text-gray-700 text-base">No Items Found</h3>
          <p className="text-xs text-gray-400 mt-1">There are no hardware donations matching this filter.</p>
        </div>
      )}

      {/* Item Quick-Inspection Modal */}
      {selectedModalDonation && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white max-w-xl w-full rounded-3xl overflow-hidden shadow-2xl space-y-4 animate-in fade-in duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-sm text-gray-900">
                  {selectedModalDonation.donationId}
                </span>
                <StatusBadge status={selectedModalDonation.status} />
              </div>
              <button
                onClick={() => setSelectedModalDonation(null)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              {/* Photo Preview */}
              {selectedModalDonation.images && selectedModalDonation.images.length > 0 && (
                <div className="rounded-2xl overflow-hidden max-h-64 bg-gray-100 flex items-center justify-center border">
                  <img
                    src={`http://localhost:5000${selectedModalDonation.images[0]}`}
                    alt="Device Full Inspection"
                    className="w-full h-full object-contain"
                  />
                </div>
              )}

              {/* Specs */}
              <div className="grid grid-cols-2 gap-3 text-xs bg-gray-50 p-4 rounded-2xl">
                <div>
                  <span className="text-gray-400 block uppercase font-semibold">Device Type</span>
                  <span className="font-bold text-gray-900">{selectedModalDonation.deviceDetails.deviceType}</span>
                </div>
                <div>
                  <span className="text-gray-400 block uppercase font-semibold">Quantity</span>
                  <span className="font-bold text-gray-900">{selectedModalDonation.deviceDetails.quantity} unit(s)</span>
                </div>
                <div>
                  <span className="text-gray-400 block uppercase font-semibold">Condition</span>
                  <span className="font-bold text-emerald-700">{selectedModalDonation.condition}</span>
                </div>
                <div>
                  <span className="text-gray-400 block uppercase font-semibold">Scheduled Date</span>
                  <span className="font-bold text-gray-900">
                    {selectedModalDonation.pickupDate} ({selectedModalDonation.pickupTimeSlot})
                  </span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Donor Description</h4>
                <p className="text-xs text-gray-600 bg-white p-3 border rounded-xl leading-relaxed">
                  {selectedModalDonation.deviceDetails.description || 'No description provided.'}
                </p>
              </div>

              {/* AI Verdict */}
              {selectedModalDonation.aiVerification && (
                <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                    <span>Gemini AI Forensic Analysis: {selectedModalDonation.aiVerification.verdict}</span>
                  </div>
                  <p className="text-[11px] text-emerald-800">
                    {selectedModalDonation.aiVerification.explanation || 'Authentic hardware photo verified.'}
                  </p>
                </div>
              )}

              {/* Pickup Address */}
              <div className="text-xs text-gray-600 space-y-1 bg-gray-50 p-4 rounded-2xl">
                <div className="font-bold text-gray-800 flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-emerald-600" /> Doorstep Collection Location
                </div>
                <div>{selectedModalDonation.pickupAddress}, {selectedModalDonation.city} - {selectedModalDonation.pincode}</div>
                <div className="text-gray-400">Donor Contact: {selectedModalDonation.donor?.name} ({selectedModalDonation.donor?.phone})</div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-gray-50 border-t flex justify-end">
              <button
                onClick={() => setSelectedModalDonation(null)}
                className="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs font-bold rounded-xl transition"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};