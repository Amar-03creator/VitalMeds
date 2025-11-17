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
const { protectAdmin } = require('../middleware/adminAuth');  // ← Use admin middleware

// All admin product routes require admin authentication
router.use(protectAdmin); // Apply admin middleware to all routes below

router.get('/', getAllProductsAdmin);              // View all products
router.get('/:id', getProductByIdAdmin);           // View product details
router.post('/', createProductAdmin);              // Create product
router.put('/:id', updateProductAdmin);            // Update product
router.delete('/:id', deleteProductAdmin);         // Delete product

module.exports = router;
