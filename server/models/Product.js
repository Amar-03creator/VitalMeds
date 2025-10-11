// server/models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    minlength: [2, 'Product name must be at least 2 characters long'],
    maxlength: [200, 'Product name cannot exceed 200 characters']
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
      values: ['Company A', 'Company B', 'Company C', 'Company D'],
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
  
  isNew: {
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
    transform: function(doc, ret) {
      delete ret.__v;
      return ret;
    }
  }
});

// Indexes for better query performance
productSchema.index({ name: 1 });
productSchema.index({ sku: 1 });
productSchema.index({ company: 1 });
productSchema.index({ category: 1 });
productSchema.index({ mrp: 1 });
productSchema.index({ stock: 1 });
productSchema.index({ createdAt: -1 });

// Text index for search
productSchema.index({
  name: 'text',
  sku: 'text',
  composition: 'text',
  company: 'text'
});

// Virtual for stock status
productSchema.virtual('stockStatus').get(function() {
  if (this.stock === 0) return 'Out of Stock';
  if (this.stock < 50) return 'Low Stock';
  return 'In Stock';
});

// Static method to search products
productSchema.statics.searchProducts = function(searchQuery) {
  if (!searchQuery) {
    return this.find({ isActive: true });
  }
  
  return this.find({
    $text: { $search: searchQuery },
    isActive: true
  });
};

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
