// server/controllers/productBatchController.js
const ProductBatch = require('../models/ProductBatch');
const Product = require('../models/Product');

// @desc    Get all batches for a product
// @route   GET /api/products/:productId/batches
// @access  Private
exports.getBatchesByProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const batches = await ProductBatch.find({
      product: productId,
      isActive: true
    }).sort({ expiryDate: 1 });

    res.status(200).json({
      success: true,
      data: { batches }
    });

  } catch (error) {
    console.error('❌ Error fetching batches:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching batches'
    });
  }
};

// @desc    Add new batch to product
// @route   POST /api/products/:productId/batches
// @access  Private/Admin
exports.createBatch = async (req, res) => {
  try {
    const { productId } = req.params;
    const {
      batchNumber,
      purchaseRate,
      mrp,
      expiryDate,
      manufactureDate,
      stock
    } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const existingBatch = await ProductBatch.findOne({
      product: productId,
      batchNumber: batchNumber.toUpperCase()
    });

    if (existingBatch) {
      return res.status(409).json({
        success: false,
        message: 'Batch number already exists for this product',
        errors: {
          batchNumber: 'Batch number is already in use'
        }
      });
    }

    const batch = await ProductBatch.create({
      product: productId,
      batchNumber: batchNumber.toUpperCase(),
      purchaseRate,
      mrp,
      expiryDate,
      manufactureDate,
      stock,
      createdBy: req.user.userId
    });

    console.log(`✅ New batch created: ${batch.batchNumber} for ${product.productName}`);

    res.status(201).json({
      success: true,
      message: 'Batch added successfully',
      data: { batch }
    });

  } catch (error) {
    console.error('❌ Error creating batch:', error);

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

    res.status(500).json({
      success: false,
      message: 'Error creating batch',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
  }
};

// @desc    Update batch
// @route   PUT /api/batches/:batchId
// @access  Private/Admin
exports.updateBatch = async (req, res) => {
  try {
    const { batchId } = req.params;
    const updateData = { ...req.body };
    
    updateData.updatedBy = req.user.userId;

    const batch = await ProductBatch.findByIdAndUpdate(
      batchId,
      updateData,
      { new: true, runValidators: true }
    ).populate('product', 'productName');

    if (!batch) {
      return res.status(404).json({
        success: false,
        message: 'Batch not found'
      });
    }

    console.log(`✅ Batch updated: ${batch.batchNumber}`);

    res.status(200).json({
      success: true,
      message: 'Batch updated successfully',
      data: { batch }
    });

  } catch (error) {
    console.error('❌ Error updating batch:', error);

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

    res.status(500).json({
      success: false,
      message: 'Error updating batch',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
  }
};

// @desc    Delete batch (soft delete)
// @route   DELETE /api/batches/:batchId
// @access  Private/Admin
exports.deleteBatch = async (req, res) => {
  try {
    const { batchId } = req.params;

    const batch = await ProductBatch.findByIdAndUpdate(
      batchId,
      { isActive: false, updatedBy: req.user.userId },
      { new: true }
    );

    if (!batch) {
      return res.status(404).json({
        success: false,
        message: 'Batch not found'
      });
    }

    console.log(`🗑️  Batch deleted: ${batch.batchNumber}`);

    res.status(200).json({
      success: true,
      message: 'Batch deleted successfully'
    });

  } catch (error) {
    console.error('❌ Error deleting batch:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting batch',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
  }
};
