// server/seeders/seedProductsAndBatches.js
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const Product = require('../models/Product');
const ProductBatch = require('../models/ProductBatch');

const productsData = [
  // INCEPTA (6 products)
  {
    productName: "Paracetamol 500mg",
    hsn: "300490",
    company: "Incepta",
    category: "Pain Relief",
    composition: "Paracetamol 500mg",
    packSize: "10x10 Tablets",
    standardMRP: 25,
    description: "Analgesic and antipyretic for fever and pain",
    batches: [
      { batchNumber: "PARA001", purchaseRate: 10, mrp: 25, expiryDate: "2027-12-31", stock: 500 },
      { batchNumber: "PARA002", purchaseRate: 12, mrp: 28, expiryDate: "2028-06-30", stock: 300 }
    ]
  },
  {
    productName: "Amoxicillin 500mg",
    hsn: "300490",
    company: "Incepta",
    category: "Antibiotics",
    composition: "Amoxicillin Trihydrate 500mg",
    packSize: "10x10 Capsules",
    standardMRP: 85,
    description: "Penicillin antibiotic for bacterial infections",
    batches: [
      { batchNumber: "AMOX001", purchaseRate: 38, mrp: 85, expiryDate: "2027-09-15", stock: 250 }
    ]
  },
  {
    productName: "Lisinopril 5mg",
    hsn: "300490",
    company: "Incepta",
    category: "Cardiovascular",
    composition: "Lisinopril Dihydrate 5mg",
    packSize: "10x20 Tablets",
    standardMRP: 105,
    description: "ACE inhibitor for hypertension",
    batches: [
      { batchNumber: "LISIN001", purchaseRate: 48, mrp: 105, expiryDate: "2027-11-30", stock: 180 }
    ]
  },
  {
    productName: "Metformin 500mg",
    hsn: "300490",
    company: "Incepta",
    category: "Diabetes",
    composition: "Metformin Hydrochloride 500mg",
    packSize: "10x10 Tablets",
    standardMRP: 45,
    description: "Biguanide antidiabetic medication",
    batches: [
      { batchNumber: "METF001", purchaseRate: 18, mrp: 45, expiryDate: "2027-08-20", stock: 450 },
      { batchNumber: "METF002", purchaseRate: 20, mrp: 48, expiryDate: "2028-02-15", stock: 350 }
    ]
  },
  {
    productName: "Omeprazole 20mg",
    hsn: "300490",
    company: "Incepta",
    category: "Gastro",
    composition: "Omeprazole 20mg",
    packSize: "10x10 Capsules",
    standardMRP: 68,
    description: "Proton pump inhibitor for acid reflux",
    batches: [
      { batchNumber: "OMEP001", purchaseRate: 28, mrp: 68, expiryDate: "2027-10-10", stock: 220 }
    ]
  },
  {
    productName: "Cetirizine 10mg",
    hsn: "300490",
    company: "Incepta",
    category: "Antihistamine",
    composition: "Cetirizine Hydrochloride 10mg",
    packSize: "10x10 Tablets",
    standardMRP: 35,
    description: "Antihistamine for allergic reactions",
    batches: [
      { batchNumber: "CETI001", purchaseRate: 14, mrp: 35, expiryDate: "2027-12-25", stock: 380 }
    ]
  },

  // BIOCON (6 products)
  {
    productName: "Atorvastatin 10mg",
    hsn: "300490",
    company: "Biocon",
    category: "Cardiovascular",
    composition: "Atorvastatin Calcium 10mg",
    packSize: "10x15 Tablets",
    standardMRP: 95,
    description: "Statin for cholesterol management",
    batches: [
      { batchNumber: "ATOR001", purchaseRate: 42, mrp: 95, expiryDate: "2027-07-18", stock: 280 }
    ]
  },
  {
    productName: "Insulin Glargine 100IU/ml",
    hsn: "300490",
    company: "Biocon",
    category: "Diabetes",
    composition: "Insulin Glargine 100IU/ml",
    packSize: "3ml Cartridge",
    standardMRP: 890,
    description: "Long-acting insulin analog",
    batches: [
      { batchNumber: "INSU001", purchaseRate: 425, mrp: 890, expiryDate: "2027-05-30", stock: 120 }
    ]
  },
  {
    productName: "Azithromycin 500mg",
    hsn: "300490",
    company: "Biocon",
    category: "Antibiotics",
    composition: "Azithromycin 500mg",
    packSize: "10x3 Tablets",
    standardMRP: 125,
    description: "Macrolide antibiotic",
    batches: [
      { batchNumber: "AZIT001", purchaseRate: 58, mrp: 125, expiryDate: "2027-09-12", stock: 190 }
    ]
  },
  {
    productName: "Pantoprazole 40mg",
    hsn: "300490",
    company: "Biocon",
    category: "Gastro",
    composition: "Pantoprazole Sodium 40mg",
    packSize: "10x10 Tablets",
    standardMRP: 85,
    description: "PPI for acid reflux and GERD",
    batches: [
      { batchNumber: "PANT001", purchaseRate: 36, mrp: 85, expiryDate: "2027-11-05", stock: 310 }
    ]
  },
  {
    productName: "Montelukast 10mg",
    hsn: "300490",
    company: "Biocon",
    category: "Respiratory",
    composition: "Montelukast Sodium 10mg",
    packSize: "10x10 Tablets",
    standardMRP: 145,
    description: "Leukotriene receptor antagonist for asthma",
    batches: [
      { batchNumber: "MONT001", purchaseRate: 68, mrp: 145, expiryDate: "2027-08-22", stock: 165 }
    ]
  },
  {
    productName: "Vitamin D3 60000 IU",
    hsn: "300490",
    company: "Biocon",
    category: "Vitamins & Supplements",
    composition: "Cholecalciferol 60000 IU",
    packSize: "4 Capsules",
    standardMRP: 75,
    description: "Vitamin D supplement",
    batches: [
      { batchNumber: "VITD001", purchaseRate: 32, mrp: 75, expiryDate: "2028-01-15", stock: 420 }
    ]
  },

  // ABBOTT (6 products)
  {
    productName: "Amlodipine 5mg",
    hsn: "300490",
    company: "Abbott",
    category: "Cardiovascular",
    composition: "Amlodipine Besylate 5mg",
    packSize: "10x15 Tablets",
    standardMRP: 82,
    description: "Calcium channel blocker for hypertension",
    batches: [
      { batchNumber: "AMLO001", purchaseRate: 38, mrp: 82, expiryDate: "2027-10-28", stock: 275 }
    ]
  },
  {
    productName: "Clarithromycin 500mg",
    hsn: "300490",
    company: "Abbott",
    category: "Antibiotics",
    composition: "Clarithromycin 500mg",
    packSize: "10x6 Tablets",
    standardMRP: 185,
    description: "Macrolide antibiotic for respiratory infections",
    batches: [
      { batchNumber: "CLAR001", purchaseRate: 88, mrp: 185, expiryDate: "2027-07-09", stock: 145 }
    ]
  },
  {
    productName: "Glimepiride 2mg",
    hsn: "300490",
    company: "Abbott",
    category: "Diabetes",
    composition: "Glimepiride 2mg",
    packSize: "10x10 Tablets",
    standardMRP: 78,
    description: "Sulfonylurea antidiabetic",
    batches: [
      { batchNumber: "GLIM001", purchaseRate: 32, mrp: 78, expiryDate: "2027-09-30", stock: 295 }
    ]
  },
  {
    productName: "Ranitidine 150mg",
    hsn: "300490",
    company: "Abbott",
    category: "Gastro",
    composition: "Ranitidine Hydrochloride 150mg",
    packSize: "10x10 Tablets",
    standardMRP: 42,
    description: "H2 receptor antagonist",
    batches: [
      { batchNumber: "RANI001", purchaseRate: 18, mrp: 42, expiryDate: "2027-12-18", stock: 340 }
    ]
  },
  {
    productName: "Salbutamol Inhaler 100mcg",
    hsn: "300490",
    company: "Abbott",
    category: "Respiratory",
    composition: "Salbutamol 100mcg",
    packSize: "200 Doses",
    standardMRP: 395,
    description: "Beta-2 agonist bronchodilator",
    batches: [
      { batchNumber: "SALB001", purchaseRate: 185, mrp: 395, expiryDate: "2028-03-15", stock: 85 }
    ]
  },
  {
    productName: "Calcium Carbonate 500mg",
    hsn: "300490",
    company: "Abbott",
    category: "Calcium",
    composition: "Calcium Carbonate 500mg + Vitamin D3",
    packSize: "10x15 Tablets",
    standardMRP: 95,
    description: "Calcium supplement with Vitamin D3",
    batches: [
      { batchNumber: "CALC001", purchaseRate: 42, mrp: 95, expiryDate: "2028-06-20", stock: 390 }
    ]
  },

  // CIPLA (6 products)
  {
    productName: "Ciprofloxacin 500mg",
    hsn: "300490",
    company: "Cipla",
    category: "Antibiotics",
    composition: "Ciprofloxacin Hydrochloride 500mg",
    packSize: "10x10 Tablets",
    standardMRP: 110,
    description: "Fluoroquinolone antibiotic",
    batches: [
      { batchNumber: "CIPRO001", purchaseRate: 48, mrp: 110, expiryDate: "2027-08-05", stock: 265 },
      { batchNumber: "CIPRO002", purchaseRate: 50, mrp: 115, expiryDate: "2028-01-20", stock: 180 }
    ]
  },
  {
    productName: "Losartan 50mg",
    hsn: "300490",
    company: "Cipla",
    category: "Cardiovascular",
    composition: "Losartan Potassium 50mg",
    packSize: "10x15 Tablets",
    standardMRP: 125,
    description: "Angiotensin receptor blocker",
    batches: [
      { batchNumber: "LOSA001", purchaseRate: 58, mrp: 125, expiryDate: "2027-11-12", stock: 210 }
    ]
  },
  {
    productName: "Sitagliptin 100mg",
    hsn: "300490",
    company: "Cipla",
    category: "Diabetes",
    composition: "Sitagliptin Phosphate 100mg",
    packSize: "10x10 Tablets",
    standardMRP: 285,
    description: "DPP-4 inhibitor for diabetes",
    batches: [
      { batchNumber: "SITA001", purchaseRate: 135, mrp: 285, expiryDate: "2027-10-08", stock: 155 }
    ]
  },
  {
    productName: "Domperidone 10mg",
    hsn: "300490",
    company: "Cipla",
    category: "Gastro",
    composition: "Domperidone 10mg",
    packSize: "10x10 Tablets",
    standardMRP: 38,
    description: "Antiemetic and prokinetic agent",
    batches: [
      { batchNumber: "DOMP001", purchaseRate: 16, mrp: 38, expiryDate: "2027-12-02", stock: 425 }
    ]
  },
  {
    productName: "Budesonide 200mcg Inhaler",
    hsn: "300490",
    company: "Cipla",
    category: "Respiratory",
    composition: "Budesonide 200mcg",
    packSize: "100 Doses",
    standardMRP: 380,
    description: "Corticosteroid for asthma",
    batches: [
      { batchNumber: "BUDE001", purchaseRate: 175, mrp: 380, expiryDate: "2027-09-25", stock: 125 }
    ]
  },
  {
    productName: "Ferrous Sulfate 200mg",
    hsn: "300490",
    company: "Cipla",
    category: "Iron",
    composition: "Ferrous Sulfate 200mg + Folic Acid",
    packSize: "10x10 Tablets",
    standardMRP: 55,
    description: "Iron supplement for anemia",
    batches: [
      { batchNumber: "FERR001", purchaseRate: 24, mrp: 55, expiryDate: "2028-04-10", stock: 480 }
    ]
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('✅ Connected to MongoDB\n');

    // Clear existing data
    await Product.deleteMany({});
    await ProductBatch.deleteMany({});
    console.log('🗑️  Cleared existing products and batches\n');

    let productCount = 0;
    let batchCount = 0;

    for (const productData of productsData) {
      // Extract batch data
      const { batches, ...productInfo } = productData;

      // Create product
      const product = await Product.create(productInfo);
      productCount++;

      // Create batches for this product
      for (const batchData of batches) {
        await ProductBatch.create({
          product: product._id,
          ...batchData
        });
        batchCount++;
      }

      console.log(`✅ ${product.productName} (${product.company}) - ${batches.length} batch(es)`);
    }

    console.log('\n🎉 Seeding completed successfully!');
    console.log(`   📦 Products created: ${productCount}`);
    console.log(`   🏷️  Batches created: ${batchCount}`);
    console.log(`   🏢 Companies: Incepta (6), Biocon (6), Abbott (6), Cipla (6)`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();
