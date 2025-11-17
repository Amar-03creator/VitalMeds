// server/utils/mfaUtils.js
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

// Generate Google Authenticator secret
exports.generateGoogleAuthSecret = (email, businessName) => {
  return speakeasy.generateSecret({
    name: `VitalMEDS (${businessName}) <${email}>`,
    issuer: 'VitalMEDS',
    length: 32
  });
};

// Generate QR Code
exports.generateQRCode = async (secret) => {
  try {
    const qrCode = await QRCode.toDataURL(secret.otpauth_url);
    return qrCode;
  } catch (error) {
    console.error('QR Code generation error:', error);
    throw error;
  }
};

// Verify TOTP token (from Google Authenticator)
exports.verifyTOTP = (secret, token) => {
  return speakeasy.totp.verify({
    secret,
    encoding: 'base32',
    token,
    window: 2 // Allow 2 time windows (±30 seconds)
  });
};

// Generate 6-digit OTP
exports.generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Generate backup codes
exports.generateBackupCodes = (count = 10) => {
  const codes = [];
  for (let i = 0; i < count; i++) {
    codes.push({
      code: crypto.randomBytes(4).toString('hex').toUpperCase(),
      used: false
    });
  }
  return codes;
};

// Send email OTP
exports.sendEmailOTP = async (email, otp) => {
  try {
    // Configure your email service
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: '🔐 VitalMEDS MFA Code - Expires in 10 Minutes',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px;">
          <h2 style="color: #1e40af;">VitalMEDS Admin Portal</h2>
          
          <p>Your Multi-Factor Authentication code is:</p>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
            <h1 style="color: #1e40af; letter-spacing: 5px; margin: 0;">
              ${otp}
            </h1>
          </div>
          
          <p style="color: #666;">
            <strong>⏰ This code expires in 10 minutes</strong>
          </p>
          
          <p style="color: #666;">
            If you didn't request this code, please ignore this email or contact support.
          </p>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
          <p style="font-size: 12px; color: #999;">
            VitalMEDS © 2025. All rights reserved.
          </p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ OTP sent to email: ${email}`);
    return true;
  } catch (error) {
    console.error('❌ Email sending error:', error);
    throw error;
  }
};

// Send SMS OTP (using Twilio)
exports.sendSmsOTP = async (phoneNumber, otp) => {
  try {
    const twilio = require('twilio');
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    await client.messages.create({
      body: `🔐 VitalMEDS MFA Code: ${otp}. Valid for 10 minutes.`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber
    });

    console.log(`✅ OTP sent to SMS: ${phoneNumber}`);
    return true;
  } catch (error) {
    console.error('❌ SMS sending error:', error);
    throw error;
  }
};
