const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

// User Schema for B2B Pharmacy Application
const userSchema = new mongoose.Schema({
  // Basic Business Information
  shopName: {
    type: String,
    required: [true, 'Shop name is required'],
    trim: true,
    minlength: [2, 'Shop name must be at least 2 characters long'],
    maxlength: [100, 'Shop name cannot exceed 100 characters']
  },
  
  ownerName: {
    type: String,
    required: [true, 'Owner name is required'],
    trim: true,
    minlength: [2, 'Owner name must be at least 2 characters long'],
    maxlength: [50, 'Owner name cannot exceed 50 characters']
  },
  
  designation: {
    type: String,
    required: [true, 'Designation is required'],
    enum: {
      values: ['owner', 'manager', 'doctor', 'pharmacist', 'other'],
      message: 'Designation must be one of: owner, manager, doctor, pharmacist, or other'
    },
    lowercase: true
  },
  
  // Authentication Fields
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email address'
    ]
  },
  
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
    select: false // Don't include password in queries by default
  },
  
  // Address Information
  address: {
    street: {
      type: String,
      required: [true, 'Street address is required'],
      trim: true
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true
    },
    state: {
      type: String,
      required: [true, 'State is required'],
      trim: true
    },
    pincode: {
      type: String,
      required: [true, 'Pincode is required'],
      match: [/^[1-9][0-9]{5}$/, 'Please provide a valid 6-digit pincode']
    },
    country: {
      type: String,
      default: 'India',
      trim: true
    }
  },
  
  // GSTIN for B2B Verification
  gstin: {
    type: String,
    sparse: true, // Allows multiple null values but ensures uniqueness when present
    uppercase: true,
    trim: true,
    match: [
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
      'Please provide a valid 15-digit GSTIN'
    ]
  },
  
  // Approval Status for B2B Platform
  status: {
    type: String,
    enum: {
      values: ['Pending Approval', 'Approved', 'Rejected'],
      message: 'Status must be either Pending Approval, Approved, or Rejected'
    },
    default: 'Pending Approval'
  },
  
  // Additional B2B Fields
  businessType: {
    type: String,
    enum: ['retail_pharmacy', 'hospital', 'clinic', 'distributor', 'other'],
    default: 'retail_pharmacy'
  },
  
  verificationNotes: {
    type: String,
    trim: true,
    maxlength: [500, 'Verification notes cannot exceed 500 characters']
  },
  
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    default: null
  },
  
  approvedAt: {
    type: Date,
    default: null
  },
  
  isActive: {
    type: Boolean,
    default: true
  },
  
  lastLogin: {
    type: Date,
    default: null
  }
}, {
  // Automatic timestamps
  timestamps: true,
  
  // Transform output
  toJSON: {
    transform: function(doc, ret) {
      delete ret.password;
      delete ret.__v;
      return ret;
    }
  }
});

// Indexes for better query performance
userSchema.index({ gstin: 1 }, { sparse: true });
userSchema.index({ status: 1 });
userSchema.index({ createdAt: -1 });

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) {
    return next();
  }

  try {
    // Generate salt with cost factor of 12 (recommended for 2025)
    const salt = await bcryptjs.genSalt(12);
    
    // Hash password with salt
    this.password = await bcryptjs.hash(this.password, salt);
    
    console.log(`✅ Password hashed successfully for user: ${this.email}`);
    next();
  } catch (error) {
    console.error('❌ Error hashing password:', error);
    next(error);
  }
});

// Pre-save middleware to format GSTIN
userSchema.pre('save', function(next) {
  if (this.gstin) {
    this.gstin = this.gstin.toUpperCase().replace(/\s/g, '');
  }
  next();
});

// Instance method to check password
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcryptjs.compare(candidatePassword, this.password);
  } catch (error) {
    console.error('❌ Error comparing passwords:', error);
    throw error;
  }
};

// Instance method to get full address as string
userSchema.methods.getFullAddress = function() {
  const { street, city, state, pincode, country } = this.address;
  return `${street}, ${city}, ${state} - ${pincode}, ${country}`;
};

// Static method to find users by status
userSchema.statics.findByStatus = function(status) {
  return this.find({ status });
};

// Static method to find pending approvals
userSchema.statics.findPendingApprovals = function() {
  return this.find({ status: 'Pending Approval' }).sort({ createdAt: 1 });
};

// Virtual for user's full business info
userSchema.virtual('businessInfo').get(function() {
  return {
    shopName: this.shopName,
    ownerName: this.ownerName,
    designation: this.designation,
    businessType: this.businessType,
    address: this.getFullAddress()
  };
});

// Pre-remove middleware (for cleanup if user is deleted)
userSchema.pre('remove', async function(next) {
  console.log(`🗑️  Removing user: ${this.email}`);
  // Here you can add cleanup logic like removing related inquiries, orders, etc.
  next();
});

// Create and export the model
const User = mongoose.model('User', userSchema);

module.exports = User;
