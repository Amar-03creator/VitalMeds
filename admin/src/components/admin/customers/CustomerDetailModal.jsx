import React from 'react';
import { X, Phone, Mail, MapPin, CreditCard, Package, Calendar, User, Building2, FileText, AlertCircle } from 'lucide-react';

export const CustomerDetailModal = ({ isOpen, onClose, customer }) => {
  if (!isOpen || !customer) return null;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount || 0);
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'Inactive':
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
      case 'Credit Alert':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
      case 'Suspended':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const creditUsagePercent = ((customer.outstandingAmount / customer.creditLimit) * 100).toFixed(1);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 flex items-center justify-between rounded-t-lg">
          <div>
            <h2 className="text-2xl font-bold">{customer.establishmentName}</h2>
            <p className="text-blue-100 text-sm mt-1">Customer Details</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Status & Quick Info */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Status</p>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(customer.status)}`}>
                {customer.status}
              </span>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Total Orders</p>
              <p className="text-2xl font-bold text-foreground">{customer.totalOrders}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Total Revenue</p>
              <p className="text-lg font-bold text-green-600 dark:text-green-400">
                {formatCurrency(customer.totalRevenue)}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Outstanding</p>
              <p className={`text-lg font-bold ${
                customer.outstandingAmount > customer.creditLimit * 0.8
                  ? 'text-red-600 dark:text-red-400'
                  : 'text-amber-600 dark:text-amber-400'
              }`}>
                {formatCurrency(customer.outstandingAmount)}
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="border dark:border-gray-700 rounded-lg p-5">
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <User size={20} className="text-blue-600" />
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Contact Person</p>
                <p className="font-semibold text-foreground">{customer.contactName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Designation</p>
                <p className="font-semibold text-foreground">{customer.designation}</p>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Phone</p>
                  <p className="font-semibold text-foreground">{customer.phoneNumber}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                  <p className="font-semibold text-foreground break-all">{customer.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Business Information */}
          <div className="border dark:border-gray-700 rounded-lg p-5">
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <Building2 size={20} className="text-purple-600" />
              Business Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Business Type</p>
                <p className="font-semibold text-foreground">{customer.businessType}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Payment Terms</p>
                <p className="font-semibold text-foreground">{customer.paymentTerms}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">GSTIN</p>
                <p className="font-semibold text-foreground">{customer.gstin || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Drug License</p>
                <p className="font-semibold text-foreground">{customer.drugLicenseNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">PAN Number</p>
                <p className="font-semibold text-foreground">{customer.panNumber || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Registered Since</p>
                <p className="font-semibold text-foreground">{formatDate(customer.registeredDate)}</p>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="border dark:border-gray-700 rounded-lg p-5">
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <MapPin size={20} className="text-green-600" />
              Address
            </h3>
            <p className="text-foreground">
              {customer.address.street}<br />
              {customer.address.city}, {customer.address.state} - {customer.address.pincode}<br />
              {customer.address.country}
            </p>
          </div>

          {/* Credit Information */}
          <div className="border dark:border-gray-700 rounded-lg p-5">
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <CreditCard size={20} className="text-amber-600" />
              Credit Information
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Credit Limit</p>
                  <p className="text-xl font-bold text-foreground">{formatCurrency(customer.creditLimit)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Outstanding</p>
                  <p className="text-xl font-bold text-amber-600 dark:text-amber-400">
                    {formatCurrency(customer.outstandingAmount)}
                  </p>
                </div>
              </div>
              
              {/* Credit Usage Bar */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600 dark:text-gray-400">Credit Usage</span>
                  <span className="font-semibold text-foreground">{creditUsagePercent}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all ${
                      creditUsagePercent > 90
                        ? 'bg-red-500'
                        : creditUsagePercent > 70
                        ? 'bg-amber-500'
                        : 'bg-green-500'
                    }`}
                    style={{ width: `${Math.min(creditUsagePercent, 100)}%` }}
                  />
                </div>
              </div>

              {creditUsagePercent > 80 && (
                <div className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <AlertCircle size={20} className="text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-red-700 dark:text-red-400 text-sm">Credit Limit Alert</p>
                    <p className="text-xs text-red-600 dark:text-red-500">
                      This customer is near their credit limit. Consider payment collection.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Statistics */}
          <div className="border dark:border-gray-700 rounded-lg p-5">
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <Package size={20} className="text-blue-600" />
              Order Statistics
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Orders</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{customer.totalOrders}</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">This Month</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{customer.ordersThisMonth}</p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Last Order</p>
                <p className="text-sm font-bold text-purple-600 dark:text-purple-400">
                  {formatDate(customer.lastOrderDate)}
                </p>
              </div>
            </div>
          </div>

          {/* Notes (if any) */}
          {customer.notes && (
            <div className="border dark:border-gray-700 rounded-lg p-5">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <FileText size={20} className="text-gray-600" />
                Notes
              </h3>
              <p className="text-foreground whitespace-pre-wrap">{customer.notes}</p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-gray-50 dark:bg-gray-800 px-6 py-4 border-t dark:border-gray-700 rounded-b-lg flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            Close
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Edit Customer
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailModal;
