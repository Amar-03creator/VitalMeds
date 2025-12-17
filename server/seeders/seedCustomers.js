require('dotenv').config();
const mongoose = require('mongoose');
const Customer = require('../models/Customer');

const sampleCustomers = [
  {
    establishmentName: 'MediCare Pharmacy',
    contactName: 'Dr. Rajesh Kumar',
    designation: 'Owner',
    email: 'rajesh@medicare.com',
    phoneNumber: '9876543210',
    alternatePhone: '9876543211',
    password: 'password123',
    address: {
      street: '123, MG Road',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      country: 'India'
    },
    businessType: 'Retail Pharmacy',
    gstin: '27AABCU9603R1ZM',
    drugLicenseNumber: 'DL-MH-2023-001234',
    creditLimit: 100000,
    outstandingAmount: 45000,
    totalRevenue: 1250000,
    revenueThisMonth: 85000,
    totalOrders: 156,
    ordersThisMonth: 12,
    lastOrderDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    status: 'Active',
    isVerified: true,
    paymentTerms: 'Credit-30'
  },
  {
    establishmentName: 'HealthPlus Medicals',
    contactName: 'Mrs. Priya Sharma',
    designation: 'Manager',
    email: 'priya@healthplus.com',
    phoneNumber: '9812345678',
    password: 'password123',
    address: {
      street: '456, Connaught Place',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110001',
      country: 'India'
    },
    businessType: 'Retail Pharmacy',
    gstin: '07AABCU9603R1ZN',
    drugLicenseNumber: 'DL-DL-2023-005678',
    creditLimit: 150000,
    outstandingAmount: 0,
    totalRevenue: 1850000,
    revenueThisMonth: 85000,
    totalOrders: 203,
    ordersThisMonth: 18,
    lastOrderDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    status: 'Active',
    isVerified: true,
    paymentTerms: 'Credit-15'
  },
  {
    establishmentName: 'CityLife Pharmacy',
    contactName: 'Mr. Amit Patel',
    designation: 'Owner',
    email: 'amit@citylife.com',
    phoneNumber: '9988776543',
    password: 'password123',
    address: {
      street: '789, CG Road',
      city: 'Ahmedabad',
      state: 'Gujarat',
      pincode: '380001',
      country: 'India'
    },
    businessType: 'Retail Pharmacy',
    gstin: '24AABCU9603R1ZO',
    drugLicenseNumber: 'DL-GJ-2023-009012',
    creditLimit: 80000,
    outstandingAmount: 75000,
    totalRevenue: 780000,
    revenueThisMonth: 85000,
    totalOrders: 89,
    ordersThisMonth: 5,
    lastOrderDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    status: 'Credit Alert',
    isVerified: true,
    paymentTerms: 'Credit-45'
  },
  {
    establishmentName: 'WellCare Drugs',
    contactName: 'Dr. Sunita Reddy',
    designation: 'Doctor',
    email: 'sunita@wellcare.com',
    phoneNumber: '9765432109',
    password: 'password123',
    address: {
      street: '321, Hi-Tech City',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500081',
      country: 'India'
    },
    businessType: 'Clinic',
    gstin: '36AABCU9603R1ZP',
    drugLicenseNumber: 'DL-TG-2023-012345',
    creditLimit: 120000,
    outstandingAmount: 28000,
    totalRevenue: 1420000,
    totalOrders: 178,
    revenueThisMonth: 85000,
    ordersThisMonth: 15,
    lastOrderDate: new Date(), // Today
    status: 'Active',
    isVerified: true,
    paymentTerms: 'Credit-30'
  },
  {
    establishmentName: 'LifeLine Medicos',
    contactName: 'Mr. Vikram Singh',
    designation: 'Owner',
    email: 'vikram@lifeline.com',
    phoneNumber: '9654321098',
    password: 'password123',
    address: {
      street: '654, FC Road',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411005',
      country: 'India'
    },
    businessType: 'Distributor',
    gstin: '27AABCU9603R1ZQ',
    drugLicenseNumber: 'DL-MH-2023-067890',
    creditLimit: 50000,
    outstandingAmount: 0,
    totalRevenue: 320000,
    revenueThisMonth: 85000,
    totalOrders: 45,
    ordersThisMonth: 0,
    lastOrderDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000), // 45 days ago
    status: 'Inactive',
    isVerified: false,
    paymentTerms: 'Cash'
  },
  {
    establishmentName: 'QuickMeds Store',
    contactName: 'Mrs. Anjali Nair',
    designation: 'Manager',
    email: 'anjali@quickmeds.com',
    phoneNumber: '9543210987',
    password: 'password123',
    address: {
      street: '987, MG Road',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560001',
      country: 'India'
    },
    businessType: 'Hospital',
    gstin: '29AABCU9603R1ZR',
    drugLicenseNumber: 'DL-KA-2023-034567',
    creditLimit: 100000,
    outstandingAmount: 15000,
    totalRevenue: 1090000,
    revenueThisMonth: 85000,
    totalOrders: 134,
    ordersThisMonth: 10,
    lastOrderDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    status: 'Active',
    isVerified: true,
    paymentTerms: 'Credit-30'
  }
];

const seedCustomers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('✅ MongoDB connected');

    await Customer.deleteMany();
    console.log('🗑️  Deleted all existing customers');

    await Customer.insertMany(sampleCustomers);
    console.log(`✅ ${sampleCustomers.length} customers seeded successfully`);

    process.exit();
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedCustomers();
