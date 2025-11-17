// server/models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    minlength: [2, 'Product name must be at least 2 characters long'],
    maxlength: [200, 'Product name cannot exceed 200 characters']
  },

  batchNumber: {
    type: String,
    required: [true, 'Batch number is required'],
    uppercase: true,
    trim: true,
    maxlength: [50, 'Batch number cannot exceed 50 characters']
  },

  hsn: {
    type: String,
    required: [true, 'HSN code is required'],
    trim: true,
    match: [/^[0-9]{6}$/, 'HSN must be a 6-digit number']
  },

  purchaseRate: {
    type: Number,
    required: [true, 'Purchase rate is required'],
    min: [0, 'Purchase rate cannot be negative'],
    max: [100000, 'Purchase rate seems unreasonably high']
  },

  expiryDate: {
    type: Date,
    required: [true, 'Expiry date is required'],
    validate: {
      validator: function (v) {
        return v > new Date();
      },
      message: 'Expiry date must be in the future'
    }
  },

  sku: {
    type: String,
    required: [true, 'SKU is required'],
    unique: true,
    uppercase: true,
    trim: true,
    match: [/^[A-Z0-9-]+$/, 'SKU must contain only uppercase letters, numbers, and hyphens']
  },

  company: {
  type: String,
  required: [true, 'Company/Manufacturer is required'],
  trim: true,
  enum: {
    values: ['Sun Pharma', 'Cipla', 'Dr. Reddy\'s', 'Lupin', 'Aurobindo', 'Torrent', 'Abbott', 'Novartis', 'GSK','Merck', 'Other'],
    message: 'Invalid company name'
  }
},


  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true,
    enum: {
      values: [
        'Pain Relief',
        'Antibiotics',
        'Antihistamine',
        'Gastro',
        'Diabetes',
        'Cardiovascular',
        'Respiratory',
        'Dermatology',
        'Vitamins & Supplements',
        'Other'
      ],
      message: 'Invalid category'
    }
  },

  composition: {
    type: String,
    required: [true, 'Composition/Salt is required'],
    trim: true,
    maxlength: [500, 'Composition cannot exceed 500 characters']
  },

  packSize: {
    type: String,
    required: [true, 'Pack size is required'],
    trim: true,
    maxlength: [100, 'Pack size cannot exceed 100 characters']
  },

  mrp: {
    type: Number,
    required: [true, 'MRP is required'],
    min: [0, 'MRP cannot be negative'],
    max: [100000, 'MRP seems unreasonably high']
  },

  stock: {
    type: Number,
    required: [true, 'Stock quantity is required'],
    min: [0, 'Stock cannot be negative'],
    default: 0
  },

  description: {
    type: String,
    trim: true,
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },

  images: [{
    type: String,
    trim: true
  }],

  isNewProduct: {
    type: Boolean,
    default: false
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
  timestamps: true,
  toJSON: {
    transform: function (doc, ret) {
      delete ret.__v;
      return ret;
    }
  }
});

// Indexes for better query performance
productSchema.index({ productName: 1 });
productSchema.index({ company: 1 });
productSchema.index({ category: 1 });
productSchema.index({ batchNumber: 1 });
productSchema.index({ expiryDate: 1 });
productSchema.index({ mrp: 1 });
productSchema.index({ stock: 1 });
productSchema.index({ createdAt: -1 });

// Text index for search
productSchema.index({
  productName: 'text',
  sku: 'text',
  composition: 'text',
  company: 'text',
  batchNumber: 'text'
});

// Virtual for stock status
productSchema.virtual('stockStatus').get(function () {
  if (this.stock === 0) return 'Out of Stock';
  if (this.stock < 50) return 'Low Stock';
  return 'In Stock';
});

// Static method to search products
productSchema.statics.searchProducts = function (searchQuery) {
  if (!searchQuery) {
    return this.find({ isActive: true });
  }

  return this.find({
    $text: { $search: searchQuery },
    isActive: true
  });
};
// Virtual for expiry status
productSchema.virtual('expiryStatus').get(function() {
  const now = new Date();
  const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
  
  if (this.expiryDate < now) return 'Expired';
  if (this.expiryDate < thirtyDaysFromNow) return 'Near Expiry';
  return 'Valid';
});

// Virtual for margin calculation
productSchema.virtual('margin').get(function() {
  if (this.purchaseRate === 0) return 0;
  return ((this.mrp - this.purchaseRate) / this.purchaseRate * 100).toFixed(2);
});

// Static method to find expired products
productSchema.statics.findExpired = function() {
  return this.find({ 
    expiryDate: { $lt: new Date() },
    isActive: true 
  });
};

// Static method to find near-expiry products
productSchema.statics.findNearExpiry = function() {
  const thirtyDaysFromNow = new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000);
  return this.find({
    expiryDate: {
      $gte: new Date(),
      $lt: thirtyDaysFromNow
    },
    isActive: true
  });
};

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
