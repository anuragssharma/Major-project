const User = require('../models/User');
const Donation = require('../models/Donation');
const NGO = require('../models/NGO');

// @desc    Get all registered users
// @route   GET /api/users
// @access  Private [ADMIN, NGO]
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
};

// @desc    Get single user by ID along with their donations
// @route   GET /api/users/:id
// @access  Private [ADMIN, NGO]
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const donations = await Donation.find({ donor: id }).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: {
        user,
        donations
      }
    });
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
};

// @desc    Toggle user status (Option B: Suspend / Reactivate)
// @route   PATCH /api/users/:id/status
// @access  Private [ADMIN, NGO]
exports.toggleUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (req.user && (req.user.id === id || req.user._id?.toString() === id)) {
      return res.status(400).json({ success: false, message: 'You cannot change your own status' });
    }

    const newStatus = status || (user.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE');
    user.status = newStatus;
    await user.save();

    res.json({
      success: true,
      message: `User status updated to ${newStatus}`,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status
      }
    });
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private [ADMIN, NGO]
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (req.user && (req.user.id === id || req.user._id?.toString() === id)) {
      return res.status(400).json({ success: false, message: 'You cannot delete your own account' });
    }

    await Donation.deleteMany({ donor: id });
    await NGO.deleteMany({ user: id });
    await User.findByIdAndDelete(id);

    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
};