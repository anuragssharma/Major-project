const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  phone: { type: String, required: true, trim: true },
  address: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['DONOR', 'NGO', 'ADMIN'], 
    default: 'DONOR' 
  },
  status: { 
    type: String, 
    enum: ['ACTIVE', 'INACTIVE', 'PENDING'], 
    default: 'ACTIVE' 
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);