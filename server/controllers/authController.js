const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

// Helper function to generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '7d', // Token expires in 7 days
  });
};

// Helper function to create and send response with token
const createSendToken = (user, statusCode, res) => {
  const token = generateToken(user._id);
  
  // Remove password from output
  user.password = undefined;
  
  res.status(statusCode).json({
    success: true,
    message: statusCode === 201 ? 'User registered successfully' : 'Login successful',
    token,
    data: {
      user: {
        id: user._id,
        email: user.email,
        shopName: user.shopName,
        ownerName: user.ownerName,
        designation: user.designation,
        status: user.status,
        businessInfo: user.businessInfo,
        createdAt: user.createdAt
      }
    }
  });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
exports.registerUser = async (req, res, next) => {
  try {
    const {
      shopName,
      ownerName,
      designation,
      email,
      password,
      confirmPassword,
      address,
      gstin,
      businessType
    } = req.body;

    // Input validation
    if (!shopName || !ownerName || !designation || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
        errors: {
          required: ['shopName', 'ownerName', 'designation', 'email', 'password']
        }
      });
    }

    // Password confirmation validation
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match',
        errors: {
          confirmPassword: 'Password confirmation does not match'
        }
      });
    }

    // Password strength validation
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long',
        errors: {
          password: 'Password must be at least 6 characters long'
        }
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User with this email already exists',
        errors: {
          email: 'Email is already registered'
        }
      });
    }

    // Validate GSTIN if provided
    if (gstin) {
      const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
      if (!gstinRegex.test(gstin.toUpperCase())) {
        return res.status(400).json({
          success: false,
          message: 'Invalid GSTIN format',
          errors: {
            gstin: 'Please provide a valid 15-digit GSTIN'
          }
        });
      }

      // Check if GSTIN already exists
      const existingGSTIN = await User.findOne({ gstin: gstin.toUpperCase() });
      if (existingGSTIN) {
        return res.status(409).json({
          success: false,
          message: 'GSTIN already registered with another account',
          errors: {
            gstin: 'This GSTIN is already in use'
          }
        });
      }
    }

    // Validate address structure
    if (!address || !address.street || !address.city || !address.state || !address.pincode) {
      return res.status(400).json({
        success: false,
        message: 'Complete address information is required',
        errors: {
          address: 'Street, city, state, and pincode are required'
        }
      });
    }

    // Create new user
    const userData = {
      shopName: shopName.trim(),
      ownerName: ownerName.trim(),
      designation: designation.toLowerCase(),
      email: email.toLowerCase().trim(),
      password, // Will be hashed by pre-save middleware
      address: {
        street: address.street.trim(),
        city: address.city.trim(),
        state: address.state.trim(),
        pincode: address.pincode.trim(),
        country: address.country || 'India'
      },
      businessType: businessType || 'retail_pharmacy'
    };

    // Add GSTIN if provided
    if (gstin) {
      userData.gstin = gstin.toUpperCase().replace(/\s/g, '');
    }

    const newUser = await User.create(userData);

    console.log(`✅ New user registered: ${newUser.email}`);

    // Send response with token
    createSendToken(newUser, 201, res);

  } catch (error) {
    console.error('❌ Registration error:', error);

    // Handle mongoose validation errors
    if (error.name === 'ValidationError') {
      const errors = {};
      Object.keys(error.errors).forEach(key => {
        errors[key] = error.errors[key].message;
      });
      
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }

    // Handle duplicate key error
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(409).json({
        success: false,
        message: `${field} already exists`,
        errors: {
          [field]: `This ${field} is already registered`
        }
      });
    }

    // Handle other errors
    res.status(500).json({
      success: false,
      message: 'Internal server error during registration',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
        errors: {
          email: !email ? 'Email is required' : undefined,
          password: !password ? 'Password is required' : undefined
        }
      });
    }

    // Find user and include password field
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
        errors: {
          auth: 'Email or password is incorrect'
        }
      });
    }

    // Check password
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
        errors: {
          auth: 'Email or password is incorrect'
        }
      });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    console.log(`✅ User logged in: ${user.email}`);

    // Send response with token
    createSendToken(user, 200, res);

  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during login',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/profile
// @access  Private
exports.getProfile = async (req, res) => {
  try {
    // req.user is set by auth middleware
    const user = await User.findById(req.user.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user._id,
          email: user.email,
          shopName: user.shopName,
          ownerName: user.ownerName,
          designation: user.designation,
          status: user.status,
          address: user.address,
          gstin: user.gstin,
          businessType: user.businessType,
          businessInfo: user.businessInfo,
          isActive: user.isActive,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          lastLogin: user.lastLogin
        }
      }
    });
  } catch (error) {
    console.error('❌ Profile fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching profile'
    });
  }
};
