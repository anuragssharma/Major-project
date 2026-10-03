const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  donationId: { type: String, unique: true, required: true },
  donor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  deviceDetails: {
    deviceType: { type: String, required: true },
    deviceName: { type: String, default: '' },
    brand: { type: String, default: 'Unspecified' },
    model: { type: String, default: 'Standard' },
    quantity: { type: Number, required: true, min: 1, default: 1 },
    deviceAge: { type: String, default: 'N/A' },
    accessories: { type: [String], default: [] },
    description: { type: String, required: true }
  },
  condition: { 
    type: String, 
    enum: ['Functional', 'Non-functional'], 
    required: true 
  },
  images: [{ type: String }],
  aiVerification: {
    verified: { type: Boolean, default: false },
    isAiOrAltered: { type: Boolean, default: false },
    verdict: { type: String, default: 'Not Checked' },
    confidenceScore: { type: Number, default: 0 },
    explanation: { type: String, default: '' }
  },
  // Pickup address and scheduling parameters
  pickupAddress: { type: String, default: '' },
  city: { type: String, default: 'Mumbai' },
  pincode: { type: String, default: '400086' },
  pickupDate: { type: String, default: '' }, // Format: YYYY-MM-DD
  pickupTimeSlot: { type: String, default: '10:00 AM - 01:00 PM' }, // E.g. Morning/Afternoon window
  status: {
    type: String,
    enum: [
      'Submitted',
      'Accepted',
      'Rejected',
      'Distributed',
      'Sent for Recycling',
      'Completed'
    ],
    default: 'Submitted'
  },
  assignedNgo: { type: mongoose.Schema.Types.ObjectId, ref: 'NGO', default: null },
  resolutionNotes: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Donation', donationSchema);