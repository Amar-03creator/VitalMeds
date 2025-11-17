// server/controllers/adminAuthController.js
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const {
  generateOTP,
  sendEmailOTP,
  sendSmsOTP,
  verifyTOTP,
  generateGoogleAuthSecret,
  generateQRCode,
  generateBackupCodes
} = require('../utils/mfaUtils');

const generateToken = (adminId) => {
  return jwt.sign(
    { userId: adminId, role: 'admin' },
    process.env.JWT_SECRET,
    { expiresIn: '14h' }
  );
};

// @desc Step 1: Register new admin
exports.adminRegister = async (req, res) => {
  try {
    const { name, email, phoneNumber, password, confirmPassword, businessName } =
      req.body;

    // Validation
    if (!name || !email || !phoneNumber || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match'
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters'
      });
    }

    // Check if admin exists
    const existingAdmin = await Admin.findOne({
      $or: [{ email: email.toLowerCase() }, { phoneNumber }]
    });

    if (existingAdmin) {
      return res.status(409).json({
        success: false,
        message: 'Email or phone number already registered'
      });
    }

    // Generate Google Authenticator secret
    const googleAuthSecret = generateGoogleAuthSecret(email, businessName);
    const qrCode = await generateQRCode(googleAuthSecret);
    const backupCodes = generateBackupCodes();

    // Create admin
    const admin = await Admin.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phoneNumber: phoneNumber.trim(),
      password,
      businessName: businessName?.trim(),
      googleAuthSecret: googleAuthSecret.base32,
      mfaBackupCodes: backupCodes,
      mfaEnabled: true,
      mfaMethod: 'google_authenticator'
    });

    console.log(`✅ New admin registered: ${admin.email}`);

    res.status(201).json({
      success: true,
      message: 'Registration successful! Please save your backup codes.',
      data: {
        adminId: admin._id,
        email: admin.email,
        backupCodes: backupCodes.map((bc) => bc.code),
        qrCode,
        message: 'Scan the QR code with Google Authenticator app'
      }
    });
  } catch (error) {
    console.error('❌ Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed'
    });
  }
};

// @desc Step 1: Admin login - Verify email/phone + password
exports.adminLogin = async (req, res) => {
  try {
    const { emailOrPhone, password } = req.body;

    if (!emailOrPhone || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email/Phone and password required'
      });
    }

    // Find admin by email or phone
    const admin = await Admin.findOne({
      $or: [
        { email: emailOrPhone.toLowerCase() },
        { phoneNumber: emailOrPhone }
      ]
    }).select('+password +mfaMethod');

    if (!admin || !admin.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Verify password
    const isPasswordCorrect = await admin.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate OTP
    const otp = generateOTP();

    // Save OTP to database (valid for 10 minutes)
    admin.mfaOtp = otp;
    admin.mfaOtpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    admin.mfaOtpAttempts = 0;
    admin.mfaVerified = false;
    await admin.save();

    // Send OTP to Google Authenticator by default
    res.status(200).json({
      success: true,
      message: 'OTP sent to Google Authenticator',
      stage: 'mfa_verification',
      mfaSessionId: admin._id, // Frontend will use this
      mfaMethods: {
        current: 'google_authenticator',
        available: ['google_authenticator', 'email', 'sms']
      },
      expiresIn: 600 // 10 seconds countdown
    });

    console.log(`✅ MFA initiated for: ${admin.email}`);
  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed'
    });
  }
};

// @desc Step 2: Send OTP to Email/SMS
exports.sendMfaCode = async (req, res) => {
  try {
    const { mfaSessionId, method } = req.body;

    if (!mfaSessionId || !method) {
      return res.status(400).json({
        success: false,
        message: 'Missing mfaSessionId or method'
      });
    }

    const admin = await Admin.findById(mfaSessionId).select(
      '+mfaOtp +mfaOtpExpires'
    );

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'MFA session expired'
      });
    }

    // Check if OTP is expired
    if (new Date() > admin.mfaOtpExpires) {
      return res.status(400).json({
        success: false,
        message: 'OTP expired. Please login again'
      });
    }

    // Send OTP based on method
    if (method === 'email') {
      await sendEmailOTP(admin.email, admin.mfaOtp);
    } else if (method === 'sms') {
      await sendSmsOTP(admin.phoneNumber, admin.mfaOtp);
    } else if (method === 'google_authenticator') {
      return res.status(400).json({
        success: false,
        message: 'Use Google Authenticator app to get the code'
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Invalid MFA method'
      });
    }

    // Reset OTP timer
    admin.mfaOtpExpires = new Date(Date.now() + 10 * 60 * 1000);
    await admin.save();

    res.status(200).json({
      success: true,
      message: `Code sent to ${method === 'email' ? admin.email : admin.phoneNumber}`,
      expiresIn: 600
    });
  } catch (error) {
    console.error('❌ Send MFA error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send code'
    });
  }
};

// @desc Step 3: Verify MFA code and issue token
exports.verifyMfaCode = async (req, res) => {
  try {
    const { mfaSessionId, code, method } = req.body;

    if (!mfaSessionId || !code || !method) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    const admin = await Admin.findById(mfaSessionId)
      .select('+mfaOtp +mfaOtpExpires +googleAuthSecret')
      .lean();

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'MFA session expired'
      });
    }

    // Check OTP expiration
    if (new Date() > admin.mfaOtpExpires) {
      return res.status(400).json({
        success: false,
        message: 'OTP expired. Please login again'
      });
    }

    let isValid = false;

    if (method === 'google_authenticator') {
      // Verify TOTP
      isValid = verifyTOTP(admin.googleAuthSecret, code);
    } else if (method === 'email' || method === 'sms') {
      // Verify OTP
      isValid = code === admin.mfaOtp;

      // Increment attempts
      if (!isValid) {
        admin.mfaOtpAttempts = (admin.mfaOtpAttempts || 0) + 1;

        if (admin.mfaOtpAttempts > 5) {
          await Admin.findByIdAndUpdate(mfaSessionId, {
            mfaOtpExpires: new Date() // Expire OTP
          });

          return res.status(400).json({
            success: false,
            message: 'Too many failed attempts. Please login again'
          });
        }
      }
    }

    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid MFA code'
      });
    }

    // Update last login
    await Admin.findByIdAndUpdate(mfaSessionId, {
      lastLogin: new Date(),
      mfaOtp: undefined,
      mfaOtpExpires: undefined,
      mfaVerified: true
    });

    // Generate JWT token
    const token = generateToken(admin._id);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      data: {
        admin: {
          id: admin._id,
          email: admin.email,
          name: admin.name,
          businessName: admin.businessName
        }
      }
    });

    console.log(`✅ Admin authenticated: ${admin.email}`);
  } catch (error) {
    console.error('❌ MFA verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Verification failed'
    });
  }
};
