import React from 'react';
import { AlertTriangle, Calendar, Clock } from 'lucide-react';

const CriticalAlerts = () => {
  const alerts = [
    {
      icon: AlertTriangle,
      count: 8,
      label: 'Low Stock Items',
      subtitle: 'View all →',
      color: 'red'
    },
    {
      icon: Calendar,
      count: 4,
      label: 'Expiring Batches',
      subtitle: 'Next 30 days',
      color: 'orange'
    },
    {
      icon: Clock,
      count: 45,
      label: 'Pending Orders',
      subtitle: 'Awaiting action',
      color: 'blue'
    }
  ];

  const colorClasses = {
    red: 'border-red-500 text-red-500 dark:border-red-600 dark:text-red-600',
    orange: 'border-orange-500 text-orange-500 dark:border-orange-600 dark:text-orange-600',
    blue: 'border-blue-500 text-blue-500 dark:border-blue-600 dark:text-blue-600'
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {alerts.map((alert, index) => (
        <div 
          key={index}
          className={`bg-card rounded-xl p-4 border-l-4 ${colorClasses[alert.color]} shadow-sm hover:shadow-md transition-shadow cursor-pointer`}
        >
          <div className="flex items-center justify-between mb-2">
            <alert.icon className={colorClasses[alert.color].split(' ')[1]} size={24} />
            <span className="text-2xl font-bold text-foreground">{alert.count}</span>
          </div>
          <p className="text-sm font-semibold text-foreground">{alert.label}</p>
          <p className="text-xs text-muted-foreground mt-1">{alert.subtitle}</p>
        </div>
      ))}
    </div>
  );
};

export default CriticalAlerts;
