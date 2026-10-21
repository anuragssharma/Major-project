import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { StatusBadge } from '../../components/StatusBadge';
import DonationImage from '../../components/DonationImage';
import {
  ShieldCheck,
  AlertCircle,
  MapPin,
  Calendar,
  Clock,
  User,
  Package,
  Eye,
  Truck,
  CheckCircle2,
  Send,
  X
} from 'lucide-react';

const RECYCLER_OPTIONS = [
  'Recycler ngo1',
  'Recycler ngo2',
  'Recycler ngo3',
  'Recycler ngo4',
  // 'EcoRecycle Tech Ltd (Mumbai)',
  // 'Attero Recycling India',
  // 'GreenZ E-Waste Processors (Thane)',
  // 'Maharashtra Pollution Control Recyclers',
  'Other'
];

const NGO_OPTIONS = [
  'Donate to NGO1',
  'Donate to NGO2',
  'Donate to NGO3',
  'Donate to NGO4',
  // 'Pratham Mumbai Education Initiative',
  // 'Nanhi Kali Foundation',
  // 'Teach for India Tech Wing',
  // 'Seva Sahayog Foundation',
  // 'Goonj Resource Center',
  'Other'
];

export const AvailableDonations = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCondition, setFilterCondition] = useState('ALL');
  const [selectedModalDonation, setSelectedModalDonation] = useState(null);

  // Inspection Modal State
  const [inspectingItem, setInspectingItem] = useState(null);
  const [verifiedCondition, setVerifiedCondition] = useState('Functional');
  const [selectedDestination, setSelectedDestination] = useState('');
  const [customDestination, setCustomDestination] = useState('');
  const [dispatchNotes, setDispatchNotes] = useState('');
  const [submittingDispatch, setSubmittingDispatch] = useState(false);

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

  const handleQuickStatus = async (id, newStatus) => {
    try {
      await api.patch(`/donations/${id}/status`, { status: newStatus });
      fetchDonations();
    } catch (err) {
      alert(err.response?.data?.message || 'Error updating status');
    }
  };

  const openInspectionModal = (item) => {
    setInspectingItem(item);
    setVerifiedCondition(item.condition || 'Functional');
    setSelectedDestination('');
    setCustomDestination('');
    setDispatchNotes(item.resolutionNotes || '');
  };

  const handleConfirmDispatch = async () => {
    if (!selectedDestination) {
      return alert(
        verifiedCondition === 'Functional'
          ? 'Please select an NGO from the list or choose "Other".'
          : 'Please select a Recycler from the list or choose "Other".'
      );
    }
    const finalDestinationName =
      selectedDestination === 'Other' ? customDestination.trim() : selectedDestination;

    if (!finalDestinationName) {
      return alert(
        verifiedCondition === 'Functional'
          ? 'Please enter the name of the recipient NGO.'
          : 'Please enter the name of the recycler facility.'
      );
    }

    const nextStatus = verifiedCondition === 'Functional' ? 'Distributed' : 'Sent for Recycling';

    try {
      setSubmittingDispatch(true);
      await api.patch(`/donations/${inspectingItem._id}/status`, {
        status: nextStatus,
        condition: verifiedCondition,
        assignedDestination: {
          type: verifiedCondition === 'Functional' ? 'BENEFICIARY' : 'RECYCLER',
          name: finalDestinationName,
          notes: dispatchNotes
        },
        resolutionNotes: dispatchNotes
      });

      setInspectingItem(null);
      fetchDonations();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to dispatch device');
    } finally {
      setSubmittingDispatch(false);
    }
  };

  const activeDonations = donations.filter((d) =>
    ['Submitted', 'Pickup Scheduled', 'Received'].includes(d.status)
  );

  const filteredDonations = activeDonations.filter((d) => {
    if (filterCondition === 'ALL') return true;
    return d.condition === filterCondition;
  });

  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-gray-500 font-medium">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-3"></div>
        <span>Loading catalog...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Active Hardware Processing</h1>
          <p className="text-xs sm:text-sm text-gray-500">
            Schedule pickups, confirm received hardware, verify conditions, and dispatch to NGOs or recyclers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 font-semibold uppercase">Filter:</span>
          {['ALL', 'Functional', 'Non-functional'].map((cond) => (
            <button
              key={cond}
              onClick={() => setFilterCondition(cond)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                filterCondition === cond
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-white border text-gray-700 hover:bg-gray-50'
              }`}
            >
              {cond}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filteredDonations.map((d) => (
          <div
            key={d._id}
            className="group bg-white border border-gray-200 hover:border-emerald-400 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="relative h-44 bg-gray-100 flex items-center justify-center overflow-hidden border-b border-gray-100">
              <DonationImage item={d} className="w-full h-full" />

              <div className="absolute top-2.5 left-2.5 z-10">
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

              <button
                onClick={() => setSelectedModalDonation(d)}
                className="absolute top-2.5 right-2.5 z-10 bg-white/90 hover:bg-white text-gray-700 p-1.5 rounded-full shadow-sm transition"
              >
                <Eye className="h-3.5 w-3.5" />
              </button>

              <div className="absolute bottom-2 left-2.5 right-2.5 z-10">
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
                  <span className="truncate">{d.aiVerification?.verdict || 'Visual Checked'}</span>
                </span>
              </div>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between text-[11px] text-gray-400 mb-1">
                  <span className="font-mono font-semibold">{d.donationId}</span>
                  <StatusBadge status={d.status} />
                </div>
                <h3 className="font-extrabold text-gray-900 text-sm line-clamp-1">
                  {d.deviceDetails?.deviceType || d.title}
                </h3>
                <div className="text-xs text-gray-500 mt-0.5">
                  Qty: <strong className="text-gray-800">{d.deviceDetails?.quantity || 1} unit</strong>
                </div>
              </div>

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

              <div className="text-xs text-gray-600 space-y-1">
                <div className="flex items-start gap-1">
                  <MapPin className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="truncate font-medium text-gray-800">
                    {d.pickupAddress}, {d.city}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-gray-400 pl-4.5">
                  <span className="truncate max-w-[120px]">{d.donor?.name || 'Donor'}</span>
                  <span className="font-mono">{d.donor?.phone || ''}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-gray-100">
                {d.status === 'Submitted' && (
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleQuickStatus(d._id, 'Pickup Scheduled')}
                      className="w-full bg-[#054425] hover:bg-emerald-700 text-white font-bold text-xs py-2 rounded-xl transition shadow-sm flex items-center justify-center gap-1.5"
                    >
                      <Truck className="h-3.5 w-3.5" />
                      Pickup
                    </button>
                    <button
                      onClick={() => handleQuickStatus(d._id, 'Rejected')}
                      className="w-full bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs py-2 rounded-xl border border-rose-200 transition"
                    >
                      Reject
                    </button>
                  </div>
                )}

                {d.status === 'Pickup Scheduled' && (
                  <button
                    onClick={() => handleQuickStatus(d._id, 'Received')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2 rounded-xl transition shadow-sm flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Mark Received
                  </button>
                )}

                {d.status === 'Received' && (
                  <button
                    onClick={() => openInspectionModal(d)}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs py-2 rounded-xl transition shadow-sm flex items-center justify-center gap-1.5"
                  >
                    <Send className="h-3.5 w-3.5" />
                    Inspect & Dispatch
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredDonations.length === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-gray-300">
          <Package className="h-10 w-10 text-gray-300 mx-auto mb-2" />
          <h3 className="font-bold text-gray-700 text-base">No Active Items</h3>
          <p className="text-xs text-gray-400 mt-1">
            All submitted devices have been picked up, verified, and dispatched.
          </p>
        </div>
      )}

      {/* INSPECTION MODAL */}
      {inspectingItem && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-3xl overflow-hidden shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="text-base font-bold text-gray-900">
                  NGO Physical Inspection & Dispatch
                </h3>
                <p className="text-xs text-gray-500 font-mono">ID: {inspectingItem.donationId}</p>
              </div>
              <button
                onClick={() => setInspectingItem(null)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Condition Toggle */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-600 block">
                1. VERIFY OPERATIONAL CONDITION:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setVerifiedCondition('Functional');
                    setSelectedDestination('');
                  }}
                  className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition ${
                    verifiedCondition === 'Functional'
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-800 ring-2 ring-emerald-500/20'
                      : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-base">💻</span>
                  <span>Functional (Working)</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setVerifiedCondition('Non-functional');
                    setSelectedDestination('');
                  }}
                  className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition ${
                    verifiedCondition === 'Non-functional'
                      ? 'bg-amber-50 border-amber-500 text-amber-800 ring-2 ring-amber-500/20'
                      : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-base">⚠️</span>
                  <span>Non-functional (E-Waste)</span>
                </button>
              </div>
            </div>

            {/* Destination Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-600 block">
                {verifiedCondition === 'Functional'
                  ? '2. SELECT NGO:'
                  : '2. SELECT CERTIFIED RECYCLER:'}
              </label>

              <select
                value={selectedDestination}
                onChange={(e) => setSelectedDestination(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs font-medium text-gray-800 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
              >
                <option value="">
                  {verifiedCondition === 'Functional' ? '-- Choose NGO --' : '-- Choose Recycler --'}
                </option>
                {(verifiedCondition === 'Functional' ? NGO_OPTIONS : RECYCLER_OPTIONS).map(
                  (opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  )
                )}
              </select>

              {/* If "Other" selected */}
              {selectedDestination === 'Other' && (
                <input
                  type="text"
                  placeholder={
                    verifiedCondition === 'Functional'
                      ? 'Enter recipient NGO name...'
                      : 'Enter recycler facility name...'
                  }
                  value={customDestination}
                  onChange={(e) => setCustomDestination(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
                />
              )}
            </div>

            {/* Remarks */}
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-600 block">
                3. FINAL REMARKS / NOTES:
              </label>
              <textarea
                rows={2}
                placeholder="Diagnostic notes, refurbishment performed, dispatch details..."
                value={dispatchNotes}
                onChange={(e) => setDispatchNotes(e.target.value)}
                className="w-full border border-gray-200 rounded-xl p-2.5 text-xs text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t">
              <button
                type="button"
                onClick={() => setInspectingItem(null)}
                className="px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-xl transition"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={submittingDispatch}
                onClick={handleConfirmDispatch}
                className="px-5 py-2 text-xs font-bold text-white bg-[#054425] hover:bg-emerald-700 rounded-xl shadow-sm transition disabled:opacity-50"
              >
                {submittingDispatch ? 'Processing...' : 'Confirm & Dispatch'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      {selectedModalDonation && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-3xl p-6 space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <span className="font-mono font-bold text-sm text-gray-900">
                {selectedModalDonation.donationId}
              </span>
              <button onClick={() => setSelectedModalDonation(null)}>
                <X className="h-5 w-5 text-gray-400" />
              </button>
            </div>
            <div className="h-56 rounded-2xl overflow-hidden bg-gray-100">
              <DonationImage item={selectedModalDonation} className="w-full h-full" />
            </div>
            <div className="text-xs space-y-1 text-gray-600">
              <div><strong>Item:</strong> {selectedModalDonation.deviceDetails?.deviceType}</div>
              <div><strong>Donor:</strong> {selectedModalDonation.donor?.name} ({selectedModalDonation.donor?.phone})</div>
              <div><strong>Address:</strong> {selectedModalDonation.pickupAddress}, {selectedModalDonation.city}</div>
              <div><strong>Description:</strong> {selectedModalDonation.deviceDetails?.description || 'None'}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};