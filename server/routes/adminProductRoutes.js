// server/routes/adminProductRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllProductsAdmin,
  getProductByIdAdmin,
  createProductAdmin,
  updateProductAdmin,
  deleteProductAdmin
} = require('../controllers/adminProductController');
const { protect } = require('../middleware/adminAuth');  // ✅ CHANGED

// All admin product routes require admin authentication
router.use(protect); // ✅ CHANGED

router.get('/', getAllProductsAdmin);              // View all products
router.get('/:id', getProductByIdAdmin);           // View product details
router.post('/', createProductAdmin);              // Create product
router.put('/:id', updateProductAdmin);            // Update product
router.delete('/:id', deleteProductAdmin);         // Delete product

module.exports = router;
