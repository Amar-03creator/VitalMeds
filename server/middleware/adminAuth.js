// server/middleware/adminAuth.js
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// Middleware to protect admin routes
exports.protectAdmin = async (req, res, next) => {
  try {
    let token;

    // Get token from header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // Make sure token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, no token provided',
        errors: {
          auth: 'Access token is required'
        }
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Get admin from token
      const currentAdmin = await Admin.findById(decoded.userId);
      
      if (!currentAdmin) {
        return res.status(401).json({
          success: false,
          message: 'Admin no longer exists',
          errors: {
            auth: 'Invalid token - admin not found'
          }
        });
      }

      // Check if admin is active
      if (!currentAdmin.isActive) {
        return res.status(401).json({
          success: false,
          message: 'Admin account is deactivated',
          errors: {
            auth: 'Account is not active'
          }
        });
      }

      // Grant access to protected route
      req.admin = decoded;
      next();

    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({
          success: false,
          message: 'Invalid token',
          errors: {
            auth: 'Token is malformed'
          }
        });
      } else if (error.name === 'TokenExpiredError') {
        return res.status(401).json({
          success: false,
          message: 'Token expired',
          errors: {
            auth: 'Please login again'
          }
        });
      } else {
        throw error;
      }
    }

  } catch (error) {
    console.error('❌ Admin auth middleware error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error in authentication'
    });
  }
};

module.exports = exports;
