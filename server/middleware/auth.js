const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to protect routes
exports.protect = async (req, res, next) => {
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
      
      // Get user from token
      const currentUser = await User.findById(decoded.userId);
      
      if (!currentUser) {
        return res.status(401).json({
          success: false,
          message: 'User no longer exists',
          errors: {
            auth: 'Invalid token - user not found'
          }
        });
      }

      // Check if user is active
      if (!currentUser.isActive) {
        return res.status(401).json({
          success: false,
          message: 'User account is deactivated',
          errors: {
            auth: 'Account is not active'
          }
        });
      }

      // Grant access to protected route
      req.user = decoded;
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
    console.error('❌ Auth middleware error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error in authentication'
    });
  }
};

// Middleware to restrict to certain roles/statuses
exports.restrictTo = (...allowedStatuses) => {
  return async (req, res, next) => {
    try {
      const user = await User.findById(req.user.userId);
      
      if (!allowedStatuses.includes(user.status)) {
        return res.status(403).json({
          success: false,
          message: 'Access denied',
          errors: {
            authorization: `Access restricted to users with status: ${allowedStatuses.join(', ')}`
          }
        });
      }
      
      next();
    } catch (error) {
      console.error('❌ Role restriction error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error in authorization'
      });
    }
  };
};
