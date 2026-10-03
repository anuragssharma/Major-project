const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { protect } = require('../middleware/auth');
const { register, login, getMe } = require('../controllers/authController');

router.post('/register', upload.single('document'), register);
router.post('/login', login);
router.get('/me', protect, getMe);

module.exports = router;