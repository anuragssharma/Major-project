const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const { getNgoRequests, approveNgo, rejectNgo } = require('../controllers/ngoController');

router.use(protect, authorize('ADMIN'));

router.get('/requests', getNgoRequests);
router.patch('/:id/approve', approveNgo);
router.patch('/:id/reject', rejectNgo);

module.exports = router;