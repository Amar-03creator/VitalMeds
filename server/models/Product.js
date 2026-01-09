// server/models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    minlength: [5, 'Product name must be at least 5 characters long'],
    maxlength: [200, 'Product name cannot exceed 200 characters']
  },

  hsn: {
    type: String,
    required: [true, 'HSN code is required'],
    trim: true,

  },

  company: {
    type: String,
    required: [true, 'Company/Manufacturer is required'],
    trim: true,
    enum: {
      values: ['Incepta', 'Biocon', 'Abbott', 'Cipla'],
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
        'Calcium',
        'Iron',
        'Dental',
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

  // Standard pricing (can be overridden by batch)
  standardMRP: {
    type: Number,
    required: [true, 'Standard MRP is required'],
    min: [0, 'MRP cannot be negative'],
    max: [100000, 'MRP seems unreasonably high']
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
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for total stock across all batches
productSchema.virtual('totalStock', {
  ref: 'ProductBatch',
  localField: '_id',
  foreignField: 'product',
  count: false,
  match: { isActive: true }
});

// Virtual for available batches
productSchema.virtual('batches', {
  ref: 'ProductBatch',
  localField: '_id',
  foreignField: 'product'
});

// Indexes
productSchema.index({ productName: 1 });
productSchema.index({ company: 1 });
productSchema.index({ category: 1 });
productSchema.index({ createdAt: -1 });

// Static method to get product with all batches
productSchema.statics.getWithBatches = function(productId) {
  return this.findById(productId).populate('batches');
};

// Static method to get product with total stock
productSchema.statics.getWithTotalStock = async function(productId) {
  const ProductBatch = mongoose.model('ProductBatch');
  
  const product = await this.findById(productId).lean();
  if (!product) return null;
  
  const batches = await ProductBatch.find({ 
    product: productId, 
    isActive: true 
  });
  
  product.totalStock = batches.reduce((sum, batch) => sum + batch.stock, 0);
  return product;
};

// Instance method to check if product has stock
productSchema.methods.hasStock = async function() {
  const ProductBatch = mongoose.model('ProductBatch');
  const totalStock = await ProductBatch.aggregate([
    { $match: { product: this._id, isActive: true } },
    { $group: { _id: null, total: { $sum: '$stock' } } }
  ]);
  return totalStock.length > 0 && totalStock[0].total > 0;
};


// Text search index
productSchema.index({
  productName: 'text',
  composition: 'text',
  company: 'text'
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
