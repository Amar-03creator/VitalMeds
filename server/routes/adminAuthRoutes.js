// server/routes/adminAuthRoutes.js
const express = require('express');
const router = express.Router();
const {
  adminRegister,
  adminLogin,
  sendMfaCode,
  verifyMfaCode
} = require('../controllers/adminAuthController');

// Public routes
router.post('/register', adminRegister);        // Step 1: Register
router.post('/login', adminLogin);              // Step 1: Login (initiate MFA)
router.post('/mfa/send', sendMfaCode);          // Step 2: Send MFA code (email/sms)
router.post('/mfa/verify', verifyMfaCode);      // Step 3: Verify MFA code

module.exports = router;
