const User = require('../models/User');
const NGO = require('../models/NGO');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

exports.register = async (req, res) => {
  try {
    const { name, email, password, phone, address, role, ngoData } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userRole = role === 'NGO' ? 'NGO' : (role === 'ADMIN' ? 'ADMIN' : 'DONOR');
    const userStatus = userRole === 'NGO' ? 'PENDING' : 'ACTIVE';

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      role: userRole,
      status: userStatus
    });

    if (userRole === 'NGO') {
      const parsedNgoData = typeof ngoData === 'string' ? JSON.parse(ngoData) : ngoData;
      await NGO.create({
        user: user._id,
        ngoName: (parsedNgoData && parsedNgoData.ngoName) || name,
        registrationNumber: (parsedNgoData && parsedNgoData.registrationNumber) || `REG-${Date.now()}`,
        contactPerson: name,
        contactPhone: phone,
        contactEmail: email,
        officeAddress: address,
        documentUrl: req.file ? `/uploads/${req.file.filename}` : '',
        approvalStatus: 'PENDING'
      });
    }

    res.status(201).json({
      message: userRole === 'NGO' 
        ? 'NGO registered successfully. Awaiting Admin verification before login.' 
        : 'Registered successfully.',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    if (user.role === 'NGO') {
      const ngo = await NGO.findOne({ user: user._id });
      if (!ngo || ngo.approvalStatus !== 'APPROVED') {
        return res.status(403).json({
          message: ngo?.approvalStatus === 'REJECTED'
            ? `Account Rejected. Reason: ${ngo.rejectionReason || 'No reason provided'}`
            : 'NGO account is still pending verification by the Administrator.'
        });
      }
    }

    const token = generateToken(user._id);

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMe = async (req, res) => {
  try {
    let ngoProfile = null;
    if (req.user.role === 'NGO') {
      ngoProfile = await NGO.findOne({ user: req.user._id });
    }
    res.json({
      user: req.user,
      ngoProfile
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};