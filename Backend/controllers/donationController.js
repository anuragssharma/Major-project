const Donation = require('../models/Donation');
const NGO = require('../models/NGO');
const { verifyDeviceImage } = require('../utils/geminiVerifier');

// Pre-submission inspection endpoint
exports.verifyUploadedImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file uploaded for inspection.' });
    }

    const verification = await verifyDeviceImage(req.file.path, req.file.mimetype);
    res.json(verification);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Image inspection failed.' });
  }
};

exports.createDonation = async (req, res) => {
  try {
    const {
      deviceType,
      deviceName,
      brand,
      model,
      quantity,
      deviceAge,
      accessories,
      description,
      condition,
      pickupAddress,
      city,
      pincode,
      pickupDate,
      pickupTimeSlot,
      aiVerification
    } = req.body;

    const donationId = `EDON-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;
    const imagePaths = req.files ? req.files.map(f => `/uploads/${f.filename}`) : [];

    let parsedAi = {};
    if (aiVerification) {
      try {
        parsedAi = typeof aiVerification === 'string' ? JSON.parse(aiVerification) : aiVerification;
      } catch (e) {
        parsedAi = {};
      }
    }

    // Server-side safety guard: Reject if explicitly flagged as AI or unverified
    if (parsedAi.isAiOrAltered) {
      return res.status(400).json({
        message: 'Submission rejected: Image was detected as AI-generated or digitally manipulated.'
      });
    }

    const donation = await Donation.create({
      donationId,
      donor: req.user._id,
      deviceDetails: {
        deviceType: deviceType || 'Other Electronic',
        deviceName: deviceName || deviceType || 'Electronic Device',
        brand: brand || 'Unspecified',
        model: model || 'Standard',
        quantity: Number(quantity) || 1,
        deviceAge: deviceAge || 'N/A',
        accessories: typeof accessories === 'string' ? accessories.split(',').map(a => a.trim()) : (accessories || []),
        description: description || 'No detailed description provided.'
      },
      condition: condition || 'Functional',
      images: imagePaths,
      aiVerification: parsedAi,
      pickupAddress: pickupAddress || req.user.address || 'Ghatkopar, Mumbai, Maharashtra 400086',
      city: city || 'Mumbai',
      pincode: pincode || '400086',
      pickupDate: pickupDate || new Date().toISOString().split('T')[0],
      pickupTimeSlot: pickupTimeSlot || '10:00 AM - 01:00 PM',
      status: 'Submitted'
    });

    res.status(201).json({ message: 'Donation created successfully', donation });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getDonations = async (req, res) => {
  try {
    let query = {};
    if (req.user.role === 'DONOR') {
      query = { donor: req.user._id };
    }
    const donations = await Donation.find(query)
      .populate('donor', 'name email phone address')
      .populate({ path: 'assignedNgo', select: 'ngoName contactPerson contactPhone' })
      .sort({ createdAt: -1 });

    res.json(donations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getDonationById = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id)
      .populate('donor', 'name email phone address')
      .populate('assignedNgo', 'ngoName contactPerson contactPhone');

    if (!donation) {
      return res.status(404).json({ message: 'Donation not found.' });
    }

    if (req.user.role === 'DONOR' && donation.donor._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized access to this donation record.' });
    }

    res.json(donation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateDonationStatus = async (req, res) => {
  try {
    const { status, resolutionNotes } = req.body;
    const donation = await Donation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({ message: 'Donation not found.' });
    }

    const validStatuses = [
      'Submitted',
      'Accepted',
      'Rejected',
      'Distributed',
      'Sent for Recycling',
      'Completed'
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status workflow step.' });
    }

    donation.status = status;
    if (resolutionNotes) {
      donation.resolutionNotes = resolutionNotes;
    }

    if (req.user.role === 'NGO') {
      const ngo = await NGO.findOne({ user: req.user._id });
      if (ngo) {
        donation.assignedNgo = ngo._id;
      }
    }

    await donation.save();
    res.json({ message: 'Donation updated successfully', donation });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};