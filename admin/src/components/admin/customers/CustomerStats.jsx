import React from 'react';
import { Users, TrendingUp, DollarSign, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export const CustomerStats = ({ stats }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const statCards = [
    {
      title: 'Total Customers',
      value: stats.totalCustomers,
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Active Customers',
      value: stats.activeCustomers,
      icon: TrendingUp,
      color: 'green'
    },
    {
      title: 'Total Revenue',
      value: formatCurrency(stats.totalRevenue),
      icon: DollarSign,
      color: 'purple'
    },
    {
      title: 'Outstanding',
      value: formatCurrency(stats.totalOutstanding),
      icon: AlertCircle,
      color: 'amber'
    }
  ];

  const colorClasses = {
    blue: 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 text-blue-700 dark:text-blue-400',
    green: 'bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 text-green-700 dark:text-green-400',
    purple: 'bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 text-purple-700 dark:text-purple-400',
    amber: 'bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 text-amber-700 dark:text-amber-400'
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statCards.map((stat, index) => (
        <Card 
          key={index} 
          className={`${colorClasses[stat.color]} shadow-sm hover:shadow-md transition-shadow`}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-80">{stat.title}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <stat.icon size={32} className="opacity-50" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CustomerStats;
