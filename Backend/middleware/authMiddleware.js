const jwt = require('jsonwebtoken');
const User = require('../models/User');

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'edonationhub_secret_fallback_key'
    );

    // Fetch user from DB to verify current status
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({ message: 'Account no longer exists.' });
    }

    // Kick out suspended users immediately
    if (user.status === 'SUSPENDED' || user.status === 'BLOCKED') {
      return res.status(403).json({
        message: 'Your account is suspended. Access revoked.'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired session token.' });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.map((r) => r.toUpperCase()).includes(req.user.role?.toUpperCase())) {
      return res.status(403).json({ message: 'Forbidden: Insufficient privileges.' });
    }
    next();
  };
};

module.exports = { verifyToken, authorize };