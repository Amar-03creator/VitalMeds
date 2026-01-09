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

const {
  getBatchesByProduct,
  createBatch,
  updateBatch,
  deleteBatch
} = require('../controllers/productBatchController');

const { protect } = require('../middleware/auth');

// Product routes
router.get('/', protect, getProducts);
router.get('/filters/metadata', protect, getFiltersMetadata);
router.get('/:id', protect, getProductById);
router.post('/', protect, createProduct);
router.put('/:id', protect, updateProduct);
router.delete('/:id', protect, deleteProduct);

// Batch routes
router.get('/:productId/batches', protect, getBatchesByProduct);
router.post('/:productId/batches', protect, createBatch);
router.put('/batches/:batchId', protect, updateBatch);
router.delete('/batches/:batchId', protect, deleteBatch);

module.exports = router;
