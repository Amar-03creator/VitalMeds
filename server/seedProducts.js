const mongoose = require('mongoose');
require('dotenv').config();

const Product = require('./models/Product');

const products = [
  // PAIN RELIEF (5)
  {
    productName: 'Paracetamol 500mg',
    sku: 'PARA-500',
    hsn: '300490',
    batchNumber: 'PR2401001',
    company: 'Sun Pharma',
    category: 'Pain Relief',
    composition: 'Paracetamol 500mg',
    packSize: '10x10 Tablets',
    purchaseRate: 12,
    mrp: 25,
    stock: 450,
    expiryDate: new Date('2026-08-15'),
    usageAndDosage: 'Take 1-2 tablets every 4-6 hours, max 4g daily',
    description: 'Effective pain reliever and fever reducer',
    isActive: true
  },
  {
    productName: 'Ibuprofen 400mg',
    sku: 'IBU-400',
    hsn: '300490',
    batchNumber: 'IB2402015',
    company: 'Cipla',
    category: 'Pain Relief',
    composition: 'Ibuprofen 400mg',
    packSize: '10x15 Tablets',
    purchaseRate: 28,
    mrp: 60,
    stock: 320,
    expiryDate: new Date('2026-12-20'),
    usageAndDosage: 'Take 1 tablet every 6-8 hours with food',
    description: 'Anti-inflammatory and pain relief',
    isActive: true
  },
  {
    productName: 'Aspirin 325mg',
    sku: 'ASP-325',
    hsn: '300490',
    batchNumber: 'AS2403022',
    company: 'Lupin',
    category: 'Pain Relief',
    composition: 'Acetylsalicylic Acid 325mg',
    packSize: '10x20 Tablets',
    purchaseRate: 35,
    mrp: 75,
    stock: 280,
    expiryDate: new Date('2027-05-10'),
    usageAndDosage: 'Take 1 tablet every 4-6 hours',
    description: 'Pain reliever and blood thinner',
    isActive: true
  },
  {
    productName: 'Diclofenac Sodium 50mg',
    sku: 'DIC-50',
    hsn: '300490',
    batchNumber: 'DC2404030',
    company: 'Dr. Reddy\'s',
    category: 'Pain Relief',
    composition: 'Diclofenac Sodium 50mg',
    packSize: '10x20 Tablets',
    purchaseRate: 42,
    mrp: 90,
    stock: 150,
    expiryDate: new Date('2026-06-30'),
    usageAndDosage: 'Take 1 tablet 2-3 times daily with food',
    description: 'Strong anti-inflammatory pain reliever',
    isActive: true
  },
  {
    productName: 'Tramadol 50mg',
    sku: 'TRAM-50',
    hsn: '300490',
    batchNumber: 'TR2405008',
    company: 'Abbott',
    category: 'Pain Relief',
    composition: 'Tramadol Hydrochloride 50mg',
    packSize: '10x20 Tablets',
    purchaseRate: 65,
    mrp: 140,
    stock: 95,
    expiryDate: new Date('2027-03-15'),
    usageAndDosage: 'Take 1-2 tablets every 6-8 hours',
    description: 'Prescription opioid pain reliever',
    isActive: true
  },

  // ANTIBIOTICS (5)
  {
    productName: 'Amoxicillin 500mg',
    sku: 'AMOX-500',
    hsn: '300490',
    batchNumber: 'AM2406012',
    company: 'Cipla',
    category: 'Antibiotics',
    composition: 'Amoxicillin Trihydrate 500mg',
    packSize: '10x15 Capsules',
    purchaseRate: 45,
    mrp: 95,
    stock: 280,
    expiryDate: new Date('2026-11-25'),
    usageAndDosage: 'Take 1 capsule 3 times daily',
    description: 'Beta-lactam antibiotic',
    isActive: true
  },
  {
    productName: 'Azithromycin 250mg',
    sku: 'AZIT-250',
    hsn: '300490',
    batchNumber: 'AZ2407018',
    company: 'Sun Pharma',
    category: 'Antibiotics',
    composition: 'Azithromycin Dihydrate 250mg',
    packSize: '10x20 Tablets',
    purchaseRate: 52,
    mrp: 110,
    stock: 420,
    expiryDate: new Date('2027-02-14'),
    usageAndDosage: 'Take 1 tablet once daily',
    description: 'Macrolide antibiotic for infections',
    isActive: true
  },
  {
    productName: 'Cephalexin 500mg',
    sku: 'CEPH-500',
    hsn: '300490',
    batchNumber: 'CE2408025',
    company: 'Aurobindo',
    category: 'Antibiotics',
    composition: 'Cephalexin Monohydrate 500mg',
    packSize: '10x20 Capsules',
    purchaseRate: 58,
    mrp: 125,
    stock: 200,
    expiryDate: new Date('2026-09-30'),
    usageAndDosage: 'Take 1 capsule 4 times daily',
    description: 'First-generation cephalosporin',
    isActive: true
  },
  {
    productName: 'Levofloxacin 500mg',
    sku: 'LEVO-500',
    hsn: '300490',
    batchNumber: 'LV2409032',
    company: 'Dr. Reddy\'s',
    category: 'Antibiotics',
    composition: 'Levofloxacin Hemihydrate 500mg',
    packSize: '10x20 Tablets',
    purchaseRate: 85,
    mrp: 180,
    stock: 115,
    expiryDate: new Date('2027-04-22'),
    usageAndDosage: 'Take 1 tablet once daily',
    description: 'Fluoroquinolone antibiotic',
    isActive: true
  },
  {
    productName: 'Ciprofloxacin 500mg',
    sku: 'CIPRO-500',
    hsn: '300490',
    batchNumber: 'CI2410005',
    company: 'Cipla',
    category: 'Antibiotics',
    composition: 'Ciprofloxacin Hydrochloride 500mg',
    packSize: '10x15 Tablets',
    purchaseRate: 72,
    mrp: 155,
    stock: 340,
    expiryDate: new Date('2026-10-12'),
    usageAndDosage: 'Take 1 tablet 2 times daily',
    description: 'Broad-spectrum fluoroquinolone',
    isActive: true
  },

  // GASTRO (5)
  {
    productName: 'Pantoprazole 40mg',
    sku: 'PANTO-40',
    hsn: '300490',
    batchNumber: 'PT2411009',
    company: 'Sun Pharma',
    category: 'Gastro',
    composition: 'Pantoprazole Sodium Sesquihydrate 40mg',
    packSize: '10x10 Tablets',
    purchaseRate: 32,
    mrp: 70,
    stock: 500,
    expiryDate: new Date('2026-07-18'),
    usageAndDosage: 'Take 1 tablet daily before breakfast',
    description: 'Proton pump inhibitor for GERD',
    isActive: true
  },
  {
    productName: 'Omeprazole 20mg',
    sku: 'OMEP-20',
    hsn: '300490',
    batchNumber: 'OM2412014',
    company: 'Cipla',
    category: 'Gastro',
    composition: 'Omeprazole 20mg',
    packSize: '10x20 Capsules',
    purchaseRate: 28,
    mrp: 60,
    stock: 380,
    expiryDate: new Date('2027-01-05'),
    usageAndDosage: 'Take 1 capsule once daily',
    description: 'Reduces stomach acid',
    isActive: true
  },
  {
    productName: 'Ranitidine 150mg',
    sku: 'RAN-150',
    hsn: '300490',
    batchNumber: 'RN2413021',
    company: 'Dr. Reddy\'s',
    category: 'Gastro',
    composition: 'Ranitidine Hydrochloride 150mg',
    packSize: '10x20 Tablets',
    purchaseRate: 22,
    mrp: 48,
    stock: 420,
    expiryDate: new Date('2026-12-08'),
    usageAndDosage: 'Take 1 tablet 2 times daily',
    description: 'Histamine H2-receptor antagonist',
    isActive: true
  },
  {
    productName: 'Metoclopramide 10mg',
    sku: 'METO-10',
    hsn: '300490',
    batchNumber: 'MT2414028',
    company: 'Lupin',
    category: 'Gastro',
    composition: 'Metoclopramide Hydrochloride 10mg',
    packSize: '10x15 Tablets',
    purchaseRate: 18,
    mrp: 40,
    stock: 550,
    expiryDate: new Date('2027-06-20'),
    usageAndDosage: 'Take 1 tablet 3 times daily before meals',
    description: 'Anti-nausea and anti-vomiting',
    isActive: true
  },
  {
    productName: 'Domperidone 10mg',
    sku: 'DOM-10',
    hsn: '300490',
    batchNumber: 'DM2415035',
    company: 'Abbott',
    category: 'Gastro',
    composition: 'Domperidone Maleate 10mg',
    packSize: '10x20 Tablets',
    purchaseRate: 24,
    mrp: 52,
    stock: 290,
    expiryDate: new Date('2026-08-25'),
    usageAndDosage: 'Take 1 tablet 3 times daily 30 minutes before meals',
    description: 'Peripheral dopamine antagonist',
    isActive: true
  },

  // DIABETES (5)
  {
    productName: 'Metformin 500mg',
    sku: 'MET-500',
    hsn: '300490',
    batchNumber: 'MF2416002',
    company: 'Sun Pharma',
    category: 'Diabetes',
    composition: 'Metformin Hydrochloride 500mg',
    packSize: '10x30 Tablets',
    purchaseRate: 35,
    mrp: 75,
    stock: 600,
    expiryDate: new Date('2027-03-10'),
    usageAndDosage: 'Take 1 tablet 2-3 times daily with food',
    description: 'First-line diabetes medication',
    isActive: true
  },
  {
    productName: 'Glipizide 5mg',
    sku: 'GLIP-5',
    hsn: '300490',
    batchNumber: 'GL2417009',
    company: 'Cipla',
    category: 'Diabetes',
    composition: 'Glipizide 5mg',
    packSize: '10x15 Tablets',
    purchaseRate: 48,
    mrp: 105,
    stock: 210,
    expiryDate: new Date('2026-11-30'),
    usageAndDosage: 'Take 1 tablet 15-30 minutes before breakfast',
    description: 'Sulfonylurea antidiabetic',
    isActive: true
  },
  {
    productName: 'Insulin Glargine 100 IU/ml',
    sku: 'INS-GLAR-100',
    hsn: '300490',
    batchNumber: 'IG2418016',
    company: 'Novartis',
    category: 'Diabetes',
    composition: 'Insulin Glargine (rDNA) 100 IU/ml',
    packSize: '3ml Vial',
    purchaseRate: 350,
    mrp: 750,
    stock: 45,
    expiryDate: new Date('2026-09-05'),
    usageAndDosage: 'Inject subcutaneously once daily at bedtime',
    description: 'Long-acting insulin analog',
    isActive: true
  },
  {
    productName: 'Sitagliptin 50mg',
    sku: 'SIT-50',
    hsn: '300490',
    batchNumber: 'ST2419023',
    company: 'Merck',
    category: 'Diabetes',
    composition: 'Sitagliptin Phosphate Monohydrate 50mg',
    packSize: '10x20 Tablets',
    purchaseRate: 92,
    mrp: 195,
    stock: 125,
    expiryDate: new Date('2027-05-18'),
    usageAndDosage: 'Take 1 tablet once daily',
    description: 'DPP-4 inhibitor',
    isActive: true
  },
  {
    productName: 'Acarbose 50mg',
    sku: 'ACA-50',
    hsn: '300490',
    batchNumber: 'AC2420030',
    company: 'Dr. Reddy\'s',
    category: 'Diabetes',
    composition: 'Acarbose 50mg',
    packSize: '10x15 Tablets',
    purchaseRate: 58,
    mrp: 125,
    stock: 175,
    expiryDate: new Date('2026-10-14'),
    usageAndDosage: 'Take 1 tablet with first bite of each meal',
    description: 'Alpha-glucosidase inhibitor',
    isActive: true
  },

  // CARDIOVASCULAR (3) + RESPIRATORY (2)
  {
    productName: 'Atorvastatin 10mg',
    sku: 'ATOR-10',
    hsn: '300490',
    batchNumber: 'AT2421007',
    company: 'Sun Pharma',
    category: 'Cardiovascular',
    composition: 'Atorvastatin Calcium 10mg',
    packSize: '10x20 Tablets',
    purchaseRate: 62,
    mrp: 135,
    stock: 380,
    expiryDate: new Date('2027-02-28'),
    usageAndDosage: 'Take 1 tablet once daily in evening',
    description: 'Statin for cholesterol management',
    isActive: true
  },
  {
    productName: 'Lisinopril 5mg',
    sku: 'LISI-5',
    hsn: '300490',
    batchNumber: 'LS2422014',
    company: 'Cipla',
    category: 'Cardiovascular',
    composition: 'Lisinopril Dihydrate 5mg',
    packSize: '10x20 Tablets',
    purchaseRate: 48,
    mrp: 105,
    stock: 290,
    expiryDate: new Date('2026-12-12'),
    usageAndDosage: 'Take 1 tablet once daily',
    description: 'ACE inhibitor for hypertension',
    isActive: true
  },
  {
    productName: 'Amlodipine 5mg',
    sku: 'AML-5',
    hsn: '300490',
    batchNumber: 'AM2423021',
    company: 'Dr. Reddy\'s',
    category: 'Cardiovascular',
    composition: 'Amlodipine Besylate 5mg',
    packSize: '10x15 Tablets',
    purchaseRate: 38,
    mrp: 82,
    stock: 420,
    expiryDate: new Date('2027-04-05'),
    usageAndDosage: 'Take 1 tablet once daily',
    description: 'Calcium channel blocker',
    isActive: true
  },
  {
    productName: 'Salbutamol Inhaler 100mcg',
    sku: 'SALB-100',
    hsn: '300490',
    batchNumber: 'SB2424028',
    company: 'GSK',
    category: 'Respiratory',
    composition: 'Salbutamol (Albuterol) 100mcg',
    packSize: '200 Doses per inhaler',
    purchaseRate: 185,
    mrp: 395,
    stock: 85,
    expiryDate: new Date('2026-08-30'),
    usageAndDosage: 'Inhale 1-2 puffs every 4-6 hours as needed',
    description: 'Beta-2 agonist bronchodilator',
    isActive: true
  },
  {
    productName: 'Fluticasone Inhaler 250mcg',
    sku: 'FLU-250',
    hsn: '300490',
    batchNumber: 'FL2425035',
    company: 'Cipla',
    category: 'Respiratory',
    composition: 'Fluticasone Propionate 250mcg',
    packSize: '120 Doses per inhaler',
    purchaseRate: 215,
    mrp: 460,
    stock: 60,
    expiryDate: new Date('2027-01-22'),
    usageAndDosage: 'Inhale 2 puffs twice daily',
    description: 'Corticosteroid inhaler for asthma',
    isActive: true
  }
];

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('✅ Connected to MongoDB');

    // Delete existing products
    await Product.deleteMany({});
    console.log('🗑️ Cleared existing products');

    // Insert new products
    const result = await Product.insertMany(products);
    console.log(`✅ Inserted ${result.length} demo products`);

    // Show summary
    const stats = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          avgMRP: { $avg: '$mrp' },
          totalStock: { $sum: '$stock' }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    console.log('\n📊 Product Summary by Category:');
    stats.forEach(stat => {
      console.log(`  ${stat._id}: ${stat.count} products | Avg MRP: ₹${stat.avgMRP.toFixed(2)} | Total Stock: ${stat.totalStock}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

seedProducts();
