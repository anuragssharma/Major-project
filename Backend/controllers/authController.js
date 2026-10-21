const User = require('../models/User');
const NGO = require('../models/NGO');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Always include both id and role in the token
const generateToken = (id, role) => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET || 'fallback_secret_key',
    { expiresIn: '7d' }
  );
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
      const parsedNgoData = typeof ngoData === 'string' ? JSON.parse(ngoData || '{}') : (ngoData || {});
      await NGO.create({
        user: user._id,
        ngoName: parsedNgoData.ngoName || name,
        registrationNumber: parsedNgoData.registrationNumber || `REG-${Date.now()}`,
        contactPerson: name,
        contactPhone: phone,
        contactEmail: email,
        officeAddress: address,
        documentUrl: req.file ? `/uploads/${req.file.filename}` : '',
        approvalStatus: 'APPROVED' // Set to APPROVED so you can immediately test
      });
    }

    res.status(201).json({
      message: 'Registration successful.',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status
      }
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide both email and password.' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // BLOCK SUSPENDED / INACTIVE USERS HERE
    if (user.status === 'SUSPENDED' || user.status === 'BLOCKED') {
      return res.status(403).json({
        message: 'Your account has been suspended. Please contact platform administrators.'
      });
    }

    const token = generateToken(user._id, user.role);

    res.json({
      success: true,
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
    console.error('[Login Error]:', err);
    res.status(500).json({ message: err.message || 'Server login error' });
  }
};

exports.getMe = async (req, res) => {
  try {
    let ngoProfile = null;
    const userId = req.user?.id || req.user?._id;
    if (req.user?.role === 'NGO') {
      ngoProfile = await NGO.findOne({ user: userId });
    }
    res.json({
      user: req.user,
      ngoProfile
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};