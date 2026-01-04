const Customer = require('../models/Customer');
const Bill = require('../models/Bill');

// @desc    Get all customers with filters, search, and sort
// @route   GET /api/admin/customers
// @access  Private (Admin only)
exports.getCustomers = async (req, res) => {
  try {
    const {
      search = '',
      city = 'all',
      status = 'all',
      businessType = 'all',
      sortBy = 'name-asc',
      page = 1,
      limit = 25
    } = req.query;

    // Build query
    let query = {};

    // Search filter (name, contact, email)
    if (search) {
      query.$or = [
        { establishmentName: { $regex: search, $options: 'i' } },
        { contactName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phoneNumber: { $regex: search, $options: 'i' } }
      ];
    }

    // City filter
    if (city !== 'all') {
      query['address.city'] = city;
    }

    // Status filter
    if (status !== 'all') {
      query.status = status;
    }

    // Business Type filter
    if (businessType !== 'all') {
      query.businessType = businessType;
    }

    // Sort options
    let sort = {};
    switch (sortBy) {
      case 'name-asc':
        sort.establishmentName = 1;
        break;
      case 'name-desc':
        sort.establishmentName = -1;
        break;
      case 'due-high':
        sort.outstandingAmount = -1;
        break;
      case 'due-low':
        sort.outstandingAmount = 1;
        break;
      case 'orders-high':
        sort.totalOrders = -1;
        break;
      case 'orders-low':
        sort.totalOrders = 1;
        break;
      case 'orders-month-high':
        sort.ordersThisMonth = -1;
        break;
      case 'orders-month-low':
        sort.ordersThisMonth = 1;
        break;
      case 'revenue-high':
        sort.totalRevenue = -1;
        break;
      case 'revenue-low':
        sort.totalRevenue = 1;
        break;
      default:
        sort.establishmentName = 1;
    }

    // Pagination
    const skip = (page - 1) * limit;

    // ✅ CHANGED: Added .populate() to fetch bills
    const customers = await Customer.find(query)
      .populate({
        path: 'bills',
        match: { isPaid: false }, // Only unpaid bills needed for outstanding calculation
        select: 'billDate amount billNumber',
        options: { sort: { billDate: -1 } } // Latest bills first
      })
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .select('-password');

    // Get total count for pagination
    const total = await Customer.countDocuments(query);

    // Get all unique cities for filter dropdown
    const cities = await Customer.distinct('address.city');

    // Calculate stats
    const stats = await Customer.aggregate([
      { $match: query },
      {
        $group: {
          _id: null,
          totalCustomers: { $sum: 1 },
          activeCustomers: {
            $sum: { $cond: [{ $eq: ['$status', 'Active'] }, 1, 0] }
          },
          totalRevenue: { $sum: '$totalRevenue' },
          totalOutstanding: { $sum: '$outstandingAmount' },
          totalOrders: { $sum: '$totalOrders' }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: customers,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      },
      filters: {
        cities: ['all', ...cities.sort()]
      },
      stats: stats[0] || {
        totalCustomers: 0,
        activeCustomers: 0,
        totalRevenue: 0,
        totalOutstanding: 0,
        totalOrders: 0
      }
    });
  } catch (error) {
    console.error('❌ Get customers error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch customers',
      error: error.message
    });
  }
};

// ✅ CHANGED: Also update getCustomerById to include bills
exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id)
      .populate({
        path: 'bills',
        select: 'billDate amount billNumber isPaid paidDate',
        options: { sort: { billDate: -1 } }
      })
      .select('-password');

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found'
      });
    }

    res.status(200).json({
      success: true,
      data: customer
    });
  } catch (error) {
    console.error('❌ Get customer error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch customer',
      error: error.message
    });
  }
};

// Rest of the functions remain the same
exports.createCustomer = async (req, res) => {
  try {
    const customer = await Customer.create({
      ...req.body,
      createdBy: req.admin.id
    });

    res.status(201).json({
      success: true,
      message: 'Customer created successfully',
      data: customer
    });
  } catch (error) {
    console.error('❌ Create customer error:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Email or phone number already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to create customer',
      error: error.message
    });
  }
};

exports.updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        updatedBy: req.admin.id
      },
      { new: true, runValidators: true }
    ).select('-password');

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found'
      });
    }

    customer.updateStatus();
    await customer.save();

    res.status(200).json({
      success: true,
      message: 'Customer updated successfully',
      data: customer
    });
  } catch (error) {
    console.error('❌ Update customer error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update customer',
      error: error.message
    });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Customer deleted successfully'
    });
  } catch (error) {
    console.error('❌ Delete customer error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete customer',
      error: error.message
    });
  }
};
