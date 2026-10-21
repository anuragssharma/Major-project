const express = require('express');
const router = express.Router();
const userManagementController = require('../controllers/userManagementController');
const { verifyToken, authorize } = require('../middleware/authMiddleware');

// 1. Get all users
router.get(
  '/',
  verifyToken,
  authorize('NGO'),
  userManagementController.getAllUsers
);

// 2. Get single user details and their donation list
router.get(
  '/:id',
  verifyToken,
  authorize('NGO'),
  userManagementController.getUserById
);

// 3. Option B: Suspend / Reactivate Status
router.patch(
  '/:id/status',
  verifyToken,
  authorize('NGO'),
  userManagementController.toggleUserStatus
);

// 4. Delete user
router.delete(
  '/:id',
  verifyToken,
  authorize('NGO'),
  userManagementController.deleteUser
);

module.exports = router;