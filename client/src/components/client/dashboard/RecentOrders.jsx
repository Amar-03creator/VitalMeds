import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Filter, Eye, RotateCcw, Receipt, IndianRupee } from 'lucide-react';

const RecentOrders = () => {
  const [hoveredId, setHoveredId] = useState(null);

  const recentOrders = [
    {
      id: 'ORD001',
      date: '2025-10-01',
      status: 'Delivered',
      eta: 'Completed',
      amount: 2450,
      items: 15,
    },
    {
      id: 'ORD002',
      date: '2025-09-28',
      status: 'In Transit',
      eta: '2 Days',
      amount: 1890,
      items: 8,
    },
    {
      id: 'ORD003',
      date: '2025-09-25',
      status: 'Dispatched',
      eta: '1 Day',
      amount: 3200,
      items: 22,
    },
  ];

  const getStatusClasses = (status) => {
    const classes = {
      Delivered: 'bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400 border-green-300 dark:border-green-800',
      'In Transit': 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400 border-blue-300 dark:border-blue-800',
      Dispatched: 'bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-400 border-orange-300 dark:border-orange-800',
      Pending: 'bg-yellow-100 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-400 border-yellow-300 dark:border-yellow-800',
    };
    return classes[status] || classes.Pending;
  };

  return (
    <Card className="shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg dark:text-xl font-semibold dark:font-bold text-gray-900 dark:text-white">
              Recent Orders
            </h3>
            <p className="text-xs dark:text-sm text-gray-600 dark:text-gray-400 mt-0.5">
              Your latest order activity
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              <Filter className="w-4 h-4 mr-1" />
              Filter
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              View All
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentOrders.map((order) => {
            const isHovered = hoveredId === order.id;

            return (
              <div
                key={order.id}
                className={`p-4 border rounded-lg transition-all ${
                  isHovered
                    ? 'bg-gray-50 dark:bg-gray-700'
                    : 'bg-white dark:bg-gray-900'
                } border-gray-200 dark:border-gray-600`}
                onMouseEnter={() => setHoveredId(order.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {order.id}
                      </span>
                      <Badge
                        variant="outline"
                        className={getStatusClasses(order.status)}
                      >
                        {order.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                      <span>{order.date}</span>
                      <span>•</span>
                      <span>{order.items} items</span>
                      <span>•</span>
                      <span>ETA: {order.eta}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold flex items-center justify-end mb-2 text-gray-900 dark:text-white">
                      <IndianRupee className="w-4 h-4" />
                      {order.amount.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                      >
                        <Receipt className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentOrders;
