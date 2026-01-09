// server/controllers/productController.js
const Product = require('../models/Product');
const ProductBatch = require('../models/ProductBatch');

// @desc    Get all products with filtering, sorting, and pagination
// @route   GET /api/products
// @access  Private
exports.getProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      search = '',
      company = '',
      category = '',
      minPrice = 0,
      maxPrice = 100000,
      inStock = '',
      sortBy = 'productName',
      sortOrder = 'asc'
    } = req.query;

    // Build filter query
    const filter = { isActive: true };

    // Search filter (removed sku, now searches: productName, composition, company)
    if (search) {
      filter.$or = [
        { productName: { $regex: search, $options: 'i' } },
        { composition: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } }
      ];
    }

    // Company filter (supports multiple companies)
    if (company) {
      const companies = company.split(',');
      filter.company = { $in: companies };
    }

    // Category filter (supports multiple categories)
    if (category) {
      const categories = category.split(',');
      filter.category = { $in: categories };
    }

    // Price range filter (now uses standardMRP)
    if (minPrice || maxPrice) {
      filter.standardMRP = {
        $gte: parseFloat(minPrice),
        $lte: parseFloat(maxPrice)
      };
    }

    // Build sort object
    const sortOptions = {};
    const sortField = sortBy || 'productName';
    const sortDirection = sortOrder === 'desc' ? -1 : 1;
    sortOptions[sortField] = sortDirection;

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Execute query - get products first
    let products = await Product.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNum)
      .lean();

    // Get total stock for each product from batches
    const productIds = products.map(p => p._id);
    
    const batchStockData = await ProductBatch.aggregate([
      { 
        $match: { 
          product: { $in: productIds }, 
          isActive: true 
        } 
      },
      { 
        $group: { 
          _id: '$product', 
          totalStock: { $sum: '$stock' } 
        } 
      }
    ]);

    // Create a map of product ID to total stock
    const stockMap = {};
    batchStockData.forEach(item => {
      stockMap[item._id.toString()] = item.totalStock;
    });

    // Add totalStock to each product
    products = products.map(product => ({
      ...product,
      totalStock: stockMap[product._id.toString()] || 0
    }));

    // Apply stock filter AFTER calculating stock
    if (inStock === 'true') {
      products = products.filter(p => p.totalStock > 0);
    }

    // Get total count for pagination
    const totalProducts = await Product.countDocuments(filter);

    // Calculate pagination metadata
    const totalPages = Math.ceil(totalProducts / limitNum);
    const hasNextPage = pageNum < totalPages;
    const hasPrevPage = pageNum > 1;

    res.status(200).json({
      success: true,
      data: {
        products,
        pagination: {
          currentPage: pageNum,
          totalPages,
          totalProducts,
          limit: limitNum,
          hasNextPage,
          hasPrevPage
        }
      }
    });

  } catch (error) {
    console.error('❌ Error fetching products:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching products',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
  }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Private
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    // Get product and populate batches
    const product = await Product.findById(id)
      .populate({
        path: 'batches',
        match: { isActive: true },
        options: { sort: { expiryDate: 1 } } // FEFO: earliest expiry first
      })
      .lean();

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    if (!product.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Product is no longer available'
      });
    }

    // Calculate total stock from batches
    const totalStock = product.batches
      ? product.batches.reduce((sum, batch) => sum + (batch.stock || 0), 0)
      : 0;

    // Add totalStock to product object
    product.totalStock = totalStock;

    res.status(200).json({
      success: true,
      data: { product }
    });

  } catch (error) {
    console.error('❌ Error fetching product:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID format'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error fetching product',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
  }
};

// @desc    Get product filters metadata (companies, categories, price range)
// @route   GET /api/products/filters/metadata
// @access  Private
exports.getFiltersMetadata = async (req, res) => {
  try {
    const [companies, categories, priceStats] = await Promise.all([
      Product.distinct('company', { isActive: true }),
      Product.distinct('category', { isActive: true }),
      Product.aggregate([
        { $match: { isActive: true } },
        {
          $group: {
            _id: null,
            minPrice: { $min: '$standardMRP' },  // Changed from $mrp
            maxPrice: { $max: '$standardMRP' }   // Changed from $mrp
          }
        }
      ])
    ]);

    res.status(200).json({
      success: true,
      data: {
        companies: companies.sort(),
        categories: categories.sort(),
        priceRange: {
          min: priceStats[0]?.minPrice || 0,
          max: priceStats[0]?.maxPrice || 10000
        }
      }
    });

  } catch (error) {
    console.error('❌ Error fetching filter metadata:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching filter metadata'
    });
  }
};

// @desc    Create new product (Admin only)
// @route   POST /api/products
// @access  Private/Admin
exports.createProduct = async (req, res) => {
  try {
    const {
      productName,
      hsn,
      company,
      category,
      composition,
      packSize,
      standardMRP,
      description,
      images,
      isNewProduct
    } = req.body;

    // Create product (master data only - no batch info)
    const product = await Product.create({
      productName,
      hsn,
      company,
      category,
      composition,
      packSize,
      standardMRP,
      description,
      images: images || [],
      isNewProduct: isNewProduct || false,
      createdBy: req.user.userId
    });

    console.log(`✅ New product created: ${product.productName}`);

    res.status(201).json({
      success: true,
      message: 'Product created successfully. Now add batches to this product.',
      data: { product }
    });

  } catch (error) {
    console.error('❌ Error creating product:', error);

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
      message: 'Error creating product',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
  }
};

// @desc    Update product (Admin only)
// @route   PUT /api/products/:id
// @access  Private/Admin
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    
    updateData.updatedBy = req.user.userId;

    const product = await Product.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    console.log(`✅ Product updated: ${product.productName}`);

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: { product }
    });

  } catch (error) {
    console.error('❌ Error updating product:', error);

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
      message: 'Error updating product',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
  }
};

// @desc    Delete product (soft delete - sets isActive to false)
// @route   DELETE /api/products/:id
// @access  Private/Admin
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndUpdate(
      id,
      { isActive: false, updatedBy: req.user.userId },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    console.log(`🗑️  Product deleted: ${product.productName}`);

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully'
    });

  } catch (error) {
    console.error('❌ Error deleting product:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting product',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
  }
};
