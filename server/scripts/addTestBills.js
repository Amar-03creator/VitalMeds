const mongoose = require('mongoose');
const Bill = require('../models/Bill');
const Customer = require('../models/Customer');
require('dotenv').config({ path: './server/.env' });


const addTestBills = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('📚 Connected to MongoDB\n');

    // Get first 3 customers
    const customers = await Customer.find().limit(3);
    
    if (customers.length === 0) {
      console.log('❌ No customers found');
      process.exit(1);
    }

    const today = new Date();
    
    for (let i = 0; i < customers.length; i++) {
      const customer = customers[i];
      const daysAgo = (i + 1) * 10; // 10, 20, 30 days ago
      
      // Create bills
      const bills = await Bill.create([
        {
          customerId: customer._id,
          billNumber: `BILL-${Date.now()}-${i}-1`,
          billDate: new Date(today.getTime() - daysAgo * 24 * 60 * 60 * 1000),
          amount: 3000,
          isPaid: false
        },
        {
          customerId: customer._id,
          billNumber: `BILL-${Date.now()}-${i}-2`,
          billDate: new Date(today.getTime() - (daysAgo + 5) * 24 * 60 * 60 * 1000),
          amount: 2000,
          isPaid: false
        }
      ]);
      
      // Update customer
      customer.bills = bills.map(b => b._id);
      customer.outstandingAmount = 5000;
      await customer.save();
      
      console.log(`✅ ${customer.establishmentName}: ${daysAgo} days outstanding`);
    }

    console.log('\n🎉 Test bills created! Refresh your admin panel.\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

addTestBills();
