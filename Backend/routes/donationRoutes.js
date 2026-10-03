const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { protect, authorize } = require('../middleware/auth');
const {
  createDonation,
  getDonations,
  getDonationById,
  updateDonationStatus,
  verifyUploadedImage
} = require('../controllers/donationController');

router.use(protect);

// Pre-submission image verification route
router.post('/verify-image', upload.single('image'), verifyUploadedImage);

router.route('/')
  .post(authorize('DONOR', 'NGO'), upload.array('images', 5), createDonation)
  .get(getDonations);

router.route('/:id')
  .get(getDonationById);

router.route('/:id/status')
  .patch(authorize('NGO', 'ADMIN'), updateDonationStatus);

module.exports = router;