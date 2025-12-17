const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const customerSchema = new mongoose.Schema({
  // Basic Business Information
  establishmentName: {
    type: String,
    required: [true, 'Establishment name is required'],
    trim: true,
    index: true
  },

  // Contact Person Details
  contactName: {
    type: String,
    required: [true, 'Contact name is required'],
    trim: true
  },

  designation: {
    type: String,
    enum: ['Owner', 'Manager', 'Doctor', 'Pharmacist', 'Other'],
    default: 'Owner'
  },

  // Contact Information
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },

  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
    unique: true,
    match: [/^[6-9]\d{9}$/, 'Please provide a valid 10-digit Indian phone number']
  },

  alternatePhone: {
    type: String,
    match: [/^[6-9]\d{9}$/, 'Please provide a valid 10-digit Indian phone number']
  },

  // Authentication
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
    select: false
  },

  // Address
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true }, // ✅ FIXED - removed index: true
    state: { type: String, required: true },
    pincode: {
      type: String,
      required: true,
      match: [/^\d{6}$/, 'Please provide a valid 6-digit pincode']
    },
    country: { type: String, default: 'India' }
  },

  totalRevenue: {
    type: Number,
    default: 0,
    min: 0
  },

  // ✅ ADD THIS NEW FIELD
  revenueThisMonth: {
    type: Number,
    default: 0,
    min: 0
  },


  // Business Type
  businessType: {
    type: String,
    required: [true, 'Business type is required'],
    enum: ['Retail Pharmacy', 'Hospital', 'Clinic', 'Distributor', 'Other']
  },

  // Legal Documents
  gstin: {
    type: String,
    match: [/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, 'Invalid GSTIN format']
  },

  aadhaar: {
    type: String,
    match: [/^\d{12}$/, 'Invalid Aadhaar format']
  },

  panNumber: {
    type: String,
    match: [/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN format']
  },

  drugLicenseNumber: {
    type: String,
    required: [true, 'Drug License Number is required']
  },

  // Financial Information
  creditLimit: {
    type: Number,
    default: 50000,
    min: 0
  },

  outstandingAmount: {
    type: Number,
    default: 0,
    min: 0
  },

  totalRevenue: {
    type: Number,
    default: 0,
    min: 0
  },

  // Order Statistics
  totalOrders: {
    type: Number,
    default: 0,
    min: 0
  },

  ordersThisMonth: {
    type: Number,
    default: 0,
    min: 0
  },

  lastOrderDate: {
    type: Date,
    default: null
  },

  // Account Status
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'Suspended', 'Credit Alert'],
    default: 'Active'
  },

  isVerified: {
    type: Boolean,
    default: false
  },

  verificationDate: {
    type: Date
  },

  // Payment Terms
  paymentTerms: {
    type: String,
    enum: ['Cash', 'Credit-7', 'Credit-15', 'Credit-30', 'Credit-45', 'Credit-60'],
    default: 'Credit-30'
  },

  // Additional Details
  notes: {
    type: String,
    maxlength: 1000
  },

  // Registration & Last Activity
  registeredDate: {
    type: Date,
    default: Date.now
  },

  lastLoginDate: {
    type: Date
  },

  // Metadata
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  },

  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  }

}, {
  timestamps: true
});

// ✅ FIXED - Indexes for performance (only once)
customerSchema.index({ establishmentName: 'text', contactName: 'text', email: 'text' });
customerSchema.index({ 'address.city': 1 }); // Only here, not in the field definition
customerSchema.index({ status: 1 });
customerSchema.index({ businessType: 1 });
customerSchema.index({ outstandingAmount: -1 });
customerSchema.index({ totalOrders: -1 });

// Hash password before saving
customerSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password method
customerSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Update status based on outstanding amount
customerSchema.methods.updateStatus = function () {
  if (this.outstandingAmount > this.creditLimit * 0.9) {
    this.status = 'Credit Alert';
  } else if (this.status === 'Credit Alert' && this.outstandingAmount < this.creditLimit * 0.7) {
    this.status = 'Active';
  }
};

// Calculate days since last order
customerSchema.virtual('daysSinceLastOrder').get(function () {
  if (!this.lastOrderDate) return null;
  const diff = Date.now() - this.lastOrderDate.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
});

// Virtuals for JSON
customerSchema.set('toJSON', { virtuals: true });
customerSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Customer', customerSchema);
