// server/seeders/migrateToNewSchema.js
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const Product = require('../models/Product');
const ProductBatch = require('../models/ProductBatch');

const migrateData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('✅ Connected to MongoDB');

    // ⭐ DROP OLD INDEXES FIRST
    try {
      await mongoose.connection.db.collection('products').dropIndex('sku_1');
      console.log('🗑️  Dropped old sku_1 index');
    } catch (error) {
      // Index might not exist, ignore error
      console.log('ℹ️  No sku_1 index to drop (already removed)');
    }

    // Get all existing products (old schema format)
    const oldProducts = await mongoose.connection.db.collection('products').find({}).toArray();
    console.log(`📦 Found ${oldProducts.length} products to migrate`);

    // Clear new collections
    await Product.deleteMany({});
    await ProductBatch.deleteMany({});
    console.log('🗑️  Cleared Product and ProductBatch collections');

    let successCount = 0;
    let errorCount = 0;

    for (const oldProduct of oldProducts) {
      try {
        // Create new Product (master data only)
        const newProduct = await Product.create({
          productName: oldProduct.productName,
          hsn: oldProduct.hsn,
          company: oldProduct.company,
          category: oldProduct.category,
          composition: oldProduct.composition,
          packSize: oldProduct.packSize,
          standardMRP: oldProduct.mrp || oldProduct.standardMRP,
          description: oldProduct.description,
          images: oldProduct.images || [],
          isNewProduct: oldProduct.isNewProduct || false,
          isActive: oldProduct.isActive !== false,
          createdBy: oldProduct.createdBy,
          updatedBy: oldProduct.updatedBy
        });

        // Create ProductBatch (batch-specific data)
        await ProductBatch.create({
          product: newProduct._id,
          batchNumber: oldProduct.batchNumber || `BATCH-${Date.now().toString(36).toUpperCase()}-${successCount}`,
          purchaseRate: oldProduct.purchaseRate || oldProduct.standardMRP * 0.5,
          mrp: oldProduct.mrp || oldProduct.standardMRP,
          expiryDate: oldProduct.expiryDate || new Date('2027-12-31'),
          stock: oldProduct.stock || 0,
          isActive: true,
          createdBy: oldProduct.createdBy
        });

        successCount++;
        console.log(`✅ Migrated: ${newProduct.productName} (${successCount}/${oldProducts.length})`);

      } catch (err) {
        errorCount++;
        console.error(`❌ Failed to migrate: ${oldProduct.productName}`, err.message);
      }
    }

    console.log('\n🎉 Migration completed!');
    console.log(`   ✅ Success: ${successCount}`);
    console.log(`   ❌ Errors: ${errorCount}`);
    console.log(`   Products: ${await Product.countDocuments()}`);
    console.log(`   Batches: ${await ProductBatch.countDocuments()}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Migration error:', error);
    process.exit(1);
  }
};

migrateData();
