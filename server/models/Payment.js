const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({

  customerId: {
    type: mongoose.Schema.Types.ObjectId,  // MongoDB automatically generates: newCustomer._id = "507f1f77bcf86cd799439011"  // ← This is the ObjectId!
    ref: 'Customer',  // Points to Customer collection
    required: true,  // Every payment must belong to a customer
    index: true  // Makes queries faster
  },

  paymentAmount: {
    type: Number,
    required: true,
    min:0
  },

  paymentDate: {
    type: Date,
    required: true,
    default: Date.now(),
    index: true
  },

  paymentMethod: {
    type: String,
    enum: ['Cash', 'UPI', 'Bank Transfer', 'Cheque'],
    required: [true],
  },

  billIds: {
    type: mongoose.Schema.Types.ObjectId,  
    ref: 'Bill'
  },

  referenceNumber:{
    type: String
  },

  notes:{
    type: String,
    maxlength: 500
  }

}, {
  timestamps: true,
});

paymentSchema.index({customerId:1, paymentDate:-1});

module.exports = mongoose.model("Payment",paymentSchema);