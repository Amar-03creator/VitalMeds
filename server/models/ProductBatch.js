// server/models/ProductBatch.js
const mongoose = require('mongoose');

const productBatchSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Product reference is required']
  },

  batchNumber: {
    type: String,
    required: [true, 'Batch number is required'],
    uppercase: true,
    trim: true,
    maxlength: [50, 'Batch number cannot exceed 50 characters']
  },

  purchaseRate: {
    type: Number,
    required: [true, 'Purchase rate is required'],
    min: [0, 'Purchase rate cannot be negative'],
    max: [10000, 'Purchase rate seems unreasonably high']
  },

  mrp: {
    type: Number,
    required: [true, 'MRP is required'],
    min: [0, 'MRP cannot be negative'],
    max: [100000, 'MRP seems unreasonably high']
  },

  sellingPrice: {
    type: Number,
    required: false,
    min: [0, 'Selling price cannot be negative']
  },

  expiryDate: {
    type: Date,
    required: [true, 'Expiry date is required']
  },

  manufactureDate: {
    type: Date,
    required: false
  },

  stock: {
    type: Number,
    required: [true, 'Stock quantity is required'],
    min: [0, 'Stock cannot be negative'],
    default: 0
  },

  isActive: {
    type: Boolean,
    default: true
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: false
  },

  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: false
  }
}, {
  timestamps: true
});

// Compound unique index: One batch number per product
productBatchSchema.index({ product: 1, batchNumber: 1 }, { unique: true });
productBatchSchema.index({ expiryDate: 1 });
productBatchSchema.index({ stock: 1 });

// Auto-calculate selling price
productBatchSchema.pre('save', function(next) {
  if (this.mrp) {
    this.sellingPrice = this.mrp * 0.8; // 20% discount
  }
  next();
});

// Virtual for expiry status
productBatchSchema.virtual('expiryStatus').get(function() {
  const now = new Date();
  const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

  if (this.expiryDate < now) return 'Expired';
  if (this.expiryDate < thirtyDaysFromNow) return 'Near Expiry';
  return 'Valid';
});

// Virtual for margin
productBatchSchema.virtual('margin').get(function() {
  if (this.purchaseRate === 0) return 0;
  return ((this.mrp - this.purchaseRate) / this.purchaseRate * 100).toFixed(2);
});

const ProductBatch = mongoose.model('ProductBatch', productBatchSchema);
module.exports = ProductBatch;
