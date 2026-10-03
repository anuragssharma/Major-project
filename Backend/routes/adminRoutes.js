const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getAllUsers,
  getAllNgos,
  getAdminStats,
  deleteUser,
  deleteNgo
} = require('../controllers/adminController');

router.use(protect, authorize('ADMIN'));

router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);

router.get('/ngos', getAllNgos);
router.delete('/ngos/:id', deleteNgo);

router.get('/stats', getAdminStats);

module.exports = router;