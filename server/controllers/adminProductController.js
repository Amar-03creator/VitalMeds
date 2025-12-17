// server/controllers/adminProductController.js
const Product = require('../models/Product');

// Get all products (admin view)
exports.getAllProductsAdmin = async (req, res) => {
  try {
    const { search, category, company, sortBy } = req.query;

    let query = {};

    if (search) {
      query.$or = [
        { productName: { $regex: search, $options: 'i' } },
        { sku: { $regex: search, $options: 'i' } },
        { batchNumber: { $regex: search, $options: 'i' } },
        { composition: { $regex: search, $options: 'i' } }
      ];
    }

    if (category && category !== 'all') {
      query.category = category;
    }

    if (company && company !== 'all') {
      query.company = company;
    }

    // ✅ UPDATED: Sort logic - Always prioritize expiry date
    let sortQuery = {};

    switch (sortBy) {
      case 'name-asc':
        // Same medicine name together, earliest expiry first
        sortQuery = { productName: 1, expiryDate: 1 };
        break;
      case 'name-desc':
        // Same medicine name together (Z-A), earliest expiry first
        sortQuery = { productName: -1, expiryDate: 1 };
        break;
      case 'expiry-asc':
        // Earliest expiry first (across all products)
        sortQuery = { expiryDate: 1, productName: 1 };
        break;
      case 'expiry-desc':
        // Latest expiry first
        sortQuery = { expiryDate: -1, productName: 1 };
        break;
      case 'stock-low':
        // Lowest stock first, then earliest expiry
        sortQuery = { stock: 1, expiryDate: 1 };
        break;
      case 'stock-high':
        // Highest stock first, then earliest expiry
        sortQuery = { stock: -1, expiryDate: 1 };
        break;
      case 'mrp-low':
        // Lowest MRP first, then earliest expiry
        sortQuery = { mrp: 1, expiryDate: 1 };
        break;
      case 'mrp-high':
        // Highest MRP first, then earliest expiry
        sortQuery = { mrp: -1, expiryDate: 1 };
        break;
      case 'batch-asc':
        // Batch number A-Z, then earliest expiry
        sortQuery = { batchNumber: 1, expiryDate: 1 };
        break;
      case 'batch-desc':
        // Batch number Z-A, then earliest expiry
        sortQuery = { batchNumber: -1, expiryDate: 1 };
        break;
      default:
        // Default: Group by product name, show earliest expiry first
        sortQuery = { productName: 1, expiryDate: 1 };
    }

    const products = await Product.find(query).sort(sortQuery);

    console.log(`✅ Fetched ${products.length} products (Sorted by: ${sortBy || 'default'})`);

    // Return array directly
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching products',
      error: error.message
    });
  }
};

// Get single product
exports.getProductByIdAdmin = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching product',
      error: error.message
    });
  }
};

// Create product
exports.createProductAdmin = async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product
    });
  } catch (error) {
    console.error('Error creating product:', error);

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: messages
      });
    }

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Duplicate SKU - Product already exists',
        error: error.message
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error creating product',
      error: error.message
    });
  }
};

// Update product
exports.updateProductAdmin = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: product
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: messages
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error updating product',
      error: error.message
    });
  }
};

// Delete product
exports.deleteProductAdmin = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting product',
      error: error.message
    });
  }
};
