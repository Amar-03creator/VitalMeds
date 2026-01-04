import React from 'react';
import { Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';

export const CustomerTable = ({ customers, onRefresh }) => {
  const navigate = useNavigate();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // ✅ NEW: Calculate Outstanding Days based on your logic
  const calculateOutstandingDays = (customer) => {
    // If no outstanding amount, return 0
    if (!customer.outstandingAmount || customer.outstandingAmount === 0) {
      return 0;
    }

    // If no bills data available, return null (will show "N/A")
    if (!customer.bills || customer.bills.length === 0) {
      return null;
    }

    // Sort bills from latest to oldest
    const sortedBills = [...customer.bills].sort((a, b) => 
      new Date(b.billDate) - new Date(a.billDate)
    );

    let cumulativeAmount = 0;
    let referenceDate = null;

    // Start from most recent bill and work backwards
    for (const bill of sortedBills) {
      cumulativeAmount += bill.amount;
      
      // When cumulative meets or exceeds outstanding amount, stop
      if (cumulativeAmount >= customer.outstandingAmount) {
        referenceDate = new Date(bill.billDate);
        break;
      }
    }

    // If we found a reference date, calculate days difference
    if (referenceDate) {
      const today = new Date();
      const diffTime = today - referenceDate;
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }

    return null;
  };

  const formatOutstandingDays = (customer) => {
    const days = calculateOutstandingDays(customer);
    
    if (days === null) return 'N/A';
    if (days === 0) return 'Today';
    if (days === 1) return '1 day';
    
    return `${days} days`;
  };

  const getOutstandingDaysColor = (customer) => {
    const days = calculateOutstandingDays(customer);
    
    if (days === null || days === 0) return 'text-gray-400';
    if (days <= 7) return 'text-yellow-600 dark:text-yellow-400';
    if (days <= 30) return 'text-orange-600 dark:text-orange-400';
    return 'text-red-600 dark:text-red-400';
  };

  const handleViewCustomer = (customerId) => {
    navigate(`/admin/customers/${customerId}`);
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800 border-b dark:border-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Customer Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Contact Person
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Phone & Email
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Revenue This Month
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Outstanding
                </th>
                {/* ✅ REPLACED: Last Order → Outstanding Days */}
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Outstanding Days
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  View
                </th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-gray-700">
              {customers.map((customer) => (
                <tr 
                  key={customer._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  {/* Customer Name */}
                  <td className="px-4 py-4">
                    <div>
                      <p className="font-semibold text-foreground">
                        {customer.establishmentName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {customer.businessType}
                      </p>
                    </div>
                  </td>

                  {/* Contact Person */}
                  <td className="px-4 py-4">
                    <div>
                      <p className="font-medium text-foreground">{customer.contactName}</p>
                      <p className="text-xs text-muted-foreground">{customer.designation}</p>
                    </div>
                  </td>

                  {/* Phone & Email */}
                  <td className="px-4 py-4">
                    <div className="space-y-1">
                      <p className="text-sm">{customer.phoneNumber}</p>
                      <p className="text-xs text-muted-foreground truncate max-w-[180px]">
                        {customer.email}
                      </p>
                    </div>
                  </td>

                  {/* Revenue This Month */}
                  <td className="px-4 py-4 text-right">
                    <p className="font-semibold text-green-600 dark:text-green-400">
                      {formatCurrency(customer.revenueThisMonth || 0)}
                    </p>
                  </td>

                  {/* Outstanding */}
                  <td className="px-4 py-4 text-right">
                    <div>
                      <p className={`font-semibold ${
                        customer.outstandingAmount > customer.creditLimit * 0.8
                          ? 'text-red-600 dark:text-red-400'
                          : customer.outstandingAmount > 0
                          ? 'text-amber-600 dark:text-amber-400'
                          : 'text-gray-400'
                      }`}>
                        {formatCurrency(customer.outstandingAmount)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        / {formatCurrency(customer.creditLimit)}
                      </p>
                    </div>
                  </td>

                  {/* ✅ NEW: Outstanding Days */}
                  <td className="px-4 py-4 text-center">
                    <div>
                      <p className={`text-lg font-bold ${getOutstandingDaysColor(customer)}`}>
                        {formatOutstandingDays(customer)}
                      </p>
                      {customer.outstandingAmount > 0 && calculateOutstandingDays(customer) > 0 && (
                        <p className="text-xs text-muted-foreground mt-1">
                          overdue
                        </p>
                      )}
                    </div>
                  </td>

                  {/* View Button */}
                  <td className="px-4 py-4">
                    <div className="flex justify-center">
                      <button
                        onClick={() => handleViewCustomer(customer._id)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2 text-sm font-medium"
                        title="View Customer Details"
                      >
                        <Eye size={16} />
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {customers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No customers found</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CustomerTable;
