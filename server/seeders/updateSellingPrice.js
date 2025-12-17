require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');

const updateSellingPrices = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('✅ MongoDB connected');

    const products = await Product.find({});
    
    for (const product of products) {
      product.sellingPrice = product.mrp * 0.8;
      await product.save();
    }

    console.log(`✅ Updated ${products.length} products with selling prices`);
    process.exit();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

updateSellingPrices();
