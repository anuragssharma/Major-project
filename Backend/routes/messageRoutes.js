const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const { verifyToken, authorize } = require('../middleware/authMiddleware');

// Public route to submit
router.post('/', messageController.createMessage);

// Protected routes for NGO portal
router.get('/', verifyToken, authorize('NGO'), messageController.getMessages);
router.patch('/:id/status', verifyToken, authorize('NGO'), messageController.updateMessageStatus);
router.delete('/:id', verifyToken, authorize('NGO'), messageController.deleteMessage);

module.exports = router;