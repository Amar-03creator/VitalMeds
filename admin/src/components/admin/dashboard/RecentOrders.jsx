import React from 'react';
import { ExternalLink, Clock, CheckCircle, Truck, Package } from 'lucide-react';

const RecentOrders = () => {
  const recentOrders = [
    { 
      id: 'ORD-2456', 
      customer: 'Apollo Pharmacy', 
      value: 45000, 
      status: 'Delivered', 
      date: '2 hours ago',
      statusColor: 'green'
    },
    { 
      id: 'ORD-2455', 
      customer: 'MedPlus Store', 
      value: 32000, 
      status: 'Shipped', 
      date: '5 hours ago',
      statusColor: 'blue'
    },
    { 
      id: 'ORD-2454', 
      customer: 'HealthCare Clinic', 
      value: 28500, 
      status: 'Pending', 
      date: '1 day ago',
      statusColor: 'orange'
    },
    { 
      id: 'ORD-2453', 
      customer: 'City Hospital', 
      value: 56000, 
      status: 'Delivered', 
      date: '1 day ago',
      statusColor: 'green'
    },
    { 
      id: 'ORD-2452', 
      customer: 'Wellness Pharmacy', 
      value: 19000, 
      status: 'Shipped', 
      date: '2 days ago',
      statusColor: 'blue'
    },
    { 
      id: 'ORD-2451', 
      customer: 'Dr. Sharma Clinic', 
      value: 42000, 
      status: 'Pending', 
      date: '2 days ago',
      statusColor: 'orange'
    },
    { 
      id: 'ORD-2450', 
      customer: 'Medicare Store', 
      value: 35000, 
      status: 'Delivered', 
      date: '3 days ago',
      statusColor: 'green'
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered':
        return <CheckCircle size={14} />;
      case 'Shipped':
        return <Truck size={14} />;
      case 'Pending':
        return <Clock size={14} />;
      default:
        return <Package size={14} />;
    }
  };

  const statusColorClasses = {
    green: 'bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800',
    blue: 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800',
    orange: 'bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800'
  };

  return (
    <div className="bg-card rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground">Recent Orders</h2>
        <button className="text-sm text-primary hover:text-primary/80 font-medium flex items-center gap-1">
          View All <ExternalLink size={14} />
        </button>
      </div>
      <div className="space-y-3 max-h-[500px] overflow-y-auto">
        {recentOrders.map((order) => (
          <div key={order.id} className="p-4 bg-secondary rounded-xl hover:bg-accent transition-colors cursor-pointer">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-semibold text-foreground text-sm">{order.id}</p>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium border flex items-center gap-1 ${statusColorClasses[order.statusColor]}`}>
                    {getStatusIcon(order.status)}
                    {order.status}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{order.customer}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-foreground text-sm">₹{order.value.toLocaleString()}</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">{order.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentOrders;
