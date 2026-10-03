const User = require('../models/User');
const NGO = require('../models/NGO');
const Donation = require('../models/Donation');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllNgos = async (req, res) => {
  try {
    const ngos = await NGO.find().populate('user', 'name email phone address').sort({ createdAt: -1 });
    res.json(ngos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAdminStats = async (req, res) => {
  try {
    const [totalUsers, totalNgos, pendingNgos, totalDonations, statusStats] = await Promise.all([
      User.countDocuments(),
      NGO.countDocuments(),
      NGO.countDocuments({ approvalStatus: 'PENDING' }),
      Donation.countDocuments(),
      Donation.aggregate([
        { $group: { _id: "$status", count: { $sum: 1 } } }
      ])
    ]);
    res.json({
      totalUsers,
      totalNgos,
      pendingNgos,
      totalDonations,
      statusStats: statusStats.reduce((acc, curr) => ({ ...acc, [curr._id]: curr.count }), {})
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 1. Delete a User (and associated donations)
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Prevent admin from accidentally deleting their own account
    if (req.user._id.toString() === id.toString()) {
      return res.status(400).json({ message: 'You cannot delete your own administrative account.' });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Cascade delete any NGO profile linked to this user
    await NGO.findOneAndDelete({ user: id });

    // Clean up donations submitted by this user
    await Donation.deleteMany({ donor: id });

    // Remove user
    await User.findByIdAndDelete(id);

    res.json({ message: 'User and associated records deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 2. Delete an NGO (and unassign/reset their claimed donations)
exports.deleteNgo = async (req, res) => {
  try {
    const { id } = req.params;

    const ngo = await NGO.findById(id);
    if (!ngo) {
      return res.status(404).json({ message: 'NGO record not found.' });
    }

    // Unassign donations assigned to this NGO
    await Donation.updateMany(
      { assignedNgo: id },
      { $set: { assignedNgo: null, status: 'Submitted' } }
    );

    // Delete the underlying User account linked to the NGO
    if (ngo.user) {
      await User.findByIdAndDelete(ngo.user);
    }

    // Remove NGO entry
    await NGO.findByIdAndDelete(id);

    res.json({ message: 'NGO organization and login account deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};