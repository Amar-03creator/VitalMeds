import React from 'react';
import { Bell, History } from 'lucide-react';

const TopCustomers = () => {
  const topCustomers = [
    { name: 'Apollo Pharmacy', revenue: 285000, orders: 145, outstanding: 45000, lastOrder: '2 days ago', priority: 'gold' },
    { name: 'MedPlus', revenue: 198000, orders: 98, outstanding: 0, lastOrder: '1 day ago', priority: 'gold' },
    { name: 'Dr. Sharma Clinic', revenue: 156000, orders: 67, outstanding: 12000, lastOrder: '5 hours ago', priority: 'silver' },
    { name: 'HealthCare Store', revenue: 134000, orders: 89, outstanding: 8500, lastOrder: '3 days ago', priority: 'silver' },
    { name: 'City Hospital', revenue: 128000, orders: 56, outstanding: 0, lastOrder: '1 day ago', priority: 'bronze' }
  ];

  const handleSendReminder = (customerName) => {
    console.log('Sending reminder to:', customerName);
    // Add API call here
  };

  const handleViewHistory = (customerName) => {
    console.log('Viewing history for:', customerName);
    // Add navigation or modal logic here
  };

  return (
    <div className="bg-card rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground">Top Customers</h2>
        <button className="text-sm text-primary hover:text-primary/80 font-medium">View All →</button>
      </div>
      <div className="space-y-3">
        {topCustomers.map((customer, index) => (
          <div key={index} className="p-4 bg-secondary rounded-xl hover:bg-accent transition-colors">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                  customer.priority === 'gold' ? 'bg-gradient-to-br from-yellow-400 to-yellow-500' :
                  customer.priority === 'silver' ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-gray-700' :
                  'bg-gradient-to-br from-orange-400 to-orange-500'
                }`}>
                  {customer.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{customer.name}</p>
                  <p className="text-xs text-muted-foreground">{customer.orders} orders • {customer.lastOrder}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-foreground">₹{(customer.revenue / 1000).toFixed(0)}k</p>
                {customer.outstanding > 0 && (
                  <p className="text-xs text-red-600 dark:text-red-400 font-medium">
                    Due: ₹{(customer.outstanding / 1000).toFixed(0)}k
                  </p>
                )}
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => handleSendReminder(customer.name)}
                className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
              >
                <Bell size={14} />
                Send Reminder
              </button>
              <button
                onClick={() => handleViewHistory(customer.name)}
                className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-accent text-foreground rounded-lg hover:bg-accent/80 transition-colors text-sm font-medium"
              >
                <History size={14} />
                View History
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCustomers;
