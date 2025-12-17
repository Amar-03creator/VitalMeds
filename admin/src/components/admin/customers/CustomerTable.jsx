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

  const getDaysSinceLastOrder = (lastOrderDate) => {
    if (!lastOrderDate) return 'Never';
    const diff = Date.now() - new Date(lastOrderDate).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    return `${days} days ago`;
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
                  Total Orders
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Revenue This Month
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Outstanding
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Last Order
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

                  {/* Total Orders */}
                  <td className="px-4 py-4 text-right">
                    <div>
                      <p className="text-lg font-bold text-foreground">{customer.totalOrders}</p>
                      <p className="text-xs text-muted-foreground">
                        {customer.ordersThisMonth} this month
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

                  {/* Last Order */}
                  <td className="px-4 py-4 text-sm">
                    {getDaysSinceLastOrder(customer.lastOrderDate)}
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
