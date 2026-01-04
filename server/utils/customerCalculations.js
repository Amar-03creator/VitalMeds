const Customer = require("../models/Customer");
const Bill = require("../models/Bill");
const Payment = require("../models/Payment");


const calculateConcernStatus = async (customerId) => {
  try {
    const customer = await Customer.findById(customerId);

    const thirtyDaysAgo = new Date(); //First todays date is set
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);  //Now thirty days ago date is set

    const recentBills = await Bill.findAll({
      customerId: customerId,
      billDate: {$gte: thirtyDaysAgo}
    });

    const monthlyPurchase = recentBills.reduce((sum, bill)=>{
      return sum + bill.amount;
    });

    const recentPayments = await Payment.findAll({})


  }
}