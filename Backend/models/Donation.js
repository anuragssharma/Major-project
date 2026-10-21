const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema(
  {
    donationId: {
      type: String,
      required: true,
      unique: true
    },
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    assignedNgo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'NGO',
      default: null
    },
    deviceDetails: {
      deviceType: { type: String, required: true },
      deviceName: { type: String, default: '' },
      brand: { type: String, default: 'Unspecified' },
      model: { type: String, default: 'Standard' },
      quantity: { type: Number, default: 1 },
      deviceAge: { type: String, default: 'N/A' },
      accessories: [{ type: String }],
      description: { type: String, default: '' }
    },
    condition: {
      type: String,
      enum: ['Functional', 'Non-functional'],
      default: 'Functional'
    },
    images: [{ type: String }],
    aiVerification: {
      verified: { type: Boolean, default: false },
      verdict: { type: String, default: 'Visual Checked' },
      isAiOrAltered: { type: Boolean, default: false },
      explanation: { type: String, default: '' }
    },
    pickupAddress: { type: String, required: true },
    city: { type: String, default: 'Mumbai' },
    pincode: { type: String, default: '400086' },
    pickupDate: { type: String },
    pickupTimeSlot: { type: String, default: '10:00 AM - 01:00 PM' },
    status: {
      type: String,
      enum: [
        'Submitted',
        'Pickup Scheduled',
        'Received',
        'Distributed',
        'Sent for Recycling',
        'Completed',
        'Rejected'
      ],
      default: 'Submitted'
    },
    assignedDestination: {
      type: {
        type: String,
        enum: ['RECYCLER', 'BENEFICIARY']
      },
      name: { type: String, default: '' },
      notes: { type: String, default: '' }
    },
    resolutionNotes: { type: String, default: '' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Donation', donationSchema);