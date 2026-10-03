/**
 * ============================================================================
 * Component: DonationForm
 * Description: Pre-validates hardware photos using Gemini AI via the backend.
 *              Submit button is strictly disabled until the image is verified
 *              and confirmed authentic (non-AI).
 * ============================================================================
 */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  MapPin,
  Calendar,
  Clock,
  Lock,
  UploadCloud
} from 'lucide-react';

export const DonationForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Form Fields
  const [deviceType, setDeviceType] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [condition, setCondition] = useState('');
  const [description, setDescription] = useState('');

  // Location fields
  const [pickupAddress, setPickupAddress] = useState('Ghatkopar, Mumbai, Maharashtra');
  const [city, setCity] = useState('Mumbai');
  const [pincode, setPincode] = useState('400086');

  // Date and Time schedule
  const today = new Date().toISOString().split('T')[0];
  const [pickupDate, setPickupDate] = useState(today);
  const [pickupTimeSlot, setPickupTimeSlot] = useState('10:00 AM - 01:00 PM');

  // File & Preview
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  // AI Verification State
  const [verifying, setVerifying] = useState(false);
  const [aiReport, setAiReport] = useState(null);

  // Submission State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Reset verification whenever the user selects a new image
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setAiReport(null);
      setError('');
    }
  };

  // Step 1: Verification Handler
  const handleVerifyImage = async () => {
    if (!selectedFile) {
      setError('Please select an image file first to verify.');
      return;
    }

    setVerifying(true);
    setError('');

    try {
      const checkData = new FormData();
      checkData.append('image', selectedFile);

      const res = await api.post('/donations/verify-image', checkData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setAiReport(res.data);

      if (res.data.isAiOrAltered) {
        setError(
          `AI Alert: Image was detected as AI-Generated or manipulated (${res.data.confidenceScore}% confidence). You cannot submit this image.`
        );
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Verification failed. Please try again.');
      setAiReport(null);
    } finally {
      setVerifying(false);
    }
  };

  // Check if submission is permitted:
  // Must have an AI report, it must NOT be AI-generated, and verified must be true
  const isSubmissionAllowed = aiReport && !aiReport.isAiOrAltered && aiReport.verified;

  // Step 2: Final Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isSubmissionAllowed) {
      setError('You must successfully verify an authentic physical image before submitting.');
      return;
    }
    if (!deviceType) {
      setError('Please select a device type.');
      return;
    }
    if (!condition) {
      setError('Please select operational condition.');
      return;
    }
    if (!pickupAddress || !city || !pincode) {
      setError('Please provide the full pickup address, city, and pincode.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const data = new FormData();
      data.append('deviceType', deviceType);
      data.append('quantity', quantity);
      data.append('condition', condition);
      data.append('description', description);
      data.append('pickupAddress', pickupAddress);
      data.append('city', city);
      data.append('pincode', pincode);
      data.append('pickupDate', pickupDate);
      data.append('pickupTimeSlot', pickupTimeSlot);
      data.append('aiVerification', JSON.stringify(aiReport));

      if (selectedFile) {
        data.append('images', selectedFile);
      }

      const res = await api.post('/donations', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setSuccess(`Donation scheduled! Tracking ID: ${res.data.donation.donationId}`);

      setTimeout(() => {
        if (user?.role === 'NGO') {
          navigate('/account/my-requests');
        } else {
          navigate('/account/my-donations');
        }
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Error scheduling donation pickup.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 flex justify-center items-start">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-10 space-y-6">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Donate E-Waste</h1>
          <p className="text-gray-500 text-sm mt-1">
            Every submission requires authentic physical hardware photo verification.
          </p>
        </div>

        {error && (
          <div className="p-3.5 bg-rose-50 text-rose-700 text-xs sm:text-sm rounded-2xl border border-rose-200 flex items-start gap-2">
            <AlertTriangle className="h-5 w-5 shrink-0 text-rose-600 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="p-3.5 bg-emerald-50 text-emerald-800 text-xs sm:text-sm rounded-2xl border border-emerald-200 flex items-start gap-2">
            <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600 mt-0.5" />
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* E-Waste Type & Quantity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-1.5">E-Waste Type</label>
              <select
                value={deviceType}
                onChange={(e) => setDeviceType(e.target.value)}
                required
                className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">Select device</option>
                <option value="Laptop">Laptop</option>
                <option value="Mobile Phone">Mobile Phone</option>
                <option value="Desktop Computer">Desktop Computer</option>
                <option value="Monitor">Monitor</option>
                <option value="Tablet">Tablet</option>
                <option value="Printer / Scanner">Printer / Scanner</option>
                <option value="Cables & Accessories">Cables & Accessories</option>
                <option value="Other Electronic">Other Electronic</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-1.5">Quantity</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
                className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Condition */}
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-1.5">Condition</label>
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              required
              className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">Select condition</option>
              <option value="Functional">Functional (Ready for classroom reuse)</option>
              <option value="Non-functional">Non-functional (Zero-landfill recycling)</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-1.5">Description</label>
            <textarea
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe brand, model, accessories included..."
              className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
            />
          </div>

          {/* Scheduled Date & Time */}
          <div className="pt-2 border-t border-gray-100 space-y-4">
            <div className="flex items-center gap-1.5 text-sm font-bold text-gray-800">
              <Calendar className="h-4 w-4 text-emerald-600" />
              <span>Select Pickup Date & Time Slot</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Pickup Date *
                </label>
                <input
                  type="date"
                  required
                  min={today}
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-3.5 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Time Slot *
                </label>
                <div className="relative">
                  <select
                    value={pickupTimeSlot}
                    onChange={(e) => setPickupTimeSlot(e.target.value)}
                    required
                    className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="10:00 AM - 01:00 PM">Morning (10:00 AM – 01:00 PM)</option>
                    <option value="02:00 PM - 05:00 PM">Afternoon (02:00 PM – 05:00 PM)</option>
                    <option value="05:00 PM - 08:00 PM">Evening (05:00 PM – 08:00 PM)</option>
                  </select>
                  <Clock className="h-4 w-4 text-gray-400 absolute right-3 top-2.5 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Pickup Address */}
          <div className="pt-2 border-t border-gray-100 space-y-4">
            <div className="flex items-center gap-1.5 text-sm font-bold text-gray-800">
              <MapPin className="h-4 w-4 text-emerald-600" />
              <span>Pickup Location Address</span>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Street Address *
              </label>
              <input
                type="text"
                required
                value={pickupAddress}
                onChange={(e) => setPickupAddress(e.target.value)}
                placeholder="Building / Flat, Area"
                className="w-full border border-gray-300 rounded-xl px-3.5 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  City *
                </label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Mumbai"
                  className="w-full border border-gray-300 rounded-xl px-3.5 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Pincode *
                </label>
                <input
                  type="text"
                  required
                  maxLength="6"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="400086"
                  className="w-full border border-gray-300 rounded-xl px-3.5 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Step 1: Device Image Upload & Verification Section */}
          <div className="pt-2 border-t border-gray-100 space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-bold text-gray-800">
                1. Upload Physical Hardware Photo *
              </label>
              <span className="text-[11px] text-amber-600 font-bold uppercase tracking-wider">
                Inspection Required
              </span>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-4 bg-gray-50/50 flex flex-col items-center justify-center text-center">
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                required
                className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-gray-200 file:text-gray-800 hover:file:bg-gray-300 cursor-pointer"
              />
              <span className="text-xs text-gray-400 mt-2 block w-full text-left">
                JPG, PNG, or WebP • Max 5 MB
              </span>
            </div>

            {previewUrl && (
              <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-xl border border-gray-200">
                <img src={previewUrl} alt="Preview" className="h-16 w-16 object-cover rounded-lg border" />
                <div className="text-xs text-gray-600 truncate">{selectedFile?.name}</div>
              </div>
            )}

            {/* Separate Verification Trigger Button */}
            <button
              type="button"
              onClick={handleVerifyImage}
              disabled={verifying || !selectedFile}
              className="w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 py-3 rounded-2xl font-bold text-sm transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {verifying ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin text-indigo-600" />
                  <span>Gemini AI is analyzing image authenticity...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 text-indigo-600" />
                  <span>Verify Image Authenticity</span>
                </>
              )}
            </button>
          </div>

          {/* AI Forensic Verdict Results */}
          {aiReport && (
            <div
              className={`p-4 rounded-2xl border text-xs space-y-1.5 transition-all ${
                aiReport.isAiOrAltered
                  ? 'bg-rose-50 border-rose-300 text-rose-900'
                  : 'bg-emerald-50 border-emerald-300 text-emerald-900'
              }`}
            >
              <div className="flex items-center justify-between font-bold">
                <span className="flex items-center gap-1.5">
                  {aiReport.isAiOrAltered ? (
                    <AlertTriangle className="h-4 w-4 text-rose-600" />
                  ) : (
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  )}
                  {aiReport.verdict}
                </span>
                <span className="bg-white/80 px-2 py-0.5 rounded text-[11px] font-mono border">
                  {aiReport.confidenceScore * 100}% confidence
                </span>
              </div>
              <p className="leading-relaxed">{aiReport.explanation}</p>
            </div>
          )}

          {/* Step 2: Final Submit Button (Strictly Disabled until verification succeeds) */}
          <div className="pt-3">
            <button
              type="submit"
              disabled={loading || !isSubmissionAllowed}
              className={`w-full py-3.5 rounded-2xl font-bold text-sm transition-all shadow-sm flex items-center justify-center gap-2 ${
                isSubmissionAllowed
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer'
                  : 'bg-gray-200 text-gray-400 border border-gray-300 cursor-not-allowed'
              }`}
            >
              {!isSubmissionAllowed ? (
                <>
                  <Lock className="h-4 w-4 text-gray-400" />
                  <span>Verify an Authentic Image Above to Unlock Submit</span>
                </>
              ) : loading ? (
                'Scheduling Pickup & Submitting...'
              ) : (
                `Schedule Pickup for ${pickupDate} & Submit (${aiReport.confidenceScore}% Authentic)`
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};