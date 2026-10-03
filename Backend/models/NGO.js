const mongoose = require('mongoose');

const ngoSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  ngoName: { type: String, required: true, trim: true },
  registrationNumber: { type: String, required: true, unique: true, trim: true },
  contactPerson: { type: String, required: true },
  contactPhone: { type: String, required: true },
  contactEmail: { type: String, required: true },
  officeAddress: { type: String, required: true },
  documentUrl: { type: String, default: '' },
  approvalStatus: { 
    type: String, 
    enum: ['PENDING', 'APPROVED', 'REJECTED'], 
    default: 'PENDING' 
  },
  rejectionReason: { type: String, default: null }
}, { timestamps: true });

module.exports = mongoose.model('NGO', ngoSchema);