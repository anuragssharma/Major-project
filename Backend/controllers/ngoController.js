const NGO = require('../models/NGO');
const User = require('../models/User');

exports.getNgoRequests = async (req, res) => {
  try {
    const requests = await NGO.find({ approvalStatus: 'PENDING' }).populate('user', 'name email phone address');
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.approveNgo = async (req, res) => {
  try {
    const ngo = await NGO.findById(req.params.id);
    if (!ngo) {
      return res.status(404).json({ message: 'NGO record not found.' });
    }

    ngo.approvalStatus = 'APPROVED';
    ngo.rejectionReason = null;
    await ngo.save();

    await User.findByIdAndUpdate(ngo.user, { status: 'ACTIVE' });

    res.json({ message: 'NGO approved successfully', ngo });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.rejectNgo = async (req, res) => {
  try {
    const { rejectionReason } = req.body;
    const ngo = await NGO.findById(req.params.id);
    if (!ngo) {
      return res.status(404).json({ message: 'NGO record not found.' });
    }

    ngo.approvalStatus = 'REJECTED';
    ngo.rejectionReason = rejectionReason || 'Documentation failed verification checks.';
    await ngo.save();

    await User.findByIdAndUpdate(ngo.user, { status: 'INACTIVE' });

    res.json({ message: 'NGO rejected successfully', ngo });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};