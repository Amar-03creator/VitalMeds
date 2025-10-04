import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/contexts/ThemeProvider';
import { Filter, Eye, RotateCcw, Receipt, IndianRupee } from 'lucide-react';

const RecentOrders = () => {
  const { theme } = useTheme();

  const isDark =
    theme === 'dark' ||
    (theme === 'system' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches);

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

  const getStatusColors = (status) => {
    const colors = {
      Delivered: {
        light: { bg: '#dcfce7', text: '#15803d', border: '#bbf7d0' },
        dark: { bg: '#14532d', text: '#86efac', border: '#166534' },
      },
      'In Transit': {
        light: { bg: '#dbeafe', text: '#1e40af', border: '#bfdbfe' },
        dark: { bg: '#1e3a8a', text: '#93c5fd', border: '#1e40af' },
      },
      Dispatched: {
        light: { bg: '#ffedd5', text: '#c2410c', border: '#fed7aa' },
        dark: { bg: '#7c2d12', text: '#fdba74', border: '#9a3412' },
      },
      Pending: {
        light: { bg: '#fef3c7', text: '#a16207', border: '#fde68a' },
        dark: { bg: '#713f12', text: '#fcd34d', border: '#a16207' },
      },
    };

    const statusColors = colors[status] || colors.Pending;
    return isDark ? statusColors.dark : statusColors.light;
  };

  return (
    <Card
      className="shadow-lg"
      style={{
        backgroundColor: isDark ? '#1f2937' : '#ffffff',
        borderColor: isDark ? '#374151' : '#e5e7eb',
      }}
    >
      <CardHeader
        className="flex flex-row items-center justify-between"
        style={{
          backgroundColor: isDark ? '#1f2937' : '#ffffff',
        }}
      >
        <div>
          <CardTitle style={{ color: isDark ? '#f9fafb' : '#111827' }}>
            Recent Orders
          </CardTitle>
          <CardDescription style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
            Your latest order activity
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            style={{
              backgroundColor: isDark ? '#374151' : '#f9fafb',
              borderColor: isDark ? '#4b5563' : '#e5e7eb',
              color: isDark ? '#f9fafb' : '#111827',
            }}
          >
            <Filter className="w-4 h-4 mr-1" />
            Filter
          </Button>
          <Button
            variant="outline"
            size="sm"
            style={{
              backgroundColor: isDark ? '#374151' : '#f9fafb',
              borderColor: isDark ? '#4b5563' : '#e5e7eb',
              color: isDark ? '#f9fafb' : '#111827',
            }}
          >
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent
        style={{
          backgroundColor: isDark ? '#1f2937' : '#ffffff',
        }}
      >
        <div className="space-y-4">
          {recentOrders.map((order) => {
            const statusColors = getStatusColors(order.status);
            const [isHovered, setIsHovered] = React.useState(false);

            return (
              <div
                key={order.id}
                className="p-4 border rounded-lg transition-all"
                style={{
                  backgroundColor: isHovered
                    ? isDark
                      ? '#374151'
                      : '#f9fafb'
                    : isDark
                    ? '#111827'
                    : '#ffffff',
                  borderColor: isDark ? '#4b5563' : '#e5e7eb',
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span
                        className="font-medium"
                        style={{ color: isDark ? '#f9fafb' : '#111827' }}
                      >
                        {order.id}
                      </span>
                      <Badge
                        style={{
                          backgroundColor: statusColors.bg,
                          color: statusColors.text,
                          borderColor: statusColors.border,
                          border: '1px solid',
                        }}
                      >
                        {order.status}
                      </Badge>
                    </div>
                    <div
                      className="flex items-center gap-3 text-sm"
                      style={{ color: isDark ? '#9ca3af' : '#6b7280' }}
                    >
                      <span>{order.date}</span>
                      <span>•</span>
                      <span>{order.items} items</span>
                      <span>•</span>
                      <span>ETA: {order.eta}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className="font-semibold flex items-center justify-end mb-2"
                      style={{ color: isDark ? '#f9fafb' : '#111827' }}
                    >
                      <IndianRupee className="w-4 h-4" />
                      {order.amount.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        style={{ color: isDark ? '#9ca3af' : '#6b7280' }}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        style={{ color: isDark ? '#9ca3af' : '#6b7280' }}
                      >
                        <RotateCcw className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        style={{ color: isDark ? '#9ca3af' : '#6b7280' }}
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