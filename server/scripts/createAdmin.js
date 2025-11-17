// server/scripts/createAdmin.js
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');
require('dotenv').config();

const Admin = require('../models/Admin');

async function createAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('✅ Connected to MongoDB');

    // Admin details
    const adminData = {
      name: 'Lakshmana Nayak', // CHANGE THIS
      email: 'fiku456@gmail.com', // CHANGE THIS
      phoneNumber: '8895715145', // CHANGE THIS
      password: 'Amarfiku@456', // CHANGE THIS
      businessName: 'VitalMEDS Distribution', // CHANGE THIS
      role: 'admin'
    };

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({
      $or: [
        { email: adminData.email },
        { phoneNumber: adminData.phoneNumber }
      ]
    });

    if (existingAdmin) {
      console.log('❌ Admin already exists!');
      process.exit(1);
    }

    // Generate Google Authenticator Secret
    const googleAuthSecret = speakeasy.generateSecret({
      name: `VitalMEDS (${adminData.businessName}) <${adminData.email}>`,
      issuer: 'VitalMEDS',
      length: 32
    });

    // Generate QR Code
    const qrCode = await QRCode.toDataURL(googleAuthSecret.otpauth_url);

    // Generate backup codes
    const backupCodes = [];
    for (let i = 0; i < 10; i++) {
      backupCodes.push({
        code: require('crypto').randomBytes(4).toString('hex').toUpperCase(),
        used: false
      });
    }

    // Create admin
    const admin = await Admin.create({
      ...adminData,
      googleAuthSecret: googleAuthSecret.base32,
      mfaBackupCodes: backupCodes,
      mfaEnabled: true,
      mfaMethod: 'google_authenticator'
    });

    console.log('\n✅ ADMIN CREATED SUCCESSFULLY!\n');
    console.log('================================');
    console.log('📧 Email:', admin.email);
    console.log('📱 Phone:', admin.phoneNumber);
    console.log('👤 Name:', admin.name);
    console.log('🏢 Business:', admin.businessName);
    console.log('================================');

    console.log('\n🔐 Google Authenticator Setup:');
    console.log('Scan this QR code with Google Authenticator app:');
    console.log(qrCode);

    console.log('\n📋 Backup Codes (Save these in a safe place!):');
    backupCodes.forEach((bc, index) => {
      console.log(`  ${index + 1}. ${bc.code}`);
    });

    console.log('\n✅ Admin ready to login!');

    await mongoose.disconnect();
    console.log('\n✅ Disconnected from MongoDB');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

createAdmin();
