// server/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  getFiltersMetadata,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');
const { protect } = require('../middleware/auth');

// Public/Protected routes (for clients)
router.get('/', protect, getProducts);
router.get('/filters/metadata', protect, getFiltersMetadata);
router.get('/:id', protect, getProductById);

// Admin-only routes (add restrictTo middleware when you implement admin auth)
// router.post('/', protect, restrictTo('admin'), createProduct);
// router.put('/:id', protect, restrictTo('admin'), updateProduct);
// router.delete('/:id', protect, restrictTo('admin'), deleteProduct);

// For now, keep these protected by auth only
router.post('/', protect, createProduct);
router.put('/:id', protect, updateProduct);
router.delete('/:id', protect, deleteProduct);

module.exports = router;
