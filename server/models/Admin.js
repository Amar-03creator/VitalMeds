// server/models/Admin.js
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your name'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email'
      ]
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 8,
      select: false
    },
    
    // MFA Settings
    mfaEnabled: {
      type: Boolean,
      default: true
    },
    mfaMethod: {
      type: String,
      enum: ['google_authenticator', 'email', 'sms'],
      default: 'google_authenticator'
    },
    googleAuthSecret: {
      type: String,
      select: false // Don't return by default
    },
    mfaBackupCodes: [
      {
        code: String,
        used: Boolean,
        usedAt: Date
      }
    ],
    
    // OTP Verification
    mfaOtp: {
      type: String,
      select: false
    },
    mfaOtpExpires: Date,
    mfaOtpAttempts: {
      type: Number,
      default: 0
    },
    mfaVerified: Boolean,
    
    // Other fields
    role: {
      type: String,
      enum: ['admin', 'super_admin'],
      default: 'admin'
    },
    permissions: {
      type: [String],
      default: [
        'view_products',
        'create_products',
        'edit_products',
        'delete_products'
      ]
    },
    businessName: String,
    isActive: {
      type: Boolean,
      default: true
    },
    lastLogin: Date,
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

// Hash password
adminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password
adminSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Admin', adminSchema);
