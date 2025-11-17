import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import {
  RotateCcw,
  Plus,
  Truck,
  FileText,
  Receipt,
} from 'lucide-react';

const QuickActionBar = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: 'Quick Reorder',
      description: 'Last 10 Products',
      icon: RotateCcw,
      bgColor: 'bg-blue-50 dark:bg-blue-950',
      hoverBg: 'hover:bg-blue-100 dark:hover:bg-blue-900',
      iconColor: 'text-blue-600 dark:text-blue-400',
      onClick: () => navigate('/orders'), // Navigate to orders (404 placeholder)
    },
    {
      title: 'New Order',
      description: 'Create fresh',
      icon: Plus,
      bgColor: 'bg-green-50 dark:bg-green-950',
      hoverBg: 'hover:bg-green-100 dark:hover:bg-green-900',
      iconColor: 'text-green-600 dark:text-green-400',
      onClick: () => navigate('/products'), // Navigate to products page
    },
    {
      title: 'Track Order',
      description: 'Recent status',
      icon: Truck,
      bgColor: 'bg-orange-50 dark:bg-orange-950',
      hoverBg: 'hover:bg-orange-100 dark:hover:bg-orange-900',
      iconColor: 'text-orange-600 dark:text-orange-400',
      onClick: () => navigate('/orders'), // Navigate to orders (404 placeholder)
    },
    {
      title: 'Upload Docs',
      description: 'Prescription',
      icon: FileText,
      bgColor: 'bg-purple-50 dark:bg-purple-950',
      hoverBg: 'hover:bg-purple-100 dark:hover:bg-purple-900',
      iconColor: 'text-purple-600 dark:text-purple-400',
      onClick: () => navigate('/orders'), // Navigate to orders (404 placeholder)
    },
    {
      title: 'Get Quote',
      description: 'RFQ',
      icon: Receipt,
      bgColor: 'bg-red-50 dark:bg-red-950',
      hoverBg: 'hover:bg-red-100 dark:hover:bg-red-900',
      iconColor: 'text-red-600 dark:text-red-400',
      onClick: () => navigate('/orders'), // Navigate to orders (404 placeholder)
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {actions.map((action, index) => {
        const Icon = action.icon;

        return (
          <Card
            key={index}
            onClick={action.onClick}
            className="cursor-pointer group transition-all hover:shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
          >
            <CardContent className="pt-2 text-center">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2 transition-all ${action.bgColor} ${action.hoverBg}`}
              >
                <Icon className={`w-6 h-6 ${action.iconColor}`} />
              </div>
              <p className="font-medium mb-1 text-gray-900 dark:text-white">
                {action.title}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {action.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default QuickActionBar;
